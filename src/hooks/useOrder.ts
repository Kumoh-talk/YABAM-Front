import { dummyOrders } from '@/components/order/OrderQueuePanel/constants';
import { Order } from '@/types';
import { useState } from 'react';

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);

  return {
    orders,
  };
};
