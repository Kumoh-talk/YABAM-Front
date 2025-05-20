import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  createDirectOrder,
  updateOrderMenuQuantity,
} from '@/utils/api/backend/order';
import { useOrderValues } from '@/contexts/order/OrderContext';
import { useCheckLogin } from '@/hooks';
import { TableView } from '@/components/common';
import { ReceiptPanel } from '@/components/payment';
import { MenuSelectPanel } from '../components/common';
import { deleteOrderMenu } from '@/utils/api/backend/order';

export const PaymentPage = () => {
  useCheckLogin(true);
  const { orders } = useOrderValues();
  const [selectedTableId, setSelectedTableId] = useState<string>('');
  const [isOrderPageVisible, setIsOrderPageVisible] = useState(false);

  const selectedTableOrders = useMemo(() => {
    const filteredOrders = orders.filter(
      (order) => order.receipt.tableInfo.tableId === selectedTableId,
    );
    const completedOrders = filteredOrders.map((order) => ({
      ...order,
      orderMenus: order.orderMenus.filter(
        (menu) =>
          menu.orderMenuStatus === 'COMPLETED' ||
          menu.orderMenuStatus === 'COOKING',
      ),
    }));
    return completedOrders;
  }, [orders, selectedTableId]);

  const handleTableDoubleClick = (tableId: string) => {
    setSelectedTableId(tableId);
    setIsOrderPageVisible(true);
  };

  const handleProductClick = async (menuId: number) => {
    try {
      const receiptId = selectedTableOrders[0].receipt.receiptInfo.receiptId;
      const menu = selectedTableOrders
        .find((order) =>
          order.orderMenus.some((menu) => menu.menuInfo.menuId === menuId),
        )
        ?.orderMenus.find((menu) => menu.menuInfo.menuId === menuId);

      if (!receiptId) {
        toast.warn('영수증 ID가 존재하지 않습니다.');
        return;
      }

      if (menu) {
        // 메뉴가 이미 존재하는 경우 수량 증가
        await updateOrderMenuQuantity(menu.orderMenuId, menu.quantity + 1);
      } else {
        // 메뉴가 없는 경우 새로 추가
        await createDirectOrder(receiptId, [{ menuId, menuQuantity: 1 }]);
      }
    } catch (e) {
      toast.error('주문 추가 실패');
    }
  };

  const handleChangeAmount = async (menuId: number, amount: number) => {
    try {
      const menu = selectedTableOrders
        .find((order) =>
          order.orderMenus.some((menu) => menu.menuInfo.menuId === menuId),
        )
        ?.orderMenus.find((menu) => menu.menuInfo.menuId === menuId)!;
      if (menu.quantity === 1 && amount === -1) {
        await deleteOrderMenu(menu.orderMenuId);
      } else {
        await updateOrderMenuQuantity(menu.orderMenuId, amount + menu.quantity);
      }
    } catch (e) {
      toast.error('수량 변경 실패');
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
      <ReceiptPanel
        order={selectedTableOrders}
        onChangeAmount={handleChangeAmount}
      />
    </section>
  );
};
export default PaymentPage;
