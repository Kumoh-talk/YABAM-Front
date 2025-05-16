import { CategoryResponse } from '@/types/backend/category';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategoryName,
  updateCategoryOrder,
} from '@/utils/api/backend/category';
import { useEffect, useRef, useState } from 'react';

export type Category = {
  id: number;
  name: string;
  order: number;
};

export const useCategory = (storeId: number) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>({
    id: -1,
    name: '',
    order: 0,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      const response = await getCategories(storeId);
      const formattedCategories = response.map((category) => ({
        id: category.menuCategoryId,
        name: category.menuCategoryName,
        order: category.menuCategoryOrder,
      }));
      setCategories(formattedCategories);
      if (formattedCategories.length > 0) {
        setCategory(formattedCategories[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // 카테고리 변경 이벤트 리스너
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'categoryUpdate') {
        refresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refresh]);

  // 카테고리 변경 시 다른 탭에 알림
  const notifyCategoryUpdate = () => {
    localStorage.setItem('categoryUpdate', Date.now().toString());
    localStorage.removeItem('categoryUpdate');
  };

  useEffect(() => {
    refresh();
  }, [storeId]);

  useEffect(() => {
    if (categories.length > 0 && category.id === -1) {
      setCategory(categories[0]);
    }
  }, [categories, category.id]);

  const create = async (name: string, order: number) => {
    try {
      await createCategory(storeId, {
        menuCategoryName: name,
        menuCategoryOrder: order,
      });
      await refresh();
      notifyCategoryUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const updateName = async (categoryId: number, name: string) => {
    try {
      await updateCategoryName(storeId, categoryId, {
        menuCategoryName: name,
      });
      await refresh();
      notifyCategoryUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const updateOrder = async (categoryId: number, order: number) => {
    try {
      await updateCategoryOrder(storeId, categoryId, {
        menuCategoryOrder: order,
      });
      await refresh();
      notifyCategoryUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (categoryId: number) => {
    try {
      await deleteCategory(storeId, categoryId);
      await refresh();
      notifyCategoryUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const update = (value: Partial<Omit<Category, 'id'>>) => {
    setCategory((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return {
    categories,
    category,
    create,
    updateName,
    updateOrder,
    remove,
    refresh,
    update,
    isRefreshing,
  };
};
