import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/common';
import { CategorySelect, ProductItem, ProductAddPanel } from '@/components/product';
import { useCategoryValues } from '@/contexts/category/CategoryContext';
import { useMenuValues, useMenuActions } from '@/contexts/menu/MenuContext';

export const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useCategoryValues();
  const { menus, isRefreshing } = useMenuValues();
  const { updateMenuOrder, updateMenuDetail, updateMenuSoldOut, removeMenu } = useMenuActions();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? 0);

  const moveProduct = async (dragIndex: number, hoverIndex: number) => {
    const filteredProducts = menus.filter(menu => menu.menuCategoryId === selectedCategoryId);
    const draggedProduct = filteredProducts[dragIndex];
    const targetProduct = filteredProducts[hoverIndex];
    await updateMenuOrder(draggedProduct.menuId, targetProduct.menuOrder);
  };

  const handleUpdate = async (menuId: number, field: 'name' | 'price' | 'description', value: string | number) => {
    const menu = menus.find(m => m.menuId === menuId);
    if (!menu) return;
    await updateMenuDetail(menuId, {
      menuName: field === 'name' ? value as string : menu.menuName,
      menuPrice: field === 'price' ? value as number : menu.menuPrice,
      menuDescription: field === 'description' ? value as string : menu.menuDescription,
      menuImageUrl: menu.menuImageUrl,
      menuIsRecommended: menu.menuIsRecommended,
      menuIsSoldOut: menu.menuIsSoldOut,
    });
  };

  const handleSoldOut = async (menuId: number, menuIsSoldOut: boolean) => {
    await updateMenuSoldOut(menuId, menuIsSoldOut);
  };

  const handleRemove = async (menuId: number) => {
    await removeMenu(menuId);
  };

  const filteredProducts = menus.filter(menu => menu.menuCategoryId === selectedCategoryId);
  const filteredIndices = menus
    .map((menu, index) => ({ menu, index }))
    .filter(({ menu }) => menu.menuCategoryId === selectedCategoryId)
    .map(({ index }) => index);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-6 p-8 w-full h-full">
        <div className="w-full gap-3 flex flex-col">
          <header className="w-full flex items-center justify-between">
            <div className="font-semibold text-2xl">상품</div>
            <Button onClick={() => setIsModalOpen(true)}>상품 등록</Button>
          </header>
          <div className="w-full flex justify-between items-center">
            <CategorySelect selected={selectedCategoryId} onSelect={setSelectedCategoryId} />
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
          <div className="text-center text-gray-500 py-8">해당 카테고리에 등록된 메뉴가 없습니다.</div>
        ) : (
          filteredProducts.map((product) => (
            <ProductItem
              key={product.menuId}
              id={product.menuId}
              image={product.menuImageUrl}
              name={product.menuName}
              price={product.menuPrice}
              description={product.menuDescription}
              recommended={product.menuIsRecommended}
              isSoldOut={product.menuIsSoldOut}
              moveProduct={moveProduct}
              onUpdate={handleUpdate}
              onSoldOut={handleSoldOut}
              onRemove={handleRemove}
            />
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
    </DndProvider>
  );
};

export default ProductPage;

