import { Table } from '@/types';
import { OrderItem } from './components';
import { OrderInfo, orderStatusList } from '@/types/backend/order';

export interface Props {
  orders: OrderInfo[];
  tables: Table[];
  currentOrderId: number;
  onClickOrder?: (id: number) => void;
  onStatusChange?: () => void;
}

export const OrderQueuePanel = ({ orders, tables, currentOrderId, onClickOrder, onStatusChange }: Props) => {
  const sorted = orders.sort(
    (a, b) =>
      new Date(b.receipt.receiptInfo.startUsageTime!).getTime() -
      new Date(a.receipt.receiptInfo.startUsageTime!).getTime()
  );

  const ordersByStatus = Object.fromEntries(
    orderStatusList.map((status) => [status, sorted.filter((order) => order.orderStatus === status)])
  );
  const orderCount = Object.fromEntries(orderStatusList.map((status) => [status, ordersByStatus[status].length]));

  return (
    <section className="flex flex-col w-[25rem] h-full border-l border-l-gray-500">
      <header className="flex flex-row justify-between px-4 py-3 bg-gray-200 text-sm leading-none font-medium">
        <span>주문 현황</span>
        <span className="flex flex-row gap-4">
          <span className="text-secondary">대기 {orderCount.ready}</span>
          <span className="text-primary">진행중 {orderCount.inProgress}</span>
          <span>완료 {orderCount.completed}</span>
        </span>
      </header>
      <ul className="overflow-y-scroll">
        {sorted.map((order) => {
          const table = tables.find((table) => table.id === order.receipt.tableInfo.tableId);
          if (!table) return null;
          return (
            <OrderItem
              key={order.orderId}
              order={order}
              table={table}
              isOpened={currentOrderId === order.orderId}
              onClick={onClickOrder}
              onStatusChange={onStatusChange}
            />
          );
        })}
      </ul>
    </section>
  );
};
