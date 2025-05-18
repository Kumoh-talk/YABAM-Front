import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { OrderInfo, OrderMenuInfo } from '@/types/backend/order';
import { createDirectOrder, getOrders } from '@/utils/api/backend/order';
import { useStoreValues } from '@/contexts/store/StoreContext';
import {
  createReceipt,
  getNonAdjestReceipt,
} from '@/utils/api/backend/receipt';
import { toast } from 'react-toastify';

interface OrderContextType {
  orders: OrderInfo[];
  refreshOrders: () => Promise<void>;
  requestManualOrder: (
    tableId: string,
    menuInfos: OrderMenuInfo[],
  ) => Promise<OrderInfo>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { store, sale } = useStoreValues();
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  const refreshOrders = useCallback(async () => {
    try {
      if (!store || store.id === -1 || !sale) {
        return;
      }
      const res = await getOrders(sale.saleId, 999, [
        'ORDERED',
        'RECEIVED',
        'COMPLETED',
        'CANCELED',
      ]);
      setOrders(res.pageContents);
    } catch (e) {
      console.error(e);
    }
  }, [store, sale]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  // 3초마다 자동 새로고침
  useEffect(() => {
    const interval = setInterval(() => {
      refreshOrders();
    }, 2000);
    return () => clearInterval(interval);
  }, [refreshOrders]);

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

  return (
    <OrderContext.Provider
      value={{ orders, refreshOrders, requestManualOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const value = useContext(OrderContext);
  if (!value) {
    throw new Error('useOrderContext should be used within OrderContext');
  }
  return value;
};;
