import { AddRounded } from '@mui/icons-material';
import { formatNumberWithComma, formatTimeString, getRelativeSeconds } from '@/utils/functions';
import { Button } from '@/components/common';
import { OrderInfo } from '@/types/backend/order';
import { useTableActions } from '@/contexts/table/TableContext';
import { OrderHeader, ProductList } from './components';
import { useEffect, useState } from 'react';

export interface Props {
  order?: OrderInfo[];
}

export const ReceiptPanel = ({ order }: Props) => {
  const { calcTableCost } = useTableActions();
  const [usedTime, setUsedTime] = useState<number>(0);
  const allPrice =
    order?.reduce((acc, curr) => {
      const orderTotalPrice = curr.orderMenus.reduce(
        (menuAcc, menu) => menuAcc + menu.menuInfo.menuPrice * menu.quantity,
        0
      );
      return acc + orderTotalPrice;
    }, 0) ?? 0;

  useEffect(() => {
    const updateTime = () => {
      const firstOrder = order?.[0];
      const seconds = firstOrder?.receipt?.receiptInfo?.startUsageTime
        ? getRelativeSeconds(firstOrder.receipt.receiptInfo.startUsageTime)
        : 0;
      setUsedTime(seconds);
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, [order]);

  const usedTimeString = formatTimeString(usedTime * 1000);
  const usedTimePrice = calcTableCost(usedTime);
  const totalPrice = allPrice + usedTimePrice;
  return (
    <section className="flex flex-col w-[22.5rem] border-l border-gray-500">
      <header className="flex flex-row justify-between items-center p-2.5 pl-1.5">
        <Button color="primary-transparent">
          <AddRounded />
        </Button>
        <span className="text-xl font-medium px-2">주문 내역</span>
      </header>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <OrderHeader />
        {order && order.length > 0 ? (
          order
            .slice()
            .reverse()
            .map((orderItem, index) => {
              const mergedMenus = orderItem.orderMenus.reduce((acc, menu) => {
                const existingMenu = acc.find((m) => m.menuInfo.menuId === menu.menuInfo.menuId);
                if (existingMenu) {
                  existingMenu.quantity += menu.quantity;
                } else {
                  acc.push({ ...menu });
                }
                return acc;
              }, [] as typeof orderItem.orderMenus);

              return (
                <div key={index} className={`flex flex-col${index % 2 === 1 ? ' bg-neutral-100' : ''}`}>
                  <div className="px-4 py-2 text-sm text-text-secondary">주문 #{order.length - index}</div>
                  <ProductList items={mergedMenus} />
                </div>
              );
            })
        ) : (
          <div className="flex flex-1 items-center justify-center text-lg text-gray-400">주문내역이 없습니다</div>
        )}
      </div>
      {order && (
        <footer className="flex flex-col border-t border-t-gray-500 pt-2 text-base leading-none font-medium">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between px-4 py-2">
              <span>구매 금액</span>
              <span>{formatNumberWithComma(allPrice)}원</span>
            </div>
            <div className="flex flex-row justify-between px-4 py-2">
              <span>테이블 사용료</span>
              <span className="flex flex-col gap-1 items-end">
                <span>{formatNumberWithComma(usedTimePrice)}원</span>
                <span className="text-text-secondary">{usedTimeString}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between p-4 items-center">
            <span>결제 금액</span>
            <span className="text-xl">{formatNumberWithComma(totalPrice)}원</span>
          </div>
          <div className="flex flex-row gap-4 p-4 text-white">
            <Button className="flex-1 py-8" color="tertiary">
              <span className="text-xl">사용종료</span>
            </Button>
            <Button className="flex-1 py-8 text-2xl" color="primary">
              <span className="text-xl">결제</span>
            </Button>
          </div>
        </footer>
      )}
    </section>
  );
};
