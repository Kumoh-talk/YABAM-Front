import { AddRounded } from '@mui/icons-material';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
} from '@/utils/functions';
import { Button } from '@/components/common';
import { OrderInfo } from '@/types/backend/order';
import { useTableActions, useTableValues } from '@/contexts/table/TableContext';
import { OrderHeader, ProductList } from './components';
import { useEffect, useState } from 'react';
import { stopReceipts, adjustReceipts } from '@/utils/api/backend/receipt';
import { useOrderContext } from '@/contexts/order/OrderContext';

export interface Props {
  order?: OrderInfo[];
}

export const ReceiptPanel = ({ order }: Props) => {
  const filteredOrder = order?.filter(o => o.receipt.receiptInfo.isAdjustment === false) ?? [];
  const { calcTableCost } = useTableActions();
  const { tables } = useTableValues();
  const [usedTime, setUsedTime] = useState<number>(0);
  const allPrice =
    filteredOrder.reduce((acc, curr) => {
      const orderTotalPrice = curr.orderMenus.reduce(
        (menuAcc, menu) => menuAcc + menu.menuInfo.menuPrice * menu.quantity,
        0,
      );
      return acc + orderTotalPrice;
    }, 0) ?? 0;
  const { refreshOrders } = useOrderContext();

  useEffect(() => {
    const updateTime = () => {
      const firstOrder = filteredOrder[0];
      const startTime = firstOrder?.receipt?.receiptInfo?.startUsageTime;
      const seconds = startTime ? getRelativeSeconds(startTime) : 0;
      setUsedTime(seconds);
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, [filteredOrder]);

  const firstOrder = filteredOrder[0];
  const tableId = firstOrder?.receipt?.tableInfo?.tableId;
  const table = tables.find((t) => t.id === tableId);

  const usedTimeString = formatTimeString(usedTime * 1000);
  const usedTimePrice = table ? calcTableCost(usedTime, table.capacity) : 0;
  const totalPrice = allPrice + usedTimePrice;

  const handlePayment = async () => {
    if (!filteredOrder || filteredOrder.length === 0) return;
    const receiptIds = Array.from(new Set(filteredOrder.map(o => o.receipt.receiptInfo.receiptId)));
    try {
      await stopReceipts(receiptIds);
      await adjustReceipts(receiptIds);
      await refreshOrders();
      alert('결제가 완료되었습니다!');
    } catch (e) {
      alert('결제 처리 중 오류가 발생했습니다.');
    }
  };

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
        {filteredOrder && filteredOrder.length > 0 ? (
          (() => {
            const allMenus = filteredOrder.flatMap(orderItem => orderItem.orderMenus);
            const mergedMenus = allMenus.reduce((acc, menu) => {
              const existingMenu = acc.find((m) => m.menuInfo.menuId === menu.menuInfo.menuId);
              if (existingMenu) {
                existingMenu.quantity += menu.quantity;
              } else {
                acc.push({ ...menu });
              }
              return acc;
            }, [] as typeof allMenus);
            return <ProductList items={mergedMenus} />;
          })()
        ) : (
          <div className="flex flex-1 items-center justify-center text-lg text-gray-400">
            주문내역이 없습니다
          </div>
        )}
      </div>
      {filteredOrder && (
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
            <span className="text-xl">
              {formatNumberWithComma(totalPrice)}원
            </span>
          </div>
          <div className="flex flex-row gap-4 p-4 text-white">
            <Button className="flex-1 py-8" color="tertiary">
              <span className="text-xl">사용종료</span>
            </Button>
            <Button className="flex-1 py-8 text-2xl" color="primary" onClick={handlePayment}>
              <span className="text-xl">결제</span>
            </Button>
          </div>
        </footer>
      )}
    </section>
  );
};
