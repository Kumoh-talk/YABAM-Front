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
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);
  const { updateCategoryName } = useCategoryActions();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = async () => {
    if (newName.trim() && newName !== category.name) {
      await updateCategoryName(category.id, newName);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setNewName(category.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full flex justify-between px-2 py-4">
      <div className="gap-4 flex items-center ">
        <div className="gap-1">
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyPress}
              className="text-text-primary border border-gray-300 rounded px-1"
              autoFocus
            />
          ) : (
            <div className="text-text-primary cursor-pointer" onDoubleClick={handleDoubleClick}>
              {category.name}
            </div>
          )}
          <div className="text-sm text-text-secondary">메뉴 3개</div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div>
          <Toggle color="primary" isSelected={isSelected} onClick={() => onToggle(category.id)} />
        </div>
        <Button color="black-transparent" isNoPadding onClick={() => onRemove(category.id)}>
          <Close className="text-gray-700" />
        </Button>
      </div>
    </div>
  );
};
