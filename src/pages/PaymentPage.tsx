import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  createDirectOrder,
  updateOrderMenuQuantity,
} from "@/utils/api/backend/order";
import { useOrderValues } from "@/contexts/order/OrderContext";
import { useCheckLogin } from "@/hooks";
import { TableView } from "@/components/common";
import { ReceiptPanel } from "@/components/payment";
import { MenuSelectPanel } from "../components/common";
import { deleteOrderMenu } from "@/utils/api/backend/order";

export const PaymentPage = () => {
  useCheckLogin(true);
  const { orders } = useOrderValues();
  const [selectedTableId, setSelectedTableId] = useState<string>("");
  const [isOrderPageVisible, setIsOrderPageVisible] = useState(false);

  const selectedTableOrders = useMemo(() => {
    const filteredOrders = orders.filter(
      (order) => order.receipt.tableInfo.tableId === selectedTableId,
    );
    const completedOrders = filteredOrders
      .map((order) => ({
        ...order,
        orderMenus: order.orderMenus.filter(
          (menu) =>
            menu.orderMenuStatus === "COMPLETED" ||
            menu.orderMenuStatus === "COOKING",
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
        toast.warn("영수증 ID가 존재하지 않습니다.");
        return;
      }
      await createDirectOrder(receiptId, [{ menuId, menuQuantity: 1 }]);
    } catch (e) {
      alert("주문 추가 실패");
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
      alert("수량 변경 실패");
    }
  };

  return (
    <section className='flex flex-row w-full h-full'>
      <section className='flex flex-col flex-1 w-0'>
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
            orders={orders}
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
