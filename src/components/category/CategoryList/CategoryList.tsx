import { useState } from 'react';
import { Close } from '@mui/icons-material';
import { Button, Toggle } from '@/components/common';
import { DragIndicator } from '@mui/icons-material';
import { useCategoryActions } from '@/contexts/category/CategoryContext';
import { Category } from '@/hooks/useCategory';

interface CategoryListProps {
  category: Category;
  isSelected: boolean;
  onToggle: (categoryId: number) => void;
  onRemove: (categoryId: number) => void;
}

export const CategoryList = ({ category, isSelected, onToggle, onRemove }: CategoryListProps) => {
  return (
    <div className="w-full flex justify-between px-2 py-4">
      <div className='gap-4 flex items-center '>
        <DragIndicator/>
        <div className='gap-1'>
          <div className='text-text-primary'>{category.name}</div>
          <div className='text-sm text-text-secondary'>메뉴 3개</div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div>
          <Toggle
            color="primary"
            isSelected={isSelected}
            onClick={() => onToggle(category.id)}
          />
        </div>
        <Button 
          color="black-transparent" 
          isNoPadding
          onClick={() => onRemove(category.id)}
        >
          <Close className='text-gray-700'/>
        </Button>
      </div>
    </div>
  );
};
