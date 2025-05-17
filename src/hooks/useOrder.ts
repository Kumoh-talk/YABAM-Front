import { useEffect, useState } from 'react';
import { Store } from '@/types';
import { OrderInfo } from '@/types/backend/order';
import { getOrders } from '@/utils/api/backend/order';
import { SaleDto } from '@/types/backend/sale';

export const useOrder = (store: Store, sale: SaleDto | null) => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  const refreshOrder = async () => {
    try {
      if (store.id === -1 || !sale) return;
      const orders = await getOrders(sale.saleId, 999, ['ORDERED', 'RECEIVED', 'COMPLETED', 'CANCELED']);
      setOrders(orders.pageContents);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshOrder();
  }, [store, sale]);

  return {
    orders,
    refreshOrder,
  };
};
