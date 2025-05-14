import { Table } from '@/types';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
} from '@/utils/functions';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export interface Props {
  table: Table;
  x: number;
  y: number;
  isSelected?: boolean;
  startedAt?: string;
  price?: number;
  onPointerDown?: (id: number, x: number, y: number) => void;
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

  return (
    <div
      className={clsx(
        'flex flex-col justify-between p-4 absolute w-[120px] h-[112px] rounded-lg border border-gray-500 shadow-[0_4px_32px_rgba(0,0,0,.08)] text-text-primary select-none font-medium',
        { 'bg-gray-50': !props.isSelected },
        { 'bg-[#DEEEFC]': props.isSelected },
      )}
      style={{
        left: props.x,
        top: props.y,
      }}
      onPointerDown={() => {
        props.onPointerDown?.(
          props.table.id,
          props.table.pos.x,
          props.table.pos.y,
        );
      }}
      onDragStart={(_) => false}
    >
      <span className="leading-none font-medium text-xl text-right">
        {props.table.number}
      </span>
      <div className="flex flex-col leading-6">
        <span className="text-text-secondary text-right">
          {formatTimeString(time)}
        </span>
        <span className="font-bold text-right">
          {formatNumberWithComma(props.price ?? 0)}원
        </span>
      </div>
    </div>
  );
};
