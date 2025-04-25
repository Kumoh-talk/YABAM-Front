import { OrderItem } from './components';
import { orderStatusList } from './components/OrderItem/OrderItem';
import { dummyOrders } from './constants';

export const OrderQueuePanel = () => {
  const sorted = dummyOrders.sort(
    (a, b) => new Date(b.orderAt).getTime() - new Date(a.orderAt).getTime(),
  );

  const orders = Object.fromEntries(
    orderStatusList.map((status) => [
      status,
      sorted.filter((order) => order.status === status),
    ]),
  );
  const orderCount = Object.fromEntries(
    orderStatusList.map((status) => [status, orders[status].length]),
  );
  const list = Object.fromEntries(
    orderStatusList.map((status) => [
      status,
      orders[status].map((order) => <OrderItem key={order.id} {...order} />),
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
