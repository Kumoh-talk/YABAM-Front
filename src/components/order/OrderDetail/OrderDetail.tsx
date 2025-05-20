import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { formatNumberWithComma, formatRelativeTime } from '@/utils/functions';
import { CloseRounded } from '@mui/icons-material';
import { Table } from '@/types';
import { OrderInfo } from '@/types/backend/order';
import { useTableValues } from '@/contexts/table/TableContext';
import { useOrderActions } from '@/contexts/order/OrderContext';
import { Button } from '@/components/common';
import { ProductItem } from './components';
import { useCallValues } from '@/contexts/call/CallContext';

export interface Props {
  order: OrderInfo;
  onClose?: () => void;
}

export const OrderDetail = ({ order, onClose }: Props) => {
  const { tables } = useTableValues();
  const {
    cancelOrder,
    confirmOrder,
    completeOrderMenus,
    setOrderMenuCompletedCount,
  } = useOrderActions();
  const { handleCompleteCall } = useCallValues();

  useEffect(() => {
    dayjs.locale('ko');
  }, []);

  const table = tables.find(
    (table) => table.id === order.receipt.tableInfo.tableId,
  )!;

  const readyOrderMenus = order.orderMenus.filter((product) =>
    ['ORDERED', 'COOKING'].includes(product.orderMenuStatus),
  );
  const completedOrderMenus = order.orderMenus.filter(
    (product) => product.orderMenuStatus === 'COMPLETED',
  );
  const canceledOrderMenus = order.orderMenus.filter(
    (product) => product.orderMenuStatus === 'CANCELED',
  );

  const onClickCompleteAllMenus = async () => {
    await completeOrderMenus(order.orderMenus.map((menu) => menu.orderMenuId));
  };

  const controls = {
    ORDERED: (
      <>
        <Button color="tertiary" onClick={() => cancelOrder(order.orderId)}>
          주문 전체 취소
        </Button>
        <Button color="primary" onClick={() => confirmOrder(order.orderId)}>
          주문 접수
        </Button>
      </>
    ),
    RECEIVED: (
      <Button color="primary" onClick={onClickCompleteAllMenus}>
        전체 완료 처리
      </Button>
    ),
    COMPLETED: <></>,
    CANCELED: <></>,
  };

  return (
    <main className="flex flex-col gap-8 p-8 w-full h-full overflow-y-auto">
      <header className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl leading-none font-medium">
            {table.number}번 테이블
          </h2>
          <span className="leading-none">
            {formatRelativeTime(
              order.createdAt ?? order.receipt.receiptInfo.startUsageTime!,
            )}{' '}
            주문
          </span>
        </div>
        <div className="flex flex-row gap-2">
          {controls[order.orderStatus]}
          <Button color="black-transparent" onClick={() => onClose?.()}>
            <CloseRounded />
          </Button>
        </div>
      </header>
      <div className="flex flex-row gap-8 h-max">
        <div className="flex flex-col gap-4">
          <OrderSummary order={order} table={table} />
        </div>
        <section className="flex flex-col gap-8 w-0 flex-1">
          <ul className="flex flex-col gap-4">
            {readyOrderMenus.map((orderMenu, index) => (
              <ProductItem
                key={index}
                item={orderMenu}
                orderId={order.orderId}
                isOrderStarted={order.orderStatus !== 'ORDERED'}
              />
            ))}
          </ul>
          <ul className="flex flex-col gap-4">
            <span className="px-4 font-medium">완료됨</span>
            {completedOrderMenus.map((product, index) => (
              <ProductItem
                key={index}
                item={product}
                orderId={order.orderId}
                isOrderStarted={order.orderStatus !== 'ORDERED'}
              />
            ))}
          </ul>
          <ul className="flex flex-col gap-4">
            <span className="px-4 font-medium">취소됨</span>
            {canceledOrderMenus.map((product, index) => (
              <ProductItem
                key={index}
                item={product}
                orderId={order.orderId}
                isOrderStarted={order.orderStatus !== 'ORDERED'}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

const OrderSummary = ({ order, table }: { order: OrderInfo; table: Table }) => {
  return (
    <section className="flex flex-col gap-4 p-6 w-[20rem] rounded-lg border border-gray-500 h-fit">
      <SummaryLine
        label="주문 일시"
        body={dayjs(order.receipt.receiptInfo.startUsageTime!).format(
          'YYYY. M. D. H:mm:ss',
        )}
      />
      <SummaryLine
        label="총 주문 금액"
        body={`${formatNumberWithComma(order.totalPrice)}원`}
      />
      <SummaryLine label="테이블" body={table.number + ''} />
    </section>
  );
};

interface SummaryLineProps {
  label: string;
  body: string;
}
const SummaryLine = ({ label, body }: SummaryLineProps) => {
  return (
    <div className="flex flex-row gap-4 leading-none">
      <span className="w-24">{label}</span>
      <span className="font-medium">{body}</span>
    </div>
  );
};
