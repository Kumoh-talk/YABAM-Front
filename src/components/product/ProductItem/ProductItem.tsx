import { useState } from 'react';
import { BlackPlusIcon } from '@/assets/icon/BlackPlusCcon';
import { Toggle } from '../../common';

export interface Props {
  image: string;
  name: string;
  price: number;
  description: string;
  recommended: boolean;
  soldOut: boolean;
}

export const ProductItem = (Props: Props) => {
  const [isRecommended, setIsRecommended] = useState(Props.recommended);
  const [isSoldOut, setIsSoldOut] = useState(Props.soldOut);

  return (
    <div className="w-full h-auto flex justify-between items-center pr-2">
      <div className="w-auto h-auto gap-4 flex items-center justify-center">
        <div className="w-20 h-20 p-3 flex flex-col justify-center items-center rounded-lg border-1 border-[#989898]">
          {Props.image ? (
            <img src={Props.image} alt={Props.name} />
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center">
              <BlackPlusIcon />
              <div className="leading-6 ">이미지</div>
            </div>
          )}
        </div>
        <div className="w-auto h-auto flex flex-col gap-1 justify-baseline">
          <div className=" text-xl text-[#3B3B3C] leading-5">{Props.name}</div>
          <div className="leading-6 text-[#0092CA]">{Props.price}</div>
        </div>
        <div className="leading-6 text-[#6C6C6C]">{Props.description}</div>
      </div>
      <div className="flex gap-10">
        <Toggle
          color="primary"
          isSelected={isRecommended}
          onClick={() => setIsRecommended(!isRecommended)}
        />
        <Toggle
          color="secondary"
          isSelected={isSoldOut}
          onClick={() => setIsSoldOut(!isSoldOut)}
        />
      </div>
    </div>
  );
};
