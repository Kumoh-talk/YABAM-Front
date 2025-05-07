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
  onClick?: (id: number) => void;
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
        'flex flex-col justify-between p-4 absolute w-[8.75rem] h-28 rounded-lg border border-gray-500 shadow-[0_4px_32px_rgba(0,0,0,.08)] text-text-primary select-none font-medium',
        { 'bg-gray-50': !props.isSelected },
        { 'bg-[#DEEEFC]': props.isSelected },
      )}
      style={{
        left: props.x,
        top: props.y,
      }}
      onClick={() => {
        props.onClick?.(props.table.id);
      }}
    >
      <span className="leading-none">{props.table.name}</span>
      <div className="flex flex-col leading-6">
        <span>{formatTimeString(time)}</span>
        <span className="font-bold">
          {formatNumberWithComma(props.price ?? 0)}원
        </span>
      </div>
    </div>
  );
};
