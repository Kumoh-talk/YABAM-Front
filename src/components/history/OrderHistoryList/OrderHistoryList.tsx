import { useOrderValues } from '@/contexts/order/OrderContext';
import { OrderHistoryItem } from './components';

export interface Props {
  saleId: number;
}
export const OrderHistoryList = (_: Props) => {
  const { orders } = useOrderValues();

  const list = orders.map((order) => (
    <OrderHistoryItem key={order.orderId} order={order} />
  ));
  return (
    <section className="flex flex-col gap-4 items-stretch px-8 overflow-y-auto">
      <header className="flex flex-row gap-4 px-2 font-medium text-base leading-[140%] text-center">
        <span className="w-[11.25rem]">주문일시</span>
        <span className="w-24">테이블 번호</span>
        <span className="w-[4.5rem]">점유 시간</span>
        <span className="w-0 flex-1">주문 내용</span>
        <span className="w-20">주문 금액</span>
        <span className="w-[80px]">테이블 사용</span>
        <span className="w-[80px]">총 금액</span>
        <span className="w-[87px]"></span>
      </header>
      <ul className="flex flex-col items-stretch">{list}</ul>
    </section>
  );
};
