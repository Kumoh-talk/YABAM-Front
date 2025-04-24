import { formatNumberWithComma } from '@/utils/functions';
import { OrderHeader, OrderList } from './components';
import { Props as OrderItemProps } from './components/OrderItem/OrderItem';
import { Button } from '@/components/common';
import { AddRounded } from '@mui/icons-material';

const dummy: OrderItemProps[] = [
  {
    menuName: '짜장면',
    quantity: 1,
    price: 5000,
  },
  {
    menuName: '짬뽕',
    quantity: 2,
    price: 7000,
  },
  {
    menuName: '탕수육',
    quantity: 1,
    price: 20000,
  },
];

export const ReceiptPanel = () => {
  const allPrice = dummy.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountedPrice = 2000;
  const totalPrice = allPrice - discountedPrice;
  return (
    <section className="flex flex-col w-[22.5rem] border-l border-gray-500">
      <header className="flex flex-row justify-between items-center p-2.5 pl-1.5">
        <Button color="primary-transparent">
          <AddRounded />
        </Button>
        <span className="text-xl font-medium px-2">주문 내역</span>
      </header>
      <OrderHeader />
      <OrderList items={dummy} />
      <footer className="flex flex-col border-t border-t-gray-500 pt-2 text-base leading-none font-medium">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between px-4 py-2">
            <span>구매 금액</span>
            <span>{formatNumberWithComma(allPrice)}원</span>
          </div>
          <div className="flex flex-row justify-between px-4 py-2 text-red-500">
            <span>할인 금액</span>
            <span>-{formatNumberWithComma(discountedPrice)}원</span>
          </div>
        </div>
        <div className="flex flex-row justify-between p-4 items-center">
          <span>결제 금액</span>
          <span className="text-xl">{formatNumberWithComma(totalPrice)}원</span>
        </div>
        <div className="flex flex-row gap-4 p-4 text-2xl leading-none text-white">
          <button className="flex-1 py-8 bg-primary rounded-xl">접수</button>
          <button className="flex-1 py-8 bg-tertiary rounded-xl">결제</button>
        </div>
      </footer>
    </section>
  );
};
