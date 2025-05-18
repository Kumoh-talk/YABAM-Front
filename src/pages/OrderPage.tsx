import { useState, useEffect } from 'react';
import { OrderDetail, OrderQueuePanel } from '@/components/order';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useTableValues } from '@/contexts/table/TableContext';
import { useCheckLogin } from '@/hooks';
import { useOrder } from '@/hooks/useOrder';
import { useCall } from '@/hooks/useCall';

export const OrderPage = () => {
  useCheckLogin(true);
  const { store, sale } = useStoreValues();
  const { orders, refreshOrder } = useOrder(store, sale);
  const { tables } = useTableValues();
  const [currentOrderId, setCurrentOrderId] = useState<number>(-1);
  const [isOrderDetailVisible, setIsOrderDetailVisible] = useState(false);
  const currentOrder = orders.find((order) => order.orderId === currentOrderId);

  const { calls } = useCall(sale?.saleId);

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

      <div className="fixed left-0 bottom-0 w-[22rem]  bg-white border-t border-r border-gray-300 rounded-2xl shadow-lg z-50">
        <div className="p-2 font-medium border-b border-gray-500">요청사항</div>
        <ul className="max-h-60 overflow-y-auto">
          {calls.map((call) => (
            <li
              key={call.callId}
              className="flex flex-row justify-between items-center p-2 border-b"
            >
              <span>
                [{call.tableNumber}번 테이블] {call.callMessage}
              </span>
              <button className="ml-2 px-2 py-1 bg-primary text-white rounded">
                확인
              </button>
            </li>
          ))}
          {calls.length === 0 && (
            <li className="p-2 text-gray-400">요청사항이 없습니다</li>
          )}
        </ul>
      </div>
    </section>
  );
};
export default OrderPage;
