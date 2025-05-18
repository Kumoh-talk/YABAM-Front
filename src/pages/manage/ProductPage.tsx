import { useState, useMemo } from 'react';
import { Button } from '@/components/common';
import {
  CategorySelect,
  ProductItem,
  ProductAddPanel,
} from '@/components/product';
import { useCategoryValues } from '@/contexts/category/CategoryContext';
import { useMenuValues } from '@/contexts/menu/MenuContext';

export const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useCategoryValues();
  const { menus, isRefreshing } = useMenuValues();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id ?? 0,
  );

  const filteredProducts = useMemo(
    () =>
      menus.filter(
        ({ menuCategoryInfo }) =>
          menuCategoryInfo.menuCategoryId === selectedCategoryId,
      ),
    [menus, selectedCategoryId],
  );

  return (
    <div className="flex flex-col gap-6 p-8 w-full h-full">
      <div className="w-full gap-3 flex flex-col">
        <header className="w-full flex items-center justify-between">
          <div className="font-semibold text-2xl">상품</div>
          <Button onClick={() => setIsModalOpen(true)}>상품 등록</Button>
        </header>
        <div className="w-full flex justify-between items-center">
          <CategorySelect
            selected={selectedCategoryId}
            onSelect={setSelectedCategoryId}
          />
          <div className="flex gap-9 px-1">
            <div>사장님추천</div>
            <div>품절표시</div>
            <div>삭제</div>
          </div>
        </div>
      </div>
      <div>
        {isRefreshing ? (
          <div>로딩 중...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            해당 카테고리에 등록된 메뉴가 없습니다.
          </div>
        ) : (
          filteredProducts.map(({ menuInfo }) => (
            <ProductItem key={menuInfo.menuId} item={menuInfo} />
          ))
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative">
              <ProductAddPanel onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
