import { Aside } from '@/components/order';

export const OrderPage = () => {
  return (
    <section className="flex flex-row w-full flex-1 h-0">
      <Aside />
      <section className="flex flex-col flex-1 w-0"></section>
    </section>
  );
};
export default OrderPage;
