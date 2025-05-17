import { TableView } from '@/components/common';
import { ReceiptPanel } from '@/components/payment';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useCheckLogin } from '@/hooks';
import { useState } from 'react';

export const PaymentPage = () => {
  useCheckLogin(true);
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const { orders } = useStoreValues();

  // const selectedTable = orders.find((order) => order.receipt.tableInfo.tableId === selectedTableId);
  const selectedOrder = orders.find(
    (order) => order.receipt.tableInfo.tableId === selectedTableId,
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
