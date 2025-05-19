import clsx from 'clsx';
import { CheckRounded, CloseRounded, ReplayRounded } from '@mui/icons-material';
import { Button } from '@/components/common';
import { OrderMenuInfo } from '@/types/backend/order';
import { formatNumberWithComma } from '@/utils/functions';
import { useOrderActions } from '@/contexts/order/OrderContext';

export interface Props {
  item: OrderMenuInfo;
  isOrderStarted?: boolean;
  orderId: number;
}

export const ProductItem = ({ item, isOrderStarted }: Props) => {
  const { cancelOrderMenu, completeOrderMenus, revertOrderMenu } =
    useOrderActions();

  return (
    <li
      className={clsx(
        'flex flex-row px-4 py-3 justify-between items-center rounded-lg border border-gray-500',
        {
          'opacity-50': ['CANCELED', 'COMPLETED'].includes(
            item.orderMenuStatus,
          ),
        },
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
        <div
          className="flex flex-row gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {['CANCELED', 'COMPLETED'].includes(item.orderMenuStatus) ? (
            <Button
              color="tertiary"
              onClick={() => revertOrderMenu(item.orderMenuId)}
            >
              <ReplayRounded />
            </Button>
          ) : (
            <>
              <Button
                color="tertiary"
                onClick={() => cancelOrderMenu(item.orderMenuId)}
              >
                <CloseRounded />
              </Button>
              <Button onClick={() => completeOrderMenus([item.orderMenuId])}>
                <CheckRounded />
              </Button>
            </>
          )}
        </div>
      )}
    </li>
  );
};
