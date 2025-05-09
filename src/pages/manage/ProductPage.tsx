import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/common';
import { CategorySelect, ProductItem, ProductAddPanel } from '@/components/product';

export const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('기본');
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "",
      name: "상품명1",
      price: 10000,
      description: "상품 설명1",
      recommended: false,
      soldOut: false,
      category: "기본"
    },
    {
      id: 2,
      image: "",
      name: "상품명2",
      price: 20000,
      description: "상품 설명2",
      recommended: false,
      soldOut: false,
      category: "기본"
    },
    {
      id: 3,
      image: "",
      name: "불고기 버거",
      price: 8500,
      description: "맛있는 불고기 버거",
      recommended: true,
      soldOut: false,
      category: "메뉴"
    },
    {
      id: 4,
      image: "",
      name: "치킨 버거",
      price: 9000,
      description: "바삭한 치킨 버거",
      recommended: false,
      soldOut: true,
      category: "메뉴"
    },
    {
      id: 5,
      image: "",
      name: "감자튀김",
      price: 3500,
      description: "바삭한 감자튀김",
      recommended: true,
      soldOut: false,
      category: "메뉴"
    }
  ]);

  const moveProduct = (dragIndex: number, hoverIndex: number) => {
    const draggedProduct = products[dragIndex];
    const newProducts = [...products];
    newProducts.splice(dragIndex, 1);
    newProducts.splice(hoverIndex, 0, draggedProduct);
    setProducts(newProducts);
  };

  const filteredProducts = products.filter(product => product.category === selectedCategory);
  const filteredIndices = products
    .map((product, index) => ({ product, index }))
    .filter(({ product }) => product.category === selectedCategory)
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
            <CategorySelect selected={selectedCategory} onSelect={setSelectedCategory} />
            <div className="flex gap-9 px-1">
              <div>사장님추천</div>
              <div>품절표시</div>
            </div>
          </div>
        </div>
        <div>
        {filteredProducts.map((product, filteredIndex) => (
          <ProductItem
            key={product.id}
            index={filteredIndices[filteredIndex]}
            {...product}
            moveProduct={moveProduct}
          />
        ))}
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
