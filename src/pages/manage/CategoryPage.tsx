import { useState } from 'react';
import { CategoryList } from '@/components/category';
import { Button } from '@/components/common';

export const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [isSelected, setIsSelected] = useState(true);
  return (
    <div className="flex flex-col h-screen w-full gap-4 p-8 ">
            <div className="w-full flex items-center justify-between">
              <div className="leading-6 font-semibold text-2xl text-center">
                카테고리
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="카테고리 이름"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Button>추가</Button>
              </div>
            </div>
            <div className="w-full flex justify-end p-2 gap-11">
              <div className="text-sm leading-6">표시</div>
              <div className="text-sm leading-6">삭제</div>
            </div>
          <CategoryList />
        </div>
  );
};
export default CategoryPage;
