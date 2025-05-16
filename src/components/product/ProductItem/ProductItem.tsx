import { useState } from 'react';
import { BlackPlusIcon } from '@/assets/icon/BlackPlusCcon';
import { Toggle } from '../../common';
import { DragIndicator } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import { MenuInfo } from '@/types/backend/menu';

export interface ProductItemProps {
  id: number;
  image?: string;
  name: string;
  price: number;
  description: string;
  recommended: boolean;
  isSoldOut: boolean;
  moveProduct: (dragIndex: number, hoverIndex: number) => Promise<void>;
  onUpdate: (menuId: number, field: 'name' | 'price' | 'description', value: string | number) => Promise<void>;
  onSoldOut: (menuId: number, isSoldOut: boolean) => Promise<void>;
  onRemove: (menuId: number) => Promise<void>;
}

export const ProductItem = ({
  id,
  image,
  name,
  price,
  description,
  recommended,
  isSoldOut,
  moveProduct,
  onUpdate,
  onSoldOut,
  onRemove,
}: ProductItemProps) => {
  const [editingField, setEditingField] = useState<'name' | 'price' | 'description' | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = (field: 'name' | 'price' | 'description') => {
    setEditingField(field);
    switch (field) {
      case 'name':
        setEditValue(name);
        break;
      case 'price':
        setEditValue(price.toString());
        break;
      case 'description':
        setEditValue(description);
        break;
    }
  };

  const handleBlur = async () => {
    if (editingField) {
      const value = editingField === 'price' ? Number(editValue) : editValue;
      onUpdate(id, editingField, value);
    }
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div
      className="w-full flex justify-between items-center p-2 bg-white rounded-lg z-0 transition-all duration-200 ease-in-out"
    >
      <div className="gap-4 flex items-center justify-center">
        <div className="cursor-move">
          <DragIndicator className="text-gray-400 hover:text-gray-600" />
        </div>
        <div className="w-20 h-20 p-3 flex flex-col justify-center items-center rounded-lg border-1 border-gray-500">
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <div className="flex flex-col gap-1 items-center justify-center">
              <BlackPlusIcon />
              <div className="leading-6 ">이미지</div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 justify-baseline">
          {editingField === 'name' ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="text-xl text-[#3B3B3C] leading-5 border border-gray-300 rounded px-1"
              autoFocus
            />
          ) : (
            <div className="text-xl text-[#3B3B3C] leading-5" onDoubleClick={() => handleDoubleClick('name')}>
              {name}
            </div>
          )}
          {editingField === 'price' ? (
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="leading-6 text-[#0092CA] border border-gray-300 rounded px-1"
              autoFocus
            />
          ) : (
            <div className="leading-6 text-[#0092CA]" onDoubleClick={() => handleDoubleClick('price')}>
              {price.toLocaleString()}원
            </div>
          )}
        </div>
        {editingField === 'description' ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="leading-6 text-[#6C6C6C] border border-gray-300 rounded px-1"
            autoFocus
          />
        ) : (
          <div className="leading-6 text-[#6C6C6C]" onDoubleClick={() => handleDoubleClick('description')}>
            {description}
          </div>
        )}
      </div>
      <div className="flex gap-10">
        <Toggle color="primary" isSelected={recommended} onClick={() => {}} />
        <Toggle color="secondary" isSelected={isSoldOut} onClick={() => onSoldOut(id, !isSoldOut)} />
        <Close className="text-gray-700 hover:text-gray-600 cursor-pointer" onClick={() => onRemove(id)} />
      </div>
    </div>
  );
};
