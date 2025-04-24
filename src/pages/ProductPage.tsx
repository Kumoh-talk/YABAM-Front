import { Button } from '@/components/common';
import { CategorySelect, ProductItem } from '@/components/product';

export const ProductPage = () => {
  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <div className="w-full gap-3 flex flex-col">
        <header className="w-full flex items-center justify-between">
          <div className="font-semibold text-2xl">상품</div>
          <Button>상품 등록</Button>
        </header>
        <div className="w-full flex justify-between items-center">
          <CategorySelect />
          <div className="flex gap-9 px-1">
            <div>사장님추천</div>
            <div>품절표시</div>
          </div>
        </div>
      </div>
      <ProductItem
        image=""
        name="상품명"
        price={0}
        description="상품 설명"
        recommended={false}
        soldOut={false}
      />
    </div>
  );
};
export default ProductPage;
