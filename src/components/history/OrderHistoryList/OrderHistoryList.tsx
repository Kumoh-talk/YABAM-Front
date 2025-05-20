import { OrderInfo } from '@/types/backend/order';
import { OrderHistoryItem } from './components';
import { ProgressActivityIcon } from '@/assets/icon/ProgressActivityIcon';

export interface Props {
  receiptsAndOrders: OrderInfo[][];
  isLoading: boolean;
  onRemoveItem?: (receiptId: string) => void;
}
export const OrderHistoryList = (props: Props) => {
  const list = props.receiptsAndOrders.map((orders) => (
    <OrderHistoryItem
      key={orders[0].receipt.receiptInfo.receiptId}
      receipt={orders[0].receipt.receiptInfo}
      orders={orders}
      onRemoveItem={props.onRemoveItem}
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
      {props.isLoading ? (
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
