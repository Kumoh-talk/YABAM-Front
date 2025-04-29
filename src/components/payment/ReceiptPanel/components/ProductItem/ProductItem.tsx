import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { formatNumberWithComma } from '@/utils/functions';
import { Button } from '@/components/common';
import { Product } from '@/types';

export interface Props {
  item: Product;
}

export const ProductItem = ({item}: Props) => {
  return (
    <li className="flex flex-row items-center px-4 py-3 text-base font-medium leading-none">
      <span className="flex-1 w-0">{item.name}</span>
      <div className="flex flex-row items-center">
        <Button color="primary-transparent" isNoPadding>
          <RemoveOutlined fontSize="small" />
        </Button>
        <span className="w-7 text-center">{item.quantity}</span>
        <Button color="primary-transparent" isNoPadding>
          <AddOutlined fontSize="small" />
        </Button>
      </div>
      <span className="w-20 text-right">
        {formatNumberWithComma(item.price)}
      </span>
    </li>
  );
};
