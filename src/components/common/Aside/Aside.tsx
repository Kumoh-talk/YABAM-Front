import { motion } from 'framer-motion';
import { LogoutRounded } from '@mui/icons-material';
import { AsideItem } from './components';
import { list } from './constants';
import { useCommonValues } from '@/contexts/common/CommonContext';
import { Button } from '../Button/Button';

export const Aside = () => {
  const { isAsideOpened } = useCommonValues();

  return (
    <motion.aside
      className="flex flex-row justify-end h-full overflow-hidden"
      animate={{
        width: isAsideOpened ? '16rem' : 0,
      }}
    >
      <div className="flex flex-col gap-6 py-8 min-w-64 w-64 h-full bg-gray-200">
        <header className="flex flex-row items-center justify-between px-8">
          <span className="text-xl leading-none font-semibold">야밤</span>
          <Button isNoPadding color="tertiary-transparent">
            <LogoutRounded fontSize="medium" />
          </Button>
        </header>
        <ul className="flex flex-col px-4 items-center w-full h-0 flex-1 gap-2">
          {list.map((item, index) => (
            <AsideItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </motion.aside>
  );
};
