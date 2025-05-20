import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useOrder, useReceipt } from '@/hooks';
import {
  OrderInfo,
  OrderMenuInfo,
  OrderSelectResponse,
  OrderStatus,
} from '@/types/backend/order';
import { createDirectOrder } from '@/utils/api/backend/order';
import {
  createReceipt,
  getNonAdjestReceipt,
  restartReceipt,
} from '@/utils/api/backend/receipt';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useTableActions, useTableValues } from '../table/TableContext';
import { ReceiptInfo, TableWithReceipt } from '@/types/backend/receipt';

export type Values = {
  orders: OrderInfo[];
  tableWithReceipts: TableWithReceipt[];
};

export type Actions = {
  refreshOrders: () => Promise<void>;
  getOrders: (
    saleId: number,
    perPage: number | undefined,
    statuses: OrderStatus[],
  ) => Promise<OrderSelectResponse>;
  requestManualOrder: (
    tableId: string,
    menuInfos: OrderMenuInfo[],
  ) => Promise<OrderInfo>;
  cancelOrder: (orderId: number) => Promise<void>;
  confirmOrder: (orderId: number) => Promise<void>;
  revertOrder: (orderId: number) => Promise<void>;
  cancelOrderMenu: (orderMenuId: number) => Promise<void>;
  completeOrderMenus: (orderMenuIds: number[]) => Promise<void>;
  revertOrderMenu: (orderMenuId: number) => Promise<void>;
  setOrderMenuQuantity: (
    orderMenuId: number,
    quantity: number,
  ) => Promise<void>;
  deleteOrderMenu: (orderMenuId: number) => Promise<void>;
  setOrderMenuCompletedCount: (
    orderMenuId: number,
    completedCount: number,
  ) => Promise<void>;
  refreshTableWithReceipts: () => Promise<void>;
  stopReceipt: (receipt: ReceiptInfo) => Promise<void>;
  removeReceipt: (receiptId: string) => Promise<{}>;
  adjustReceipt: (receipt: ReceiptInfo, orders: OrderInfo[]) => Promise<void>;
  setRestartReceipt: (receiptIds: string[]) => Promise<void>;
  moveReceiptTable: (receiptId: string, tableId: string) => Promise<boolean>;
};

const OrderValuesContext = createContext<Values | undefined>(undefined);
const OrderActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const OrderProvider = (props: Props) => {
  const { store, sale } = useStoreValues();
  const {
    orders,
    refreshOrders,
    getOrders,
    setOrderStatus,
    setOrderMenuStatuses,
    setOrderMenuQuantity,
    deleteOrderMenu,
    stopReceipts,
    removeReceipt,
    adjustReceipts,
    setRestartReceipt,
    setOrderMenuCompletedCount,
  } = useOrder(store, sale);
  const { tables } = useTableValues();
  const { setTableActive } = useTableActions();
  const { tableWithReceipts, refreshTableWithReceipts, moveReceiptTable } =
    useReceipt(store, sale);

  const navigate = useNavigate();
  const lastOrderIdRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(refreshOrders, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [refreshOrders]);

  useEffect(() => {
    const interval = setInterval(refreshTableWithReceipts, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [refreshTableWithReceipts]);

  useEffect(() => {
    tables.forEach((table) => {
      const tableWithReceipt = tableWithReceipts.find(
        (receipt) => receipt.tableId === table.id,
      );
      if (tableWithReceipt) {
        const receipt = tableWithReceipt.receiptInfo;
        setTableActive(table.id, !!receipt.receiptInfo);
      }
    });
  }, [JSON.stringify(tables), JSON.stringify(tableWithReceipts)]);

  useEffect(() => {
    const ordered = orders.filter((order) => order.orderStatus === 'ORDERED');
    if (ordered.length > 0) {
      const latestOrderId = ordered[0].orderId;
      if (lastOrderIdRef.current !== latestOrderId) {
        if (lastOrderIdRef.current !== null) {
          toast.info('새로운 주문이 들어왔습니다!', {
            onClick: () => navigate('/main'),
            style: { cursor: 'pointer' },
            autoClose: 4000,
          });
        }
        lastOrderIdRef.current = latestOrderId;
      }
    }
  }, [orders, navigate]);

  const tryAndGetReceiptId = async (tableId: string) => {
    try {
      const receiptId = (await getNonAdjestReceipt(tableId)).receiptId;
      if (receiptId) {
        return receiptId;
      }
      const res = await createReceipt(store.id, tableId);
      return res.receiptInfo.receiptId;
    } catch (e) {
      console.error(e);
      toast.error('영수증을 생성할 수 없습니다.');
      throw e;
    }
  };

  const requestManualOrder = async (
    tableId: string,
    menuInfos: OrderMenuInfo[],
  ) => {
    try {
      const receiptId = await tryAndGetReceiptId(tableId);

      const res = await createDirectOrder(
        receiptId,
        menuInfos.map((menu) => ({
          menuId: menu.menuInfo.menuId,
          menuQuantity: menu.quantity,
        })),
      );

      return res;
    } catch (e) {
      console.error(e);
      toast.error('수동 주문 중 에러가 발생했습니다.');
      throw e;
    }
  };

  // 주문 단위
  const cancelOrder = (orderId: number) => setOrderStatus(orderId, 'CANCELED');
  const confirmOrder = (orderId: number) => setOrderStatus(orderId, 'RECEIVED');
  const revertOrder = (orderId: number) => setOrderStatus(orderId, 'RECEIVED');

  // 주문메뉴 단위
  const cancelOrderMenu = (orderMenuId: number) =>
    setOrderMenuStatuses([orderMenuId], 'CANCELED');
  const completeOrderMenus = async (orderMenuIds: number[]) =>
    setOrderMenuStatuses(orderMenuIds, 'COMPLETED');
  const revertOrderMenu = async (orderMenuId: number) =>
    setOrderMenuStatuses([orderMenuId], 'COOKING');

  // 테이블 사용 종료
  const stopReceipt = async (receipt: ReceiptInfo) => {
    try {
      await stopReceipts([receipt.receiptId]);
      await refreshOrders();
      await refreshTableWithReceipts();
    } catch (error) {
      console.error(`테이블 사용 종료(${receipt.receiptId}) 실패:`, error);
    }
  };

  // 테이블 결제 완료 처리
  const adjustReceipt = async (receipt: ReceiptInfo, orders: OrderInfo[]) => {
    try {
      if (!receipt.stopUsageTime) {
        await stopReceipts([receipt.receiptId]);
      }
      const receivedOrders = orders.filter(
        (order) => order.orderStatus === 'RECEIVED',
      );
      for (const order of receivedOrders) {
        await setOrderMenuStatuses(
          order.orderMenus.map((menu) => menu.orderMenuId),
          'COMPLETED',
        );
      }
      await adjustReceipts([receipt.receiptId]);
      await refreshOrders();
      await refreshTableWithReceipts();
    } catch (error) {
      console.error(`테이블 결제(${receipt.receiptId}) 실패:`, error);
    }
  };

  return (
    <OrderValuesContext.Provider value={{ orders, tableWithReceipts }}>
      <OrderActionsContext.Provider
        value={{
          refreshOrders,
          getOrders,
          requestManualOrder,
          cancelOrder,
          confirmOrder,
          revertOrder,
          cancelOrderMenu,
          completeOrderMenus,
          revertOrderMenu,
          setOrderMenuQuantity,
          deleteOrderMenu,
          setOrderMenuCompletedCount,
          refreshTableWithReceipts,
          removeReceipt,
          stopReceipt,
          adjustReceipt,
          setRestartReceipt,
          moveReceiptTable,
        }}
      >
        {props.children}
      </OrderActionsContext.Provider>
    </OrderValuesContext.Provider>
  );
};

export const useOrderValues = () => {
  const value = useContext(OrderValuesContext);
  if (!value) {
    throw new Error('useOrderValues should be used within OrderProvider');
  }
  return value;
};

export const useOrderActions = () => {
  const value = useContext(OrderActionsContext);
  if (!value) {
    throw new Error('useOrderActions should be used within OrderProvider');
  }
  return value;
};
