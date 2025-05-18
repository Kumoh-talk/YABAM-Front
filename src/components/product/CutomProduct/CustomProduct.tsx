import clsx from 'clsx';
import { MenuInfo } from '@/types/backend/menu';
import { formatNumberWithComma } from '@/utils/functions';

interface CustomProductProps {
  item: MenuInfo;
  onClick?: (id: number) => void;
}

export const CustomProduct = ({ item, onClick }: CustomProductProps) => {
  return (
    <div
      className={clsx(
        'w-[16.5rem] p-4 gap-4 flex flex-col rounded-lg border border-neutral-300 select-none active:border-primary',
        { 'opacity-50': item.menuIsSoldOut },
      )}
      onClick={() => !item.menuIsSoldOut && onClick?.(item.menuId)}
      style={{ cursor: item.menuIsSoldOut ? 'not-allowed' : 'pointer' }}
    >
      <div className="flex flex-col gap-2 h-full">
        <div className="font-medium text-lg">{item.menuName}</div>
        <div className="font-medium text-primary">
          {formatNumberWithComma(item.menuPrice)}원
        </div>
      </div>
    </div>
  );
};

export default CustomProduct;
