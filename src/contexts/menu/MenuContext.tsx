import { useMenu } from '@/hooks/useMenu';
import { Menu } from '@/hooks/useMenu';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { createContext, useContext } from 'react';
import { MenuCreateDto } from '@/types/backend/menu';

export type Values = {
  menus: Menu[];
  menu: Menu;
  isRefreshing: boolean;
};

export type Actions = {
  createMenu: (data: MenuCreateDto) => Promise<void>;
  updateMenuDetail: (
    menuId: number,
    data: Omit<Menu, 'menuId' | 'menuOrder' | 'menuCategoryId' | 'menuCategoryName' | 'menuCategoryOrder'>
  ) => Promise<void>;
  updateMenuOrder: (menuId: number, menuOrder: number) => Promise<void>;
  updateMenuSoldOut: (menuId: number, menuIsSoldOut: boolean) => Promise<void>;
  removeMenu: (menuId: number) => Promise<void>;
  updateMenu: (value: Partial<Omit<Menu, 'menuId'>>) => void;
  refreshMenus: () => Promise<void>;
};

const MenuValuesContext = createContext<Values | undefined>(undefined);
const MenuActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const MenuProvider = (props: Props) => {
  const { menus, menu, create, updateDetail, updateOrder, updateSoldOut, remove, refresh, update, isRefreshing } =
    useMenu();

  return (
    <MenuValuesContext.Provider value={{ menus, menu, isRefreshing }}>
      <MenuActionsContext.Provider
        value={{
          createMenu: create,
          updateMenuDetail: updateDetail,
          updateMenuOrder: updateOrder,
          updateMenuSoldOut: updateSoldOut,
          removeMenu: remove,
          updateMenu: update,
          refreshMenus: refresh,
        }}
      >
        {props.children}
      </MenuActionsContext.Provider>
    </MenuValuesContext.Provider>
  );
};

export const useMenuValues = () => {
  const context = useContext(MenuValuesContext);
  if (context === undefined) {
    throw new Error('useMenuValues must be used within a MenuProvider');
  }
  return context;
};

export const useMenuActions = () => {
  const context = useContext(MenuActionsContext);
  if (context === undefined) {
    throw new Error('useMenuActions must be used within a MenuProvider');
  }
  return context;
};
