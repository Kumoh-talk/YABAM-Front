import { OrderQueuePanel } from '@/components/order';

export const OrderPage = () => {
  return (
    <section className="flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0"></section>
      <OrderQueuePanel />
    </section>
  );
};
export default OrderPage;
