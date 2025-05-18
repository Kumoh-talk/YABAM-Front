import { Table } from '@/types';
import {
  formatNumberWithComma,
  formatTimeString,
  getRelativeSeconds,
} from '@/utils/functions';
import clsx from 'clsx';
import { useEffect, useState, useMemo } from 'react';

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
  orderMenus?: {
    menuInfo: { menuPrice: number };
    quantity: number;
  }[];
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

  const tableColor = props.table.capacity === 4 ? '#6299FE' : '#dc3545';
  const textColor = '#FFFFFF';

  // 메뉴 총합 계산 (orderMenus, price가 바뀔 때마다 갱신)
  const menuTotal = useMemo(() => {
    return props.orderMenus
      ? props.orderMenus.reduce((sum, menu) => sum + (menu.menuInfo.menuPrice ?? 0) * (menu.quantity ?? 1), 0)
      : 0;
  }, [props.orderMenus]);

  const totalPrice = useMemo(() => {
    return (props.price ?? 0) + menuTotal;
  }, [props.price, menuTotal]);

  return (
    <div
      className={clsx(
        'flex flex-col justify-between absolute w-[120px] h-[112px] rounded-lg shadow-[0_4px_32px_rgba(0,0,0,.08)] select-none font-medium',
        {
          'border border-gray-500 p-4': !props.table.isActive,
          'border-2 border-primary p-3.5': props.table.isActive,
        }
      )}
      style={{
        left: props.x,
        top: props.y,
        width: props.table.capacity === 6 ? '120px' : '100px',
        backgroundColor: tableColor,
        color: textColor,
      }}
      onPointerDown={() =>
        props.onPointerDown?.(props.table.id, props.table.pos.x, props.table.pos.y)
      }
      onDoubleClick={() => props.onDoubleClick?.(props.table.id)}
      onDragStart={(e) => e.preventDefault()}
    >
      <span className="leading-none font-bold text-xl text-right" style={{ color: '#ffffff' }}>
        {props.table.number}
      </span>
      <div className="flex flex-col leading-6">
        {props.isEditable ? (
          <></>
        ) : (
          <>
            <span
              className="text-lg font-bold text-right"
              style={{ color: '#ffffff' }}
            >
              {formatTimeString(time)}
            </span>
            <span className="font-bold text-right">
              {formatNumberWithComma(totalPrice)}원
            </span>
          </>
        )}
      </div>
    </div>
  );
};
