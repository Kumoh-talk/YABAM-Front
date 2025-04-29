import { Button } from '@/components/common';
import { formatRelativeTime } from '@/utils/functions';
import clsx from 'clsx';
import { Order, OrderStatus } from '@/types';
import { CheckRounded, CloseRounded } from '@mui/icons-material';

export interface Props {
  order: Order;
  isOpened: boolean;
  onClick?: (id: number) => void;
}

export const OrderItem = ({ order, isOpened, onClick }: Props) => {
  return (
    <li
      className={clsx(
        'flex flex-col gap-3 p-4 text-sm leading-none border-b border-gray-500 cursor-pointer',
        { 'opacity-50': order.status === 'completed' },
        { 'border-l-4 border-l-primary': isOpened },
      )}
      onClick={() => onClick?.(order.id)}
    >
      <div className="flex flex-row justify-between items-center font-medium">
        <div className="flex flex-row gap-2 items-center">
          <StatusTag status={order.status} />
          <span>{order.tableName}</span>
        </div>
        <span>{formatRelativeTime(order.orderAt)}</span>
      </div>
      <ul className="flex flex-col gap-1">
        {order.products.map((product) => (
          <li key={product.id}>
            {product.name} x {product.quantity}
          </li>
        ))}
      </ul>
      {order.status === 'ready' && (
        <div className="flex flex-row self-end gap-2">
          <Button color="tertiary">
            <CloseRounded />
          </Button>
          <Button color="primary">
            <CheckRounded />
          </Button>
        </div>
      )}
    </li>
  );
};

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
