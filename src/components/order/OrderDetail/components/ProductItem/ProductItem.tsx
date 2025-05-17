import { Button } from '@/components/common';
import { OrderMenuInfo, OrderMenuStatus } from '@/types/backend/order';
import { formatNumberWithComma } from '@/utils/functions';
import { CheckRounded, CloseRounded, ReplayRounded } from '@mui/icons-material';
import clsx from 'clsx';
import { updateOrderMenuItemStatus } from '@/utils/api/backend/order';


export interface Props {
  item: OrderMenuInfo;
  isOrderStarted?: boolean;
  orderId: number;
  onStatusChange?: () => void;
}

export const ProductItem = ({ item, isOrderStarted, onStatusChange }: Props) => {
  const handleCancel = async () => {
    try {
      await updateOrderMenuItemStatus(item.orderMenuId, 'CANCELED' as OrderMenuStatus);
      onStatusChange?.();
    } catch (error) {
      console.error('주문 메뉴 취소 실패:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await updateOrderMenuItemStatus(item.orderMenuId, 'COMPLETED' as OrderMenuStatus);
      onStatusChange?.();
    } catch (error) {
      console.error('주문 메뉴 완료 처리 실패:', error);
    }
  };

  const handleReplay = async () => {
    try {
      await updateOrderMenuItemStatus(item.orderMenuId, 'COOKING' as OrderMenuStatus);
      onStatusChange?.();
    } catch (error) {
      console.error('주문 메뉴 재시작 실패:', error);
    }
  };

  console.log(item.orderMenuId);
  console.log(item.orderMenuStatus);
  console.log(item.menuInfo.menuPrice);

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
            <Button color="tertiary" onClick={handleReplay}>
              <ReplayRounded />
            </Button>
          ) : (
            <>
              <Button color="tertiary" onClick={handleCancel}>
                <CloseRounded />
              </Button>
              <Button color="primary" onClick={handleComplete}>
                <CheckRounded />
              </Button>
            </>
          )}
        </div>
      )}
    </li>
  );
};
