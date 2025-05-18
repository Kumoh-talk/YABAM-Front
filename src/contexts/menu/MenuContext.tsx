import { useMenu } from '@/hooks/useMenu';
import { createContext, useContext } from 'react';
import { MenuCreateDto, MenuInfo, MenuPageContent } from '@/types/backend/menu';

export type Values = {
  menus: MenuPageContent[];
  isRefreshing: boolean;
};

export type Actions = {
  createMenu: (data: MenuCreateDto) => Promise<void>;
  updateMenuDetail: (
    menuId: number,
    data: Omit<MenuInfo, 'menuId' | 'menuOrder'>,
  ) => Promise<void>;
  updateMenuOrder: (menuId: number, menuOrder: number) => Promise<void>;
  updateMenuSoldOut: (menuId: number, menuIsSoldOut: boolean) => Promise<void>;
  removeMenu: (menuId: number) => Promise<void>;
  refreshMenus: () => Promise<void>;
};

const MenuValuesContext = createContext<Values | undefined>(undefined);
const MenuActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const MenuProvider = (props: Props) => {
  const {
    menus,
    create,
    updateDetail,
    updateOrder,
    updateSoldOut,
    remove,
    refresh,
    isRefreshing,
  } = useMenu();

  return (
    <MenuValuesContext.Provider value={{ menus, isRefreshing }}>
      <MenuActionsContext.Provider
        value={{
          createMenu: create,
          updateMenuDetail: updateDetail,
          updateMenuOrder: updateOrder,
          updateMenuSoldOut: updateSoldOut,
          removeMenu: remove,
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
