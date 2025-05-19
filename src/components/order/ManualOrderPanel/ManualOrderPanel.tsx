import { useState } from 'react';
import { toast } from 'react-toastify';
import { Table } from '@/types';
import { OrderInfo, OrderMenuInfo } from '@/types/backend/order';
import { useMenuValues } from '@/contexts/menu/MenuContext';
import { useOrderActions } from '@/contexts/order/OrderContext';
import { MenuSelectPanel } from '@/components/common';
import { ReceiptPanel } from '@/components/payment';

export type ManualOrderCartItem = {
  menuId: number;
  quantity: number;
};

export interface Props {
  table: Table;
  onClose?: () => void;
}

export const ManualOrderPanel = (props: Props) => {
  const { menus } = useMenuValues();
  const { requestManualOrder, confirmOrder } = useOrderActions();
  const [cart, setCart] = useState<ManualOrderCartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onClickMenu = (menuId: number) => {
    const existingItem = cart.find((item) => item.menuId === menuId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.menuId === menuId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { menuId, quantity: 1 }]);
    }
  };

  const onChangeAmount = (id: number, amount: number) => {
    setCart((oldCart) => {
      const existingItemIndex = oldCart.findIndex((item) => item.menuId === id);
      if (existingItemIndex !== -1) {
        const existingItem = oldCart[existingItemIndex];
        if (existingItem.quantity + amount > 0) {
          return oldCart.map((item) =>
            item.menuId === id
              ? { ...existingItem, quantity: existingItem.quantity + amount }
              : item,
          );
        } else {
          return oldCart.filter((item) => item.menuId !== id);
        }
      }
      return oldCart;
    });
  };

  const onSubmitOrder = async (menuInfos: OrderMenuInfo[]) => {
    try {
      setIsProcessing(true);
      const order = await requestManualOrder(props.table.id, menuInfos);
      await confirmOrder(order.orderId);

      toast.success('주문이 접수되었습니다.');
      props.onClose?.();
    } catch (e) {
      console.error(e);
      toast.error('주문을 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalPrice = cart.reduce((acc, item) => {
    const menu = menus.find(
      (menu) => menu.menuInfo.menuId === item.menuId,
    )?.menuInfo;
    if (menu) {
      return acc + menu.menuPrice * item.quantity;
    }
    return acc;
  }, 0);

  const cartOrder: OrderInfo = {
    orderId: -1,
    orderStatus: 'ORDERED',
    totalPrice,
    createdAt: new Date().toISOString(),
    receipt: {
      receiptInfo: {
        receiptId: '',
        isAdjustment: false,
        startUsageTime: null,
        stopUsageTime: null,
        occupancyFee: null,
      },
      tableInfo: {
        tableId: props.table.id,
        tableNumber: props.table.number,
        isActive: props.table.isActive,
        tableX: props.table.pos.x,
        tableY: props.table.pos.y,
        tableCapacity: props.table.capacity,
      },
    },
    orderMenus: cart.map(
      (item) =>
        ({
          orderMenuId: -1,
          orderMenuStatus: 'ORDERED',
          quantity: item.quantity,
          menuInfo: menus.find((menu) => menu.menuInfo.menuId === item.menuId)
            ?.menuInfo!,
        } as OrderMenuInfo),
    ),
  };

  return (
    <section className="flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0">
        <MenuSelectPanel
          selectedCategory={cart.map((item) => item.menuId)}
          onClickMenu={onClickMenu}
          onClose={props.onClose}
        />
      </section>
      <ReceiptPanel
        table={props.table}
        order={[cartOrder]}
        mode="order"
        onChangeAmount={onChangeAmount}
        onSubmitOrder={onSubmitOrder}
        isProcessing={isProcessing}
      />
    </section>
  );
};
