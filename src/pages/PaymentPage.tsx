import { TableView } from '@/components/common';
import { ReceiptPanel } from '@/components/payment';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useCheckLogin } from '@/hooks';
import { useState, useMemo } from 'react';
import { MenuSelectPanel } from '../components/common';
import { useOrder } from '@/hooks/useOrder';
import { createDirectOrder } from '@/utils/api/backend/order';
import { toast } from 'react-toastify';

export const PaymentPage = () => {
  useCheckLogin(true);
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [isOrderPageVisible, setIsOrderPageVisible] = useState(false);
  const { store, sale } = useStoreValues();
  const { orders } = useOrder(store, sale);

  const selectedTableOrders = useMemo(() => {
    const filteredOrders = orders.filter(
      (order) => order.receipt.tableInfo.tableId === selectedTableId,
    );
    const completedOrders = filteredOrders
      .map((order) => ({
        ...order,
        orderMenus: order.orderMenus.filter(
          (menu) =>
            menu.orderMenuStatus === 'COMPLETED' ||
            menu.orderMenuStatus === 'COOKING',
        ),
      }))
      .filter((order) => order.orderMenus.length > 0);
    return completedOrders;
  }, [orders, selectedTableId]);

  const handleTableDoubleClick = (tableId: string) => {
    setSelectedTableId(tableId);
    setIsOrderPageVisible(true);
  };

  const handleProductClick = async (menuId: number) => {
    try {
      const receiptId = selectedTableOrders[0].receipt.receiptInfo.receiptId;
      if (!receiptId) {
        toast.warn('영수증 ID가 존재하지 않습니다.');
        return;
      }
      await createDirectOrder(receiptId, menuId, 1);
    } catch (e) {
      alert('주문 추가 실패');
    }
  };

  return (
    <section className="flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0">
        {isOrderPageVisible ? (
          <MenuSelectPanel
            onClose={() => setIsOrderPageVisible(false)}
            selectedCategory={[]}
            onClickMenu={handleProductClick}
          />
        ) : (
          <TableView
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
