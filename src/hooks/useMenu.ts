// import { MenuResponse } from '@/types/backend/menu';
import {
  createMenu,
  deleteMenu,
  getMenus,
  updateMenuDetail,
  updateMenuOrder,
  updateMenuSoldOut,
} from '@/utils/api/backend/menu';
import { useEffect, useState } from 'react';
import { MenuUpdateDetailDto } from '@/types/backend/menu';
import { useStoreValues } from '@/contexts/store/StoreContext';

export type Menu = {
  // menuInfo
  menuId: number;
  menuOrder: number;
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImageUrl: string;
  menuIsSoldOut: boolean;
  menuIsRecommended: boolean;
  // menuCategoryInfo
  menuCategoryId: number;
  menuCategoryName: string;
  menuCategoryOrder: number;
};

export const useMenu = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menu, setMenu] = useState<Menu>({
    menuId: -1,
    menuOrder: 0,
    menuName: '',
    menuPrice: 0,
    menuDescription: '',
    menuImageUrl: '',
    menuIsSoldOut: false,
    menuIsRecommended: false,
    menuCategoryId: -1,
    menuCategoryName: '',
    menuCategoryOrder: 0,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { store } = useStoreValues();

  const refresh = async () => {
    if (!store?.id || store.id <= 0) return;

    try {
      setIsRefreshing(true);
      const response = await getMenus(store.id);
      const formattedMenus = response.map((menu) => ({
        menuId: menu.menuId,
        menuOrder: menu.menuOrder,
        menuName: menu.menuName,
        menuPrice: menu.menuPrice,
        menuDescription: menu.menuDescription,
        menuImageUrl: menu.menuImageUrl,
        menuIsSoldOut: menu.menuIsSoldOut,
        menuIsRecommended: menu.menuIsRecommended,
        menuCategoryId: menu.menuCategoryId,
        menuCategoryName: menu.menuCategoryName,
        menuCategoryOrder: menu.menuCategoryOrder,
      }));
      setMenus(formattedMenus);
      if (formattedMenus.length > 0) {
        setMenu(formattedMenus[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [store?.id]);

  useEffect(() => {
    if (menus.length > 0 && menu.menuId === -1) {
      setMenu(menus[0]);
    }
  }, [menus, menu.menuId]);

  const create = async (menuData: any) => {
    if (!store?.id || store.id <= 0) return;

    try {
      await createMenu(store.id, menuData);
      await refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const updateSoldOut = async (menuId: number, isSoldOut: boolean) => {
    if (!store?.id || store.id <= 0) return;

    try {
      await updateMenuSoldOut(store.id, menuId, isSoldOut);
      await refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const updateOrder = async (menuId: number, order: number) => {
    if (!store?.id || store.id <= 0) return;

    try {
      await updateMenuOrder(store.id, menuId, { menuOrder: order });
      await refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const updateDetail = async (menuId: number, detail: any) => {
    if (!store?.id || store.id <= 0) return;

    try {
      await updateMenuDetail(store.id, menuId, detail);
      await refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (menuId: number) => {
    if (!store?.id || store.id <= 0) return;

    try {
      await deleteMenu(store.id, menuId);
      await refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const update = (value: Partial<Omit<Menu, 'menuId'>>) => {
    setMenu((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return {
    menus,
    menu,
    create,
    updateDetail,
    updateOrder,
    updateSoldOut,
    remove,
    refresh,
    update,
    isRefreshing,
  };
};
