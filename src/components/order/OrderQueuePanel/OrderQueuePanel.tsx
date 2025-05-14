import { Order, orderStatusList, Table } from '@/types';
import { OrderItem } from './components';

export interface Props {
  orders: Order[];
  tables: Table[];
  currentOrderId: number;
  onClickOrder?: (id: number) => void;
}

export const OrderQueuePanel = ({
  orders,
  tables,
  currentOrderId,
  onClickOrder,
}: Props) => {
  const sorted = orders.sort(
    (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime(),
  );

  const ordersByStatus = Object.fromEntries(
    orderStatusList.map((status) => [
      status,
      sorted.filter((order) => order.status === status),
    ]),
  );
  const orderCount = Object.fromEntries(
    orderStatusList.map((status) => [status, ordersByStatus[status].length]),
  );
  const list = Object.fromEntries(
    orderStatusList.map((status) => [
      status,
      ordersByStatus[status].map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          table={tables.find((table) => table.id === order.tableId)!}
          isOpened={currentOrderId === order.id}
          onClick={onClickOrder}
        />
      )),
    ]),
  );

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
        {list.inProgress}
        {list.ready}
        {list.completed}
      </ul>
    </section>
  );
};
