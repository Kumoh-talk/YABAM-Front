import { useState, memo } from 'react';
import { ImageInput, Toggle } from '../../common';
import { Close } from '@mui/icons-material';
import { useMenuValues, useMenuActions } from '@/contexts/menu/MenuContext';
import { MenuInfo } from '@/types/backend/menu';
import { useStoreValues } from '@/contexts/store/StoreContext';

export interface Props {
  item: MenuInfo;
}

export const ProductItem = memo(({ item }: Props) => {
  const { store } = useStoreValues();
  const { menus } = useMenuValues();
  const { updateMenuDetail, updateMenuSoldOut, removeMenu, refreshMenus } =
    useMenuActions();
  const [editingField, setEditingField] = useState<
    'name' | 'price' | 'description' | null
  >(null);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = (field: 'name' | 'price' | 'description') => {
    setEditingField(field);
    switch (field) {
      case 'name':
        setEditValue(item.menuName);
        break;
      case 'price':
        setEditValue(item.menuPrice.toString());
        break;
      case 'description':
        setEditValue(item.menuDescription);
        break;
    }
  };

  const handleBlur = async () => {
    if (editingField) {
      const menu = menus.find(
        ({ menuInfo }) => menuInfo.menuId === item.menuId,
      )?.menuInfo;
      if (!menu) return;

      const value = editingField === 'price' ? Number(editValue) : editValue;
      await updateMenuDetail(menu.menuId, {
        menuName: editingField === 'name' ? (value as string) : menu.menuName,
        menuPrice:
          editingField === 'price' ? (value as number) : menu.menuPrice,
        menuDescription:
          editingField === 'description'
            ? (value as string)
            : menu.menuDescription,
        menuImageUrl: menu.menuImageUrl, // 이미지 URL 유지
        menuIsRecommended: menu.menuIsRecommended,
        menuIsSoldOut: menu.menuIsSoldOut,
      });
    }
    setEditingField(null);
  };

  const handleImageChange = (e: { target: { value: string } }) => {
    updateMenuDetail(item.menuId, {
      menuName: item.menuName,
      menuPrice: item.menuPrice,
      menuDescription: item.menuDescription,
      menuImageUrl: e.target.value,
      menuIsRecommended: item.menuIsRecommended,
      menuIsSoldOut: item.menuIsSoldOut,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleSoldOut = async () => {
    await updateMenuSoldOut(item.menuId, !item.menuIsSoldOut);
    await refreshMenus();
  };

  const handleRemove = async () => {
    await removeMenu(item.menuId);
  };

  const handleRecommended = async () => {
    const menu = menus.find(
      ({ menuInfo }) => menuInfo.menuId === item.menuId,
    )?.menuInfo;
    if (!menu) return;
    await updateMenuDetail(item.menuId, {
      menuName: menu.menuName,
      menuPrice: menu.menuPrice,
      menuDescription: menu.menuDescription,
      menuImageUrl: menu.menuImageUrl,
      menuIsRecommended: !menu.menuIsRecommended,
      menuIsSoldOut: menu.menuIsSoldOut,
    });
    await refreshMenus();
  };

  return (
    <li className="w-full flex justify-between items-center p-2 bg-white rounded-lg even:bg-gray-100">
      <div className="gap-4 flex items-center justify-center">
        <div className="w-20 h-20 flex flex-col justify-center items-center rounded-lg border-1 border-gray-500 overflow-hidden">
          <ImageInput
            className="w-full h-full object-cover"
            imageProperty="MENU_IMAGE"
            storeId={store.id}
            value={item.menuImageUrl}
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          {editingField === 'name' ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="text-xl text-[#3B3B3C] leading-none border border-gray-300 rounded px-1"
              autoFocus
            />
          ) : (
            <div
              className="text-base text-[#3B3B3C] leading-none font-medium"
              onDoubleClick={() => handleDoubleClick('name')}
            >
              {item.menuName}
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
            <div
              className="text-primary text-sm leading-none font-medium"
              onDoubleClick={() => handleDoubleClick('price')}
            >
              {item.menuPrice.toLocaleString()}원
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
          <div
            className="leading-6 text-[#6C6C6C] font-medium"
            onDoubleClick={() => handleDoubleClick('description')}
          >
            {item.menuDescription}
          </div>
        )}
      </div>
      <div className="flex gap-10 items-center">
        <Toggle
          color="primary"
          isSelected={item.menuIsRecommended}
          onClick={handleRecommended}
        />
        <Toggle
          color="secondary"
          isSelected={item.menuIsSoldOut}
          onClick={handleSoldOut}
        />
        <Close
          className="text-gray-700 hover:text-gray-600 cursor-pointer"
          onClick={handleRemove}
        />
      </div>
    </li>
  );
});

ProductItem.displayName = 'ProductItem';
