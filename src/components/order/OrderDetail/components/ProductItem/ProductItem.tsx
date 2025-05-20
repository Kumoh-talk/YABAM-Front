import clsx from 'clsx';
import {
  CheckRounded,
  CloseRounded,
  ReplayRounded,
  AddRounded,
  RemoveRounded,
} from '@mui/icons-material';
import { Button } from '@/components/common';
import { OrderMenuInfo } from '@/types/backend/order';
import { formatNumberWithComma } from '@/utils/functions';
import { useOrderActions } from '@/contexts/order/OrderContext';
import { useState } from 'react';

export interface Props {
  item: OrderMenuInfo;
  isOrderStarted?: boolean;
  orderId: number;
}

export const ProductItem = ({ item, isOrderStarted }: Props) => {
  const {
    cancelOrderMenu,
    completeOrderMenus,
    revertOrderMenu,
    setOrderMenuCompletedCount,
  } = useOrderActions();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(item.completedCount);

  const handleSubmit = () => {
    if (tempValue >= 0 && tempValue <= item.quantity) {
      setOrderMenuCompletedCount(item.orderMenuId, tempValue);
    } else {
      setTempValue(item.completedCount);
    }
    setIsEditing(false);
  };

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
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2 border border-gray-500 rounded-lg">
          <Button
            color="white"
            className="p-1"
            onClick={() =>
              setOrderMenuCompletedCount(
                item.orderMenuId,
                item.completedCount - 1,
              )
            }
            isDisabled={item.completedCount <= 0}
          >
            <RemoveRounded />
          </Button>
          {isEditing ? (
            <input
              type="number"
              className="w-16 text-center remove-arrow"
              value={tempValue}
              min={0}
              max={item.quantity}
              onChange={(e) => setTempValue(parseInt(e.target.value) || 0)}
              onBlur={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              autoFocus
            />
          ) : (
            <span
              className="w-8 text-center cursor-pointer"
              onClick={() => {
                setIsEditing(true);
                setTempValue(item.completedCount);
              }}
            >
              {item.completedCount}
            </span>
          )}
          <Button
            color="white"
            className="p-1"
            onClick={() =>
              setOrderMenuCompletedCount(
                item.orderMenuId,
                item.completedCount + 1,
              )
            }
            isDisabled={item.completedCount >= item.quantity}
          >
            <AddRounded />
          </Button>
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
                <Button
                  onClick={() => {
                    completeOrderMenus([item.orderMenuId]);
                    setOrderMenuCompletedCount(item.orderMenuId, item.quantity);
                  }}
                >
                  <CheckRounded />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </li>
  );
};
