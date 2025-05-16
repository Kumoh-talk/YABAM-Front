import { Button } from '@/components/common';
import { OrderMenuInfo } from '@/types/backend/order';
import { formatNumberWithComma } from '@/utils/functions';
import { CheckRounded, CloseRounded, ReplayRounded } from '@mui/icons-material';
import clsx from 'clsx';

export interface Props {
  item: OrderMenuInfo;
  isOrderStarted?: boolean;
}

export const ProductItem = ({ item, isOrderStarted }: Props) => {
  return (
    <li
      className={clsx(
        'flex flex-row px-4 py-3 justify-between items-center rounded-lg border border-gray-500',
        { 'opacity-50': item.orderMenuStatus === 'CANCELED' },
        { 'opacity-50': item.orderMenuStatus === 'COMPLETED' },
      )}
    >
      <div className="flex flex-col gap-2 font-medium">
        <span className="flex flex-row gap-4 text-xl leading-none">
          <span>{item.menuInfo.menuName}</span>
          <span className="font-normal">{item.quantity}개</span>
        </span>
        <span className="text-base leading-none">
          {formatNumberWithComma(item.menuInfo.menuPrice)}원
        </span>
      </div>
      {isOrderStarted && (
        <div className="flex flex-row gap-2">
          {['CANCELED', 'COMPLETED'].includes(item.orderMenuStatus) ? (
            <Button color="tertiary">
              <ReplayRounded />
            </Button>
          ) : (
            <>
              <Button color="tertiary">
                <CloseRounded />
              </Button>
              <Button color="primary">
                <CheckRounded />
              </Button>
            </>
          )}
        </div>
      )}
    </li>
  );
};
