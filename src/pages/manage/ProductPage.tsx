import { useState } from 'react';
import { Button } from '@/components/common';
import { CategorySelect, ProductItem, ProductAddPanel } from '@/components/product';

export const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <div className="w-full gap-3 flex flex-col">
        <header className="w-full flex items-center justify-between">
          <div className="font-semibold text-2xl">상품</div>
          <Button onClick={() => setIsModalOpen(true)}>상품 등록</Button>
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
        index={0}
      />
      <ProductItem
        image=""
        name="상품명"
        price={0}
        description="상품 설명"
        recommended={false}
        soldOut={false}
        index={1}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative">
            <ProductAddPanel onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
