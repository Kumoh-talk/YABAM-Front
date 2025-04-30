import { useLocation } from 'react-router-dom';
import { MainPageTabItem } from './MainPageTabItem';

export const MainPageTab = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/main';
  if (!isMainPage) return <></>;

  return (
    <div className="flex flex-row p-1 rounded-lg bg-gray-900">
      <MainPageTabItem name="주문받기" to="order" />
      <MainPageTabItem name="정산하기" to="payment" />
    </div>
  );
};
