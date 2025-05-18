import { TableView } from '@/components/common';
import { ReceiptPanel } from '@/components/payment';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useCheckLogin } from '@/hooks';
import { useState, useEffect, useMemo } from 'react';
import { CustomOrderPage } from './CustomOrderPage';
import { useOrder } from '@/hooks/useOrder';

export const PaymentPage = () => {
  useCheckLogin(true);
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [isOrderPageVisible, setIsOrderPageVisible] = useState(false);
  const { store, sale } = useStoreValues();
  const { orders } = useOrder(store, sale);

  const selectedTableOrders = useMemo(() => {
    const filteredOrders = orders.filter((order) => order.receipt.tableInfo.tableId === selectedTableId);
    const completedOrders = filteredOrders
      .map((order) => ({
        ...order,
        orderMenus: order.orderMenus.filter((menu) => menu.orderMenuStatus === 'COMPLETED'),
      }))
      .filter((order) => order.orderMenus.length > 0);
    return completedOrders;
  }, [orders, selectedTableId]);

  const handleTableDoubleClick = (tableId: string) => {
    setSelectedTableId(tableId);
    setIsOrderPageVisible(true);
  };
  return (
    <section className="flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0">
        {isOrderPageVisible ? (
          <CustomOrderPage
            onClose={() => setIsOrderPageVisible(false)}
            receiptId={selectedTableOrders[0] ? selectedTableOrders[0].receipt.receiptInfo.receiptId.toString() : ''}
          />
        ) : (
          <TableView
            orders={orders}
            onChangeSelectedTable={setSelectedTableId}
            onTableDoubleClick={handleTableDoubleClick}
          />
        )}
      </section>
      <ReceiptPanel order={selectedTableOrders} />
    </section>
  );
};
export default PaymentPage;
