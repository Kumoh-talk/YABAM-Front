import { AddRounded } from '@mui/icons-material';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
} from '@/utils/functions';
import { Button } from '@/components/common';
import { OrderInfo, OrderMenuInfo } from '@/types/backend/order';
import { useTableActions, useTableValues } from '@/contexts/table/TableContext';
import { OrderHeader, ProductList } from './components';
import { useEffect, useState } from 'react';
import { stopReceipts, adjustReceipts } from '@/utils/api/backend/receipt';
import { useOrderContext } from '@/contexts/order/OrderContext';
import { Table } from '@/types';

export interface Props {
  mode?: 'order' | 'receipt';
  table?: Table;
  order?: OrderInfo[];
  onChangeAmount?: (id: number, amount: number) => void;
  onSubmitOrder?: (menuInfos: OrderMenuInfo[]) => void;
  isProcessing?: boolean;
}

export const ReceiptPanel = (props: Props) => {
  const { calcTableCost } = useTableActions();
  const { tables } = useTableValues();
  const [usedTime, setUsedTime] = useState<number>(0);
  const filteredOrder =
    props.order?.filter((o) => o.receipt.receiptInfo.isAdjustment === false) ??
    [];
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
    const receiptIds = Array.from(
      new Set(filteredOrder.map((o) => o.receipt.receiptInfo.receiptId)),
    );
    try {
      await stopReceipts(receiptIds);
      await adjustReceipts(receiptIds);
      await refreshOrders();
      alert('결제가 완료되었습니다!');
    } catch (e) {
      alert('결제 처리 중 오류가 발생했습니다.');
    }
  };

  const flattedMenus = filteredOrder
    ?.flatMap((orderItem) => orderItem.orderMenus)
    .reduce((acc, menu) => {
      const existingMenu = acc.find(
        (m) => m.menuInfo.menuId === menu.menuInfo.menuId,
      );
      if (existingMenu) {
        existingMenu.quantity += menu.quantity;
      } else {
        acc.push({ ...menu });
      }
      return acc;
    }, [] as OrderMenuInfo[]);

  const receiptFooter = filteredOrder && (
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
        <Button
          className="flex-1 py-8 text-2xl"
          color="primary"
          onClick={handlePayment}
        >
          <span className="text-xl">결제</span>
        </Button>
      </div>
    </footer>
  );

  const orderFooter = (
    <footer className="flex flex-col border-t border-t-gray-500 pt-2 text-base leading-none font-medium">
      <div className="flex flex-row justify-between p-4 items-center">
        <span>총 금액</span>
        <span className="text-xl">{formatNumberWithComma(totalPrice)}원</span>
      </div>
      <div className="flex flex-row gap-4 p-4 text-white">
        <Button
          className="w-full py-8 text-2xl"
          color="primary"
          onClick={() => props.onSubmitOrder?.(flattedMenus)}
          isDisabled={props.isProcessing}
        >
          <span className="text-xl">
            {props.isProcessing ? '처리중입니다..' : '주문 넣기'}
          </span>
        </Button>
      </div>
    </footer>
  );

  return (
    <section className="flex flex-col w-[22.5rem] border-l border-gray-500">
      {(props.mode ?? 'receipt') === 'receipt' ? (
        <header className="flex flex-row justify-between items-center p-2.5 pl-1.5">
          <Button color="primary-transparent">
            <AddRounded />
          </Button>
          <span className="text-xl font-medium px-2">주문 내역</span>
        </header>
      ) : (
        <header className="flex flex-row justify-center items-center p-2.5 pl-1.5">
          <span className="text-xl font-medium px-2">
            {props.table?.number ?? 0}번 테이블
          </span>
        </header>
      )}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <OrderHeader />
        {flattedMenus.length > 0 ? (
          <ProductList
            items={flattedMenus}
            onChangeAmount={props.onChangeAmount}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-lg text-text-secondary">
            {(props.mode ?? 'receipt') === 'receipt'
              ? '주문내역이 없습니다'
              : '주문을 추가해주세요'}
          </div>
        )}
      </div>
      {(props.mode ?? 'receipt') === 'receipt' ? receiptFooter : orderFooter}
    </section>
  );
};
