import { OrderInfo } from '@/types/backend/order';
import {
  formarDateString,
  formatNumberWithComma,
  formatTimeString,
} from '@/utils/functions';

export interface Props {
  order: OrderInfo;
}

export const OrderHistoryItem = (props: Props) => {
  const startedTime = props.order.receipt.receiptInfo.startUsageTime!;
  const stoppedTime = props.order.receipt.receiptInfo.stopUsageTime;
  const duration = stoppedTime
    ? new Date(stoppedTime!).getTime() - new Date(startedTime).getTime()
    : -1;

  const menuStr = props.order.orderMenus
    .map((menu) => {
      return `${menu.menuInfo.menuName}x${menu.quantity}`;
    })
    .join('\n');

  const startUsageTime = props.order.createdAt ?? props.order.receipt.receiptInfo.startUsageTime!;
  const startedTimeStr = new Date(
    new Date(startUsageTime).getTime() -
      new Date().getTimezoneOffset() * 60 * 1000,
  ).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <li className="flex flex-row gap-4 px-2 font-medium text-base leading-[140%]">
      <span className="w-[11.25rem] text-center">{startedTimeStr}</span>
      <span className="w-24 text-center">
        {props.order.receipt.tableInfo.tableNumber}번 테이블
      </span>
      {duration === -1 ? (
        <span className="w-[4.5rem] text-center">점유중</span>
      ) : (
        <span className="w-[4.5rem] text-right">
          {formatTimeString(duration)}
        </span>
      )}
      <span className="w-0 flex-1 whitespace-pre-line">{menuStr}</span>
      <span className="w-20 text-right">0</span>
      <span className="w-[80px] text-right">0</span>
      <span className="w-[80px] text-right">
        {formatNumberWithComma(props.order.totalPrice)}
      </span>
      <span className="w-[87px]"></span>
    </li>
  );
};
