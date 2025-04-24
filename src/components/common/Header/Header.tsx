import { MenuRounded } from '@mui/icons-material';
import { Clock } from './components';
import { Button } from '../Button/Button';

export const Header = () => {
  const storeName = '가게 이름';
  return (
    <header className="flex h-[3.75rem] items-center justify-between bg-[#393e46] text-white">
      <Button
        color="white-transparent"
        className="w-[3.75rem] h-[3.75rem] justify-center"
      >
        <MenuRounded />
      </Button>
      <div className="font-semibold text-xl leading-6">{storeName}</div>
      <div className="justify-end flex w-[3.75rem] items-center">
        <Clock />
      </div>
    </header>
  );
};
