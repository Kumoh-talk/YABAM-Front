import { dummyOrders } from '@/components/order/OrderQueuePanel/constants';
import { ReceiptPanel } from '@/components/payment';

export const PaymentPage = () => {
  return (
    <section className="asdf flex flex-row w-full h-full">
      <section className="flex flex-col flex-1 w-0"></section>
      <ReceiptPanel order={dummyOrders[0]} />
    </section>
  );
};
export default PaymentPage;
