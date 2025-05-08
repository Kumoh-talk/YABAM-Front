import { useState } from 'react';
import { OrderDetail, OrderQueuePanel } from '@/components/order';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useCheckLogin } from '@/hooks';

export const OrderPage = () => {
  useCheckLogin(true);
  const { orders } = useStoreValues();
  const [currentOrderId, setCurrentOrderId] = useState<number>(-1);
  const currentOrder = orders.find((order) => order.id === currentOrderId);
  return (
    <section className="flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0">
        {currentOrder && <OrderDetail order={currentOrder} />}
      </section>
      <OrderQueuePanel
        orders={orders}
        currentOrderId={currentOrderId}
        onClickOrder={(id) => setCurrentOrderId(id)}
      />
    </section>
  );
};
export default OrderPage;
