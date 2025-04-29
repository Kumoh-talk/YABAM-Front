import { Button } from '@/components/common';
import { Product } from '@/types';
import { formatNumberWithComma } from '@/utils/functions';
import clsx from 'clsx';

export interface Props {
  product: Product;
}

export const ProductItem = ({ product }: Props) => {
  return (
    <li
      className={clsx(
        'flex flex-row px-4 py-3 justify-between items-center rounded-lg border border-gray-500',
        { 'opacity-50': product.isEnded },
      )}
    >
      <div className="flex flex-col gap-2 font-medium">
        <span className="flex flex-row gap-4 text-xl leading-none">
          <span>{product.name}</span>
          <span className="font-normal">{product.quantity}개</span>
        </span>
        <span className="text-base leading-none">
          {formatNumberWithComma(product.price)}원
        </span>
      </div>
      <div className="flex flex-row gap-2">
        {product.isEnded ? (
          <Button color="tertiary">다시 조리하기</Button>
        ) : (
          <>
            <Button color="tertiary">취소</Button>
            <Button color="primary">완료</Button>
          </>
        )}
      </div>
    </li>
  );
};
