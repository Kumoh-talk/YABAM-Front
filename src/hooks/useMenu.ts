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

export const useMenu = (storeId: number) => {
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

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      const response = await getMenus(storeId, 200);
      const formattedMenus = response.map((item) => ({
        ...item
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

  // 메뉴 변경 이벤트 리스너
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'menuUpdate') {
        refresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refresh]);

  // 메뉴 변경 시 다른 탭에 알림
  const notifyMenuUpdate = () => {
    localStorage.setItem('menuUpdate', Date.now().toString());
    localStorage.removeItem('menuUpdate');
  };

  useEffect(() => {
    refresh();
  }, [storeId]);

  useEffect(() => {
    if (menus.length > 0 && menu.menuId === -1) {
      setMenu(menus[0]);
    }
  }, [menus, menu.menuId]);

  const create = async (data: Omit<Menu, 'menuId' | 'menuCategoryName' | 'menuCategoryOrder'>) => {
    try {
      await createMenu(storeId, {
        menuName: data.menuName,
        menuPrice: data.menuPrice,
        menuDescription: data.menuDescription,
        menuImageUrl: data.menuImageUrl,
        menuIsRecommended: data.menuIsRecommended,
        menuCategoryId: data.menuCategoryId,
        menuIsSoldOut: false,
      });
      await refresh();
      notifyMenuUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const updateDetail = async (menuId: number, data: Omit<Menu, 'menuId' | 'menuOrder' | 'menuCategoryId' | 'menuCategoryName' | 'menuCategoryOrder'>) => {
    try {
      await updateMenuDetail(storeId, menuId, data);
      await refresh();
      notifyMenuUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const updateOrder = async (menuId: number, menuOrder: number) => {
    try {
      await updateMenuOrder(storeId, menuId, {
        menuOrder,
      });
      await refresh();
      notifyMenuUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const updateSoldOut = async (menuId: number, menuIsSoldOut: boolean) => {
    try {
      await updateMenuSoldOut(storeId, menuId, menuIsSoldOut);
      await refresh();
      notifyMenuUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (menuId: number) => {
    try {
      await deleteMenu(storeId, menuId);
      await refresh();
      notifyMenuUpdate();
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
