import { CategorySelect } from '../CategorySelect/CategorySelect';
import { Button } from '../../common/Button/Button';

interface Props {
  onClose?: () => void;
}

export const ProductAddPanel = ({ onClose }: Props) => {
  return (
    <div className="flex flex-col w-full h-full p-8 gap-8 border-2 bg-white border-gray-300 rounded-4xl justify-between">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl ">상품 추가</h1>
        <div className="flex flex-col gap-4">
          <div className="text-gray-800 px-4">카테고리</div>
          <CategorySelect selected="기본" onSelect={() => {}} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4">이름</div>
          <input className="w-full" type="text" placeholder="메뉴 이름" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4">가격</div>
          <div className="relative">
            <input className="w-full remove-arrow" type="number" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700">원</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4">설명</div>
          <textarea
            className="w-full px-4 py-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent rounded-md resize-none"
            placeholder="설명입니다"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Button color="tertiary" className="px-8 py-3 justify-center" onClick={onClose}>
          취소
        </Button>
        <Button color="primary" className="px-8 py-3 justify-center">
          추가
        </Button>
      </div>
    </div>
  );
};
