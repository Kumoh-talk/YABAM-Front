import { useState, useEffect } from 'react';
import { Close } from '@mui/icons-material';
import { Button } from '@/components/common';
import { useCategoryActions } from '@/contexts/category/CategoryContext';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { Category } from '@/hooks/useCategory';
import { getMenusByCategory } from '@/utils/api/backend/menu';

export interface Props {
  category: Category;
  isSelected: boolean;
  onToggle?: (categoryId: number) => void;
  onRemove?: (categoryId: number) => void;
}

export const CategoryItem = ({ category, onRemove }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);
  const [menuCount, setMenuCount] = useState(0);
  const { updateCategoryName } = useCategoryActions();
  const { store } = useStoreValues();

  useEffect(() => {
    const fetchMenuCount = async () => {
      try {
        const menus = await getMenusByCategory(store.id, category.id);
        setMenuCount(menus.length);
      } catch (error) {
        console.error('메뉴 개수 조회 실패:', error);
        setMenuCount(0);
      }
    };

    fetchMenuCount();
  }, [store.id, category.id]);

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
    <li className="w-full flex justify-between px-2 py-4 rounded-lg even:bg-gray-100">
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
            <div
              className="text-text-primary cursor-pointer font-medium"
              onDoubleClick={handleDoubleClick}
            >
              {category.name}
            </div>
          )}
          <div className="text-sm text-text-secondary font-medium">
            메뉴 {menuCount}개
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <Button
          color="black-transparent"
          isNoPadding
          onClick={() => onRemove?.(category.id)}
        >
          <Close className="text-gray-700" />
        </Button>
      </div>
    </li>
  );
};
