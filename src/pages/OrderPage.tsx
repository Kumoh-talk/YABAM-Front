import { useState } from 'react';
import {
  CallPanel,
  ManualOrderPanel,
  OrderDetail,
  OrderQueuePanel,
} from '@/components/order';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useTableValues } from '@/contexts/table/TableContext';
import { useCheckLogin } from '@/hooks';
import { useOrder } from '@/hooks/useOrder';
import { TableView } from '@/components/common';

export const OrderPage = () => {
  useCheckLogin(true);
  const { store, sale } = useStoreValues();
  const { orders, refreshOrder } = useOrder(store, sale);
  const { tables } = useTableValues();
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<number>(-1);
  const currentOrder = orders.find((order) => order.orderId === currentOrderId);

  const handleStatusChange = async () => {
    await refreshOrder();
  };

  // 수동 주문 페이지
  const table = selectedTableId
    ? tables.find((table) => table.id === selectedTableId)
    : null;
  if (table) {
    return (
      <ManualOrderPanel
        table={table}
        onClose={() => setSelectedTableId(null)}
      />
    );
  }

  return (
    <section className="flex flex-row w-full h-full relative">
      <section className="flex flex-col flex-1 w-0">
        {currentOrder ? (
          <OrderDetail
            order={currentOrder}
            onStatusChange={handleStatusChange}
            onClose={() => setCurrentOrderId(-1)}
          />
        ) : (
          <TableView
            orders={orders}
            onChangeSelectedTable={setSelectedTableId}
          />
        )}
      </section>
      <OrderQueuePanel
        orders={orders}
        tables={tables}
        currentOrderId={currentOrderId}
        onClickOrder={(id) => {
          setCurrentOrderId(id);
        }}
        onStatusChange={handleStatusChange}
      />
      <CallPanel />
    </section>
  );
};
export default OrderPage;
