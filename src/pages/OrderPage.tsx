import { useState } from 'react';
import { OrderDetail, OrderQueuePanel } from '@/components/order';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useTableValues } from '@/contexts/table/TableContext';
import { useCheckLogin } from '@/hooks';
import { useOrder } from '@/hooks/useOrder';

export const OrderPage = () => {
  useCheckLogin(true);
  const { store, sale } = useStoreValues();
  const { orders, refreshOrder } = useOrder(store, sale);
  const { tables } = useTableValues();
  const [currentOrderId, setCurrentOrderId] = useState<number>(-1);
  const [isOrderDetailVisible, setIsOrderDetailVisible] = useState(false);
  const currentOrder = orders.find((order) => order.orderId === currentOrderId);

  const handleStatusChange = async () => {
    await refreshOrder();
  };

  return (
    <section className="flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0">
        {isOrderDetailVisible && currentOrder && (
          <OrderDetail
            order={currentOrder}
            onStatusChange={handleStatusChange}
            onClose={() => setCurrentOrderId(-1)}
          />
        )}
      </section>
      <OrderQueuePanel
        orders={orders}
        tables={tables}
        currentOrderId={currentOrderId}
        onClickOrder={(id) => {
          setCurrentOrderId(id);
          setIsOrderDetailVisible(true);
        }}
        onStatusChange={handleStatusChange}
      />
    </section>
  );
};
export default OrderPage;
