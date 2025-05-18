import { CategorySelect, CustomProduct } from '@/components/product';
import { CloseRounded } from '@mui/icons-material';
import { useState, useMemo, useEffect } from 'react';
import { useMenuValues } from '@/contexts/menu/MenuContext';
import { useCategoryValues } from '@/contexts/category/CategoryContext';

export interface Props {
  onClose?: () => void;
  onClickMenu?: (menuId: number) => void;
  selectedCategory: number[];
}

export const MenuSelectPanel = (props: Props) => {
  const { menus } = useMenuValues();
  const { categories } = useCategoryValues();
  const [category, setCategory] = useState(0);
  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  const filteredMenus = useMemo(
    () =>
      menus.filter(
        (menu) =>
          menu.menuCategoryInfo.menuCategoryId === category &&
          !menu.menuInfo.menuIsSoldOut,
      ),
    [menus, category],
  );

  return (
    <div className="p-4 h-full bg-gray-400">
      <div className="p-4 gap-3 flex flex-col h-full drop-shadow-md bg-white rounded-2xl ">
        <div className="flex flex-row justify-between items-center">
          <div className="flex-1 text-center font-medium">메뉴담기</div>
          <CloseRounded onClick={props.onClose} className="cursor-pointer" />
        </div>
        <div className="flex flex-col gap-4">
          <CategorySelect selected={category} onSelect={setCategory} />
          <div className="flex flex-row flex-wrap gap-4">
            {filteredMenus.map((menu) => (
              <CustomProduct
                key={menu.menuInfo.menuId}
                item={menu.menuInfo}
                onClick={props.onClickMenu}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
