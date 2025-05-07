import { TableView } from '@/components/common';
import { ReceiptPanel } from '@/components/payment';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useState } from 'react';

export const PaymentPage = () => {
  const [selectedTableId, setSelectedTableId] = useState<number>(-1);
  const { orders } = useStoreValues();

  const selectedTable = orders.find((order) => order.id === selectedTableId);
  const selectedOrder = orders.find(
    (order) => order.tableName === selectedTable?.tableName,
  );
  return (
    <section className="asdf flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0">
        <TableView onChangeSelectedTable={setSelectedTableId} />
      </section>
      <ReceiptPanel order={selectedOrder} />
    </section>
  );
};
export default PaymentPage;
