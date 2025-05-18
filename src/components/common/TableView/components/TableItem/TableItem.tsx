import { Table } from '@/types';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
  getTableMenuTotal,
} from '@/utils/functions';
import clsx from 'clsx';
import { useEffect, useState, useMemo } from 'react';
import { OrderMenuInfo } from '@/types/backend/order';

export interface Props {
  table: Table;
  x: number;
  y: number;
  isSelected?: boolean;
  startedAt?: string;
  price?: number;
  isEditable?: boolean;
  onPointerDown?: (id: string, x: number, y: number) => void;
  onDoubleClick?: (id: string) => void;
  orderMenus?: OrderMenuInfo[];
}

export const TableItem = (props: Props) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const seconds = props.startedAt ? getRelativeSeconds(props.startedAt) : 0;
      setTime(seconds * 1000);
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, [props.startedAt]);

  const totalPrice = (props.price ?? 0) + getTableMenuTotal(props.orderMenus);

  return (
    <div
      className={clsx(
        'flex flex-col justify-between absolute h-[112px] rounded-lg shadow-[0_4px_32px_rgba(0,0,0,.08)] select-none font-medium text-white',
        {
          'border border-gray-500 p-4': !props.table.isActive,
          'border-4 border-secondary p-3': props.table.isActive,
          'w-[120px] bg-[#dc3545]': props.table.capacity === 6,
          'w-[108px] bg-[#6299fe]': props.table.capacity === 4,
        },
      )}
      style={{
        left: props.x,
        top: props.y,
      }}
      onPointerDown={() =>
        props.onPointerDown?.(
          props.table.id,
          props.table.pos.x,
          props.table.pos.y,
        )
      }
      onDoubleClick={() => props.onDoubleClick?.(props.table.id)}
      onDragStart={(e) => e.preventDefault()}
    >
      <span className="leading-none font-bold text-xl text-right">
        {props.table.number}
      </span>
      <div className="flex flex-col leading-6">
        {props.isEditable ? (
          <></>
        ) : (
          <>
            <span className="text-lg text-right">{formatTimeString(time)}</span>
            <span className="font-bold text-right">
              {formatNumberWithComma(totalPrice)}원
            </span>
          </>
        )}
      </div>
    </div>
  );
};
