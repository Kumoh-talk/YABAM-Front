import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BlackPlusIcon } from '@/assets/icon/BlackPlusCcon';
import { Toggle } from '../../common';
import { DragIndicator } from '@mui/icons-material';

export interface Props {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  recommended: boolean;
  soldOut: boolean;
  index: number;
  moveProduct: (dragIndex: number, hoverIndex: number) => void;
}

export const ProductItem = (Props: Props) => {
  const [isRecommended, setIsRecommended] = useState(Props.recommended);
  const [isSoldOut, setIsSoldOut] = useState(Props.soldOut);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'PRODUCT',
    item: { index: Props.index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'PRODUCT',
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = Props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      Props.moveProduct(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`w-full h-auto flex justify-between items-center pr-2 ${
        Props.index % 2 === 0 ? 'bg-white rounded-lg' : 'bg-gray-100 rounded-lg'
      } z-0 ${isDragging ? 'opacity-50' : 'opacity-100'} transition-all duration-200 ease-in-out`}
    >
      <div className="w-auto h-auto gap-4 flex items-center justify-center cursor-move">
        <DragIndicator className="text-gray-400 hover:text-gray-600" />
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
          <div className="text-xl text-[#3B3B3C] leading-5">{Props.name}</div>
          <div className="leading-6 text-[#0092CA]">{Props.price.toLocaleString()}원</div>
        </div>
        <div className="leading-6 text-[#6C6C6C]">{Props.description}</div>
      </div>
      <div className="flex gap-10">
        <Toggle color="primary" isSelected={isRecommended} onClick={() => setIsRecommended(!isRecommended)} />
        <Toggle color="secondary" isSelected={isSoldOut} onClick={() => setIsSoldOut(!isSoldOut)} />
      </div>
    </div>
  );
};
