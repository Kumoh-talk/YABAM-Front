import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { formatNumberWithComma } from '@/utils/functions';
import { Button } from '@/components/common';
import { OrderMenuInfo } from '@/types/backend/order';

export interface Props {
  item: OrderMenuInfo;
  onChangeAmount?: (id: number, amount: number) => void;
}

export const ProductItem = (props: Props) => {
  return (
    <li className="flex flex-row items-center px-4 py-3 text-base font-medium leading-none">
      <span className="flex-1 w-0">{props.item.menuInfo.menuName}</span>
      <div className="flex flex-row items-center">
        <Button
          color="primary-transparent"
          isNoPadding
          onClick={() => props.onChangeAmount?.(props.item.menuInfo.menuId, -1)}
        >
          <RemoveOutlined fontSize="small" />
        </Button>
        <span className="w-7 text-center">{props.item.quantity}</span>
        <Button
          color="primary-transparent"
          isNoPadding
          onClick={() => props.onChangeAmount?.(props.item.menuInfo.menuId, -1)}
        >
          <AddOutlined fontSize="small" />
        </Button>
      </div>
      <span className="w-20 text-right">
        {formatNumberWithComma(
          props.item.menuInfo.menuPrice * props.item.quantity,
        )}
      </span>
    </li>
  );
};
