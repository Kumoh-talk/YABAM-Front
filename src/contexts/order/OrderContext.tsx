import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { OrderInfo } from '@/types/backend/order';
import { getOrders } from '@/utils/api/backend/order';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { SaleDto } from '@/types/backend/sale';

interface OrderContextType {
  orders: OrderInfo[];
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  refreshOrders: async () => {},
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { store, sale } = useStoreValues();
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  const refreshOrders = useCallback(async () => {
    try {
      if (!store || store.id === -1 || !sale) {
        return;
      }
      const res = await getOrders(sale.saleId, 999, [
        'ORDERED', 'RECEIVED', 'COMPLETED', 'CANCELED'
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

  return (
    <OrderContext.Provider value={{ orders, refreshOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext); 