import { LogoutRounded } from '@mui/icons-material';
import { AsideItem } from './components';
import { list } from './constants';

export const Aside = () => {
  const storeName = '가게 이름';

  return (
    <aside className="flex flex-col w-64 gap-6 py-8 bg-gray-200">
      <header className="flex flex-row items-center justify-between px-8">
        <span className="text-xl leading-none font-semibold">{storeName}</span>
        <LogoutRounded fontSize="medium" />
      </header>
      <ul className="flex flex-col px-4 items-center w-full h-0 flex-1 gap-2">
        {list.map((item, index) => (
          <AsideItem key={index} {...item} />
        ))}
      </ul>
    </aside>
  );
};
