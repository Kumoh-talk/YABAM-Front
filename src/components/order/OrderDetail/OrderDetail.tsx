import { useEffect } from 'react';
import { formatNumberWithComma, formatRelativeTime } from '@/utils/functions';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { Button } from '@/components/common';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { ProductItem, CallList } from './components';
import { Order, Table } from '@/types';

export interface Props {
  order: Order;
}

export const OrderDetail = ({ order }: Props) => {
  const { tables } = useStoreValues();
  useEffect(() => {
    dayjs.locale('ko');
  }, []);

  const table = tables.find((table) => table.id === order.tableId)!;

  const readyProducts = order.products.filter((product) => !product.isEnded);
  const completedProducts = order.products.filter((product) => product.isEnded);

  const controls = {
    ready: (
      <>
        <Button color="tertiary">주문 전체 취소</Button>
        <Button color="primary">주문 접수</Button>
      </>
    ),
    inProgress: <Button color="primary">전체 완료 처리</Button>,
    completed: <></>,
  };

  return (
    <main className="flex flex-col gap-8 p-8 w-full h-full overflow-y-auto">
      <header className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl leading-none font-medium">
            {table.number}번 테이블
          </h2>
          <span className="leading-none">
            {formatRelativeTime(order.orderAt)} 주문
          </span>
        </div>
        <div className="flex flex-row gap-2">{controls[order.status]}</div>
      </header>
      <div className="flex flex-row gap-8 h-max">
        <div className="flex flex-col gap-4">
          <OrderSummary order={order} table={table} />
          <CallList />
        </div>
        <section className="flex flex-col gap-8 w-0 flex-1">
          <ul className="flex flex-col gap-4">
            {readyProducts.map((product, index) => (
              <ProductItem
                key={index}
                product={product}
                isOrderStarted={order.status !== 'ready'}
              />
            ))}
          </ul>
          <ul className="flex flex-col gap-4">
            <span className="px-4 font-medium">완료됨</span>
            {completedProducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

const OrderSummary = ({ order, table }: { order: Order; table: Table }) => {
  return (
    <section className="flex flex-col gap-4 p-6 w-[20rem] rounded-lg border border-gray-500 h-fit">
      <SummaryLine
        label="주문 일시"
        body={dayjs(order.orderAt).format('YYYY. M. D. H:mm:ss')}
      />
      <SummaryLine
        label="총 주문 금액"
        body={`${formatNumberWithComma(43000)}원`}
      />
      <SummaryLine label="테이블" body={table.number + ''} />
      <SummaryLine label="쿠폰 사용" body={true ? 'O' : 'X'} />
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
