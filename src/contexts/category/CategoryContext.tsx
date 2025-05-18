import { useCategory } from '@/hooks';
import { Category } from '@/hooks/useCategory';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { createContext, useContext } from 'react';

export type Values = {
  categories: Category[];
  category: Category;
  isRefreshing: boolean;
};

export type Actions = {
  createCategory: (name: string, order: number) => Promise<void>;
  updateCategoryName: (categoryId: number, name: string) => Promise<void>;
  updateCategoryOrder: (categoryId: number, order: number) => Promise<void>;
  removeCategory: (categoryId: number) => Promise<void>;
  updateCategory: (value: Partial<Omit<Category, 'id'>>) => void;
  refreshCategories: () => Promise<void>;
};

const CategoryValuesContext = createContext<Values | undefined>(undefined);
const CategoryActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const CategoryProvider = (props: Props) => {
  const { categories, category, create, updateName, updateOrder, remove, refresh, update, isRefreshing } =
    useCategory();

  return (
    <CategoryValuesContext.Provider value={{ categories, category, isRefreshing }}>
      <CategoryActionsContext.Provider
        value={{
          createCategory: create,
          updateCategoryName: updateName,
          updateCategoryOrder: updateOrder,
          removeCategory: remove,
          updateCategory: update,
          refreshCategories: refresh,
        }}
      >
        {props.children}
      </CategoryActionsContext.Provider>
    </CategoryValuesContext.Provider>
  );
};

export const useCategoryValues = () => {
  const context = useContext(CategoryValuesContext);
  if (context === undefined) {
    throw new Error('useCategoryValues must be used within a CategoryProvider');
  }
  return context;
};

export const useCategoryActions = () => {
  const context = useContext(CategoryActionsContext);
  if (context === undefined) {
    throw new Error('useCategoryActions must be used within a CategoryProvider');
  }
  return context;
};
