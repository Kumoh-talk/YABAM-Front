import { MenuRounded } from '@mui/icons-material';
import { Button } from '@/components/common';
import { useCommonActions } from '@/contexts/common/CommonContext';

export const AsideToggleButton = () => {
  const { toggleAsideOpened } = useCommonActions();

  return (
    <Button
      color="white-transparent"
      className="min-w-[3.75rem] w-[3.75rem] h-[3.75rem] justify-center"
      onClick={toggleAsideOpened}
    >
      <MenuRounded />
    </Button>
  );
};
