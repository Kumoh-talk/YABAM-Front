import { AddRounded } from '@mui/icons-material';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
} from '@/utils/functions';
import { Button } from '@/components/common';
import { Order } from '@/types';
import { useStoreActions } from '@/contexts/store/StoreContext';
import { OrderHeader, ProductList } from './components';
import { useEffect, useState } from 'react';

export interface Props {
  order?: Order;
}

export const ReceiptPanel = ({ order }: Props) => {
  const { calcTableCost } = useStoreActions();
  const [usedTime, setUsedTime] = useState<number>(0);
  const allPrice =
    order?.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    ) ?? 0;
  const discountedPrice = 2000;

  useEffect(() => {
    const updateTime = () => {
      const seconds = order ? getRelativeSeconds(order.orderAt) : 0;
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
  const totalPrice = allPrice + usedTimePrice - discountedPrice;
  return (
    <section className="flex flex-col w-[22.5rem] border-l border-gray-500">
      <header className="flex flex-row justify-between items-center p-2.5 pl-1.5">
        <Button color="primary-transparent">
          <AddRounded />
        </Button>
        <span className="text-xl font-medium px-2">주문 내역</span>
      </header>
      <OrderHeader />
      <ProductList items={order?.products ?? []} />
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
            <div className="flex flex-row justify-between px-4 py-2 text-red-500">
              <span>할인 금액</span>
              <span>-{formatNumberWithComma(discountedPrice)}원</span>
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
            <Button className="flex-1 py-8 text-2xl" color="primary">
              <span className="text-xl">결제</span>
            </Button>
          </div>
        </footer>
      )}
    </section>
  );
};
