import { OrderHistoryItem } from './components';
import { useEffect, useState } from 'react';
import { OrderInfo } from '@/types/backend/order';
import { useOrderActions } from '@/contexts/order/OrderContext';
import { toast } from 'react-toastify';

export interface Props {
  saleId: number;
}
export const OrderHistoryList = (saleId: Props) => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const { getOrders } = useOrderActions();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(saleId.saleId, undefined, [
          'RECEIVED',
          'COMPLETED',
        ]);
        setOrders(response.pageContents);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('주문 내역을 불러오는 중 오류가 발생했습니다.');
      }
    };
    fetchOrders();
  }, [saleId.saleId]);

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
