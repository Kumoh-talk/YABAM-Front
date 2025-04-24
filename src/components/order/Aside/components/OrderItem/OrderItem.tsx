import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { formatNumberWithComma } from '@/utils/functions';

export interface Props {
  menuName: string;
  quantity: number;
  price: number;
}

export const OrderItem = (props: Props) => {
  return (
    <li className="flex flex-row items-center px-8 py-7 border-b">
      <span className="flex-1 w-0 text-xl">{props.menuName}</span>
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row px-4 py-2 gap-4 rounded-xl border">
          <button>
            <RemoveOutlined fontSize="small" />
          </button>
          <span className="w-4 flex justify-center">{props.quantity}</span>
          <button>
            <AddOutlined fontSize="small" />
          </button>
        </div>
        <span className="w-20 text-right text-base">
          {formatNumberWithComma(props.price)} 원
        </span>
      </div>
    </li>
  );
};
