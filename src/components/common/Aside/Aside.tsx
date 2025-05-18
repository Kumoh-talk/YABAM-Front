import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoutRounded } from '@mui/icons-material';
import { AsideItem } from './components';
import { list } from './constants';
import { useCommonValues } from '@/contexts/common/CommonContext';
import { Button } from '../Button/Button';
import { useStoreActions } from '@/contexts/store/StoreContext';

export const Aside = () => {
  const { isAsideOpened } = useCommonValues();
  const { logout } = useStoreActions();
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const onClickLogout = async () => {
    const res = await logout();
    if (res) {
      navigate('/');
    }
  };

  return (
    <motion.aside
      className="flex flex-row justify-end h-full overflow-hidden"
      animate={{
        width: isHovered || isAsideOpened ? '16rem' : '1px',
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-6 py-8 min-w-64 w-64 h-full bg-gray-200">
        <header className="flex flex-row items-center justify-between px-8">
          <span className="text-xl leading-none font-semibold">야밤</span>
          <Button
            isNoPadding
            color="tertiary-transparent"
            onClick={onClickLogout}
          >
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
