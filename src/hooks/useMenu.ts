import {
  createMenu,
  deleteMenu,
  getMenus,
  updateMenuDetail,
  updateMenuOrder,
  updateMenuSoldOut,
} from '@/utils/api/backend/menu';
import { useEffect, useState } from 'react';
import { MenuCreateDto, MenuPageContent } from '@/types/backend/menu';
import { useStoreValues } from '@/contexts/store/StoreContext';

export const useMenu = () => {
  const [menus, setMenus] = useState<MenuPageContent[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { store } = useStoreValues();

  const refresh = async () => {
    if (!store?.id || store.id <= 0) return;

    try {
      setIsRefreshing(true);
      const res = await getMenus(store.id);
      setMenus(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [store?.id]);

  const create = async (menuData: MenuCreateDto) => {
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
      setMenus(prev =>
        prev.map(menu =>
          menu.menuInfo.menuId === menuId ? { ...menu, menuIsSoldOut: isSoldOut } : menu
        )
      );
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
      setMenus(prev =>
        prev.map(menu =>
          menu.menuInfo.menuId === menuId ? { ...menu, ...detail } : menu
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (menuId: number) => {
    if (!store?.id || store.id <= 0) return;

    try {
      await deleteMenu(store.id, menuId);
      setMenus(prev => prev.filter(menu => menu.menuInfo.menuId !== menuId));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    menus,
    create,
    updateDetail,
    updateOrder,
    updateSoldOut,
    remove,
    refresh,
    isRefreshing,
  };
};
