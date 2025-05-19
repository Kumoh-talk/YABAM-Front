import { useTableActions } from '@/contexts/table/TableContext';
import { OrderInfo } from '@/types/backend/order';
import { ReceiptInfo } from '@/types/backend/receipt';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
} from '@/utils/functions';

export interface Props {
  receipt: ReceiptInfo;
  orders: OrderInfo[];
}

export const OrderHistoryItem = (props: Props) => {
  const { calcTableCost } = useTableActions();
  const startedTime = props.receipt.startUsageTime!;
  const stoppedTime = props.receipt.stopUsageTime;
  const duration = stoppedTime
    ? new Date(stoppedTime!).getTime() - new Date(startedTime).getTime()
    : -1;

  const tableInfo = props.orders[0].receipt.tableInfo;

  const orderMenus: Record<string, number> = {};
  props.orders.forEach((order) =>
    order.orderMenus.forEach((menu) => {
      if (orderMenus[menu.menuInfo.menuName]) {
        orderMenus[menu.menuInfo.menuName] += menu.quantity;
      } else {
        orderMenus[menu.menuInfo.menuName] = menu.quantity;
      }
    }),
  );
  const menusStr = Object.entries(orderMenus)
    .map(([menuName, quantity]) => {
      return `${menuName} x ${quantity}`;
    })
    .join('\n');

  const startedTimeStr = new Date(startedTime).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const menuPrice = props.orders.reduce(
    (accm, order) => accm + order.totalPrice,
    0,
  );
  const tablePrice = calcTableCost(
    getRelativeSeconds(startedTime, stoppedTime ?? new Date()),
    tableInfo.tableCapacity,
  );
  const totalPrice = menuPrice + tablePrice;

  return (
    <li className="flex flex-col w-full rounded-lg even:bg-gray-100">
      <li className="flex flex-row gap-4 p-2 font-medium text-base leading-[140%]">
        <span className="w-[11.25rem] text-center">{startedTimeStr}</span>
        <span className="w-24 text-center">
          {tableInfo.tableNumber}번 테이블
        </span>
        {duration === -1 ? (
          <span className="w-[4.5rem] text-center">점유중</span>
        ) : (
          <span className="w-[4.5rem] text-right">
            {formatTimeString(duration)}
          </span>
        )}
        <span className="w-0 flex-1 whitespace-pre-line">{menusStr}</span>
        <span className="w-20 text-right">
          {formatNumberWithComma(menuPrice)}
        </span>
        <span className="w-[80px] text-right">
          {formatNumberWithComma(tablePrice)}
        </span>
        <span className="w-[80px] text-right">
          {formatNumberWithComma(totalPrice)}
        </span>
        <span className="w-[87px]"></span>
      </li>
    </li>
  );
};
