import { AsideToggleButton, Clock, MainPageTab, StoreName } from './components';

export const Header = () => {
  return (
    <header className="flex h-[3.75rem] items-center justify-between bg-[#393e46] text-white">
      <div className="flex items-center w-[3.75rem] gap-4">
        <AsideToggleButton />
        <MainPageTab />
      </div>
      <StoreName />
      <div className="justify-end flex w-[3.75rem] items-center">
        <Clock />
      </div>
    </header>
  );
};
