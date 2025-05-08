import { useLocation } from 'react-router-dom';
import { PaymentPage } from './PaymentPage';
import { OrderPage } from './OrderPage';
import { useCheckLogin } from '@/hooks';

export const MainPage = () => {
  useCheckLogin(true);
  const location = useLocation();
  const { search } = location;
  const tab = new URLSearchParams(search).get('tab') ?? 'order';

  return tab === 'order' ? <OrderPage /> : <PaymentPage />;
};
export default MainPage;
