import { useState } from 'react';
import { OrderDetail, OrderQueuePanel } from '@/components/order';
import { dummyOrders } from '@/components/order/OrderQueuePanel/constants';

export const OrderPage = () => {
  const data = dummyOrders;
  const [currentOrderId, setCurrentOrderId] = useState<number>(-1);
  const currentOrder = data.find((order) => order.id === currentOrderId);
  return (
    <section className="flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0">
        {currentOrder && <OrderDetail order={currentOrder} />}
      </section>
      <OrderQueuePanel
        orders={data}
        currentOrderId={currentOrderId}
        onClickOrder={(id) => setCurrentOrderId(id)}
      />
    </section>
  );
};
export default OrderPage;
