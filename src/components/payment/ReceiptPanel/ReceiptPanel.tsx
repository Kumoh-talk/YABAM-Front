import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
} from '@/utils/functions';
import { Table } from '@/types';
import { OrderInfo, OrderMenuInfo } from '@/types/backend/order';
import { useTableActions, useTableValues } from '@/contexts/table/TableContext';
import { useOrderActions } from '@/contexts/order/OrderContext';
import { Button } from '@/components/common';
import { OrderHeader, ProductList } from './components';

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
  const { stopReceipt, adjustReceipt } = useOrderActions();
  const [isProcessingStop, setIsProcessingStop] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const receipt = filteredOrder[0]?.receipt.receiptInfo;
  const tableInfo = filteredOrder[0]?.receipt.tableInfo;
  const table = tables.find((t) => t.id === tableInfo?.tableId);

  useEffect(() => {
    const updateTime = () => {
      const startTime = receipt?.startUsageTime;
      const seconds = startTime
        ? getRelativeSeconds(startTime, receipt?.stopUsageTime ?? new Date())
        : 0;
      setUsedTime(seconds);
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, [receipt]);

  const usedTimeString = formatTimeString(usedTime * 1000);
  const usedTimePrice = table ? calcTableCost(usedTime, table.capacity) : 0;
  const totalPrice = allPrice + usedTimePrice;

  const onClickStopReceipt = async () => {
    if (!receipt) return;
    try {
      setIsProcessingStop(true);
      await stopReceipt(receipt);
    } catch (e) {
      toast.error('사용 종료 중 오류가 발생했습니다.');
    } finally {
      setIsProcessingStop(false);
    }
  };

  const onClickPayment = async () => {
    if (!receipt || !tableInfo) return;
    try {
      setIsProcessingPayment(true);
      await adjustReceipt(receipt, props.order!);
      toast.success('결제가 완료되었습니다!');
    } catch (e) {
      toast.error('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessingPayment(false);
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
        {!receipt?.stopUsageTime ? (
          <Button
            className="flex-1 py-8"
            color="tertiary"
            onClick={onClickStopReceipt}
            isDisabled={isProcessingStop || !receipt}
          >
            <span className="text-xl">
              {isProcessingStop
                ? '처리중..'
                : receipt
                ? '사용 종료'
                : '사용 중이 아님'}
            </span>
          </Button>
        ) : (
          <Button
            className="flex-1 py-8 text-2xl"
            color="primary"
            onClick={onClickPayment}
            isDisabled={isProcessingPayment}
          >
            <span className="text-xl">
              {isProcessingPayment ? '처리중..' : '결제 완료'}
            </span>
          </Button>
        )}
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
          isDisabled={props.isProcessing || flattedMenus.length === 0}
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
          <div />
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
