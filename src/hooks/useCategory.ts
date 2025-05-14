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
  const prevCategoriesRef = useRef<Category[] | null>(null);
  const prevCategoryRef = useRef<Category | null>(null);

  const refresh = async () => {
    try {
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
    }
  };

  useEffect(() => {
    refresh();
  }, [storeId]);

  const create = async (name: string, order: number) => {
    try {
      await createCategory(storeId, {
        menuCategoryName: name,
        menuCategoryOrder: order,
      });
      await refresh();
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
    } catch (e) {
      console.error(e);
    }
  };

  const remove = async (categoryId: number) => {
    try {
      await deleteCategory(storeId, categoryId);
      await refresh();
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
  };
};
