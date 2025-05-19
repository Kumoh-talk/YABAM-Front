import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useOrder } from '@/hooks';
import { OrderInfo, OrderMenuInfo } from '@/types/backend/order';
import { createDirectOrder } from '@/utils/api/backend/order';
import {
  createReceipt,
  getNonAdjestReceipt,
} from '@/utils/api/backend/receipt';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useTableActions } from '../table/TableContext';
import { ReceiptInfo } from '@/types/backend/receipt';

export type Values = {
  orders: OrderInfo[];
};

export type Actions = {
  refreshOrders: () => Promise<void>;
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

  stopReceipt: (receipt: ReceiptInfo) => Promise<void>;
  adjustReceipt: (receipt: ReceiptInfo, orders: OrderInfo[])  => Promise<void>;
};

const OrderValuesContext = createContext<Values | undefined>(undefined);
const OrderActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const OrderProvider = (props: Props) => {
  const { store, sale } = useStoreValues();
  const { refreshTable } = useTableActions();
  const {
    orders,
    refreshOrders,
    setOrderStatus,
    setOrderMenuStatuses,
    setOrderMenuQuantity,
    deleteOrderMenu,
    stopReceipt,
    adjustReceipt,
  } = useOrder(store, sale);

  const navigate = useNavigate();
  const lastOrderIdRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(refreshOrders, 1000);
    return () => clearInterval(interval);
  }, [refreshOrders]);

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
    refreshTable();
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

  return (
    <OrderValuesContext.Provider value={{ orders }}>
      <OrderActionsContext.Provider
        value={{
          refreshOrders,
          requestManualOrder,
          cancelOrder,
          confirmOrder,
          revertOrder,
          cancelOrderMenu,
          completeOrderMenus,
          revertOrderMenu,
          setOrderMenuQuantity,
          deleteOrderMenu,
          stopReceipt,
          adjustReceipt,
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
