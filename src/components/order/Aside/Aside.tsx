import { formatNumberWithComma } from '@/utils/functions';
import { OrderList } from './components';
import { Props as OrderItemProps } from './components/OrderItem/OrderItem';

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

export const Aside = () => {
  const allPrice = dummy.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountedPrice = 2000;
  const totalPrice = allPrice - discountedPrice;
  return (
    <section className="flex flex-col w-[460px]">
      <header className="px-4 py-6 text-center text-2xl">주문 내역</header>
      <OrderList items={dummy} />
      <footer className="flex flex-col border-t px-8 text-2xl py-4 gap-4">
        <div className="flex flex-col">
          <div className="flex flex-row py-4">
            <span className="flex-1 w-0">구매 금액</span>
            <span>{formatNumberWithComma(allPrice)}원</span>
          </div>
          <div className="flex flex-row py-4 text-red-500">
            <span className="flex-1 w-0">할인 금액</span>
            <span>-{formatNumberWithComma(discountedPrice)}원</span>
          </div>
        </div>
        <div className="flex flex-row py-4">
          <span className="flex-1 w-0">결제 금액</span>
          <span>{formatNumberWithComma(totalPrice)}원</span>
        </div>
        <div className="flex flex-row gap-4">
          <button className="flex-1 py-10 bg-blue-400 text-white rounded-xl">
            접수
          </button>
          <button className="flex-1 py-10 bg-gray-500 text-white rounded-xl">
            결제
          </button>
        </div>
      </footer>
    </section>
  );
};
