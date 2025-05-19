import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { OrderInfo } from '@/types/backend/order';
import { useOrderActions } from '@/contexts/order/OrderContext';
import { OrderHistoryItem } from './components';
import { ProgressActivityIcon } from '@/assets/icon/ProgressActivityIcon';

export interface Props {
  saleId: number;
}
export const OrderHistoryList = (saleId: Props) => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getOrders } = useOrderActions();

  const receiptsAndOrders = [
    ...new Set(orders.map((order) => order.receipt.receiptInfo.receiptId)),
  ]
    .map((receiptId) =>
      orders.filter(
        (order) => order.receipt.receiptInfo.receiptId === receiptId,
      ),
    )
    .sort((a, b) => {
      const aTime = new Date(
        a[0].receipt.receiptInfo.startUsageTime!,
      ).getTime();
      const bTime = new Date(
        b[0].receipt.receiptInfo.startUsageTime!,
      ).getTime();
      return bTime - aTime;
    });

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    fetchOrders();
  }, [saleId.saleId]);

  const list = receiptsAndOrders.map((orders) => (
    <OrderHistoryItem
      key={orders[0].receipt.receiptInfo.receiptId}
      receipt={orders[0].receipt.receiptInfo}
      orders={orders}
    />
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
      {isLoading ? (
        <>
          <div className="flex flex-col gap-2 items-center py-20">
            <ProgressActivityIcon className="fill-primary animate-spin size-12" />
            <span className="text-base font-medium">
              정산 내역 불러오는 중..
            </span>
          </div>
        </>
      ) : (
        <ul className="flex flex-col items-stretch">{list}</ul>
      )}
    </section>
  );
};
