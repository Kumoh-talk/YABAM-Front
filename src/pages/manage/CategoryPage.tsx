import { useState } from 'react';
import { CategoryList } from '@/components/category';
import { Button } from '@/components/common';
import { useCategoryActions, useCategoryValues } from '@/contexts/category/CategoryContext';
import { useStoreValues } from '@/contexts/store/StoreContext';

export const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedStates, setSelectedStates] = useState<{
    [key: number]: boolean;
  }>({});
  const { createCategory, removeCategory, refreshCategories } = useCategoryActions();
  const { categories } = useCategoryValues();

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      alert('카테고리 이름을 입력해주세요.');
      return;
    }

    try {
      await createCategory(categoryName, categories.length);
      setCategoryName('');
      await refreshCategories();
    } catch (error) {
      console.error('카테고리 생성 실패:', error);
      alert('카테고리 생성에 실패했습니다.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateCategory();
    }
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedStates((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="flex flex-col h-screen w-full gap-4 p-8 ">
      <div className="w-full flex items-center justify-between">
        <div className="leading-6 font-semibold text-2xl text-center">카테고리</div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="카테고리 이름"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={handleKeyPress}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleCreateCategory}>추가</Button>
        </div>
      </div>
      <div className="w-full flex justify-end p-2 gap-11">
        <div className="text-sm leading-6">삭제</div>
      </div>
      <div className="flex flex-col">
        {categories.map((category, index) => (
          <div key={category.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            <CategoryList
              category={category}
              isSelected={selectedStates[category.id] ?? true}
              onToggle={toggleCategory}
              onRemove={removeCategory}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
