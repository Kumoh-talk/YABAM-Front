import { Button } from '@/components/common';
import { formatRelativeTime } from '@/utils/functions';
import clsx from 'clsx';

export interface Props {
  id: number;
  status: OrderStatus;
  orderAt: string;
  tableName: string;
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export const OrderItem = (props: Props) => {
  return (
    <li
      className={clsx(
        'flex flex-col gap-3 p-4 text-sm leading-none border-b border-gray-500 cursor-pointer',
        { 'opacity-50': props.status === 'completed' },
      )}
    >
      <div className="flex flex-row justify-between items-center font-medium">
        <div className="flex flex-row gap-2 items-center">
          <StatusTag status={props.status} />
          <span>{props.tableName}</span>
        </div>
        <span>{formatRelativeTime(props.orderAt)}</span>
      </div>
      <ul className="flex flex-col gap-1">
        {props.products.map((product) => (
          <li key={product.id}>
            {product.name} x {product.quantity}
          </li>
        ))}
      </ul>
      {props.status === 'ready' && (
        <div className="flex flex-row self-end gap-2">
          <Button color="tertiary">취소</Button>
          <Button color="primary">접수</Button>
        </div>
      )}
    </li>
  );
};

export type OrderStatus = 'ready' | 'inProgress' | 'completed';
export const orderStatusList: OrderStatus[] = [
  'ready',
  'inProgress',
  'completed',
];

const StatusTag = ({ status }: { status: OrderStatus }) => {
  const color = {
    ready: 'bg-secondary text-text-dark-primary',
    inProgress: 'bg-primary text-text-dark-primary',
    completed: 'bg-gray-300 text-text-primary',
  }[status];
  const text = {
    ready: '대기',
    inProgress: '진행중',
    completed: '완료됨',
  }[status];

  return (
    <span
      className={`text-sm leading-none font-medium p-1 rounded-sm ${color}`}
    >
      {text}
    </span>
  );
};
