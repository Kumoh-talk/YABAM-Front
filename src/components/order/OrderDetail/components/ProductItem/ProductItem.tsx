import { Button } from '@/components/common';
import { OrderMenuInfo, OrderMenuStatus } from '@/types/backend/order';
import { formatNumberWithComma } from '@/utils/functions';
import { CheckRounded, CloseRounded, ReplayRounded } from '@mui/icons-material';
import clsx from 'clsx';
import { useOrder } from '@/hooks/useOrder';
import { useStoreValues } from '@/contexts/store/StoreContext';

export interface Props {
  item: OrderMenuInfo;
  isOrderStarted?: boolean;
  orderId: number;
  onStatusChange?: () => void;
}

export const ProductItem = ({ item, isOrderStarted, onStatusChange }: Props) => {
  const { store } = useStoreValues();
  const { handleCancel, handleComplete, handleReplay } = useOrder(store, null, onStatusChange);

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
        <div className="flex flex-row gap-2" onClick={(e) => e.stopPropagation()}>
          {['CANCELED', 'COMPLETED'].includes(item.orderMenuStatus) ? (
            <Button color="tertiary" onClick={() => handleReplay(item.orderMenuId)}>
              <ReplayRounded />
            </Button>
          ) : (
            <>
              <Button color="tertiary" onClick={() => handleCancel(item.orderMenuId)}>
                <CloseRounded />
              </Button>
              <Button color="primary" onClick={() => handleComplete(item.orderMenuId)}>
                <CheckRounded />
              </Button>
            </>
          )}
        </div>
      )}
    </li>
  );
};
