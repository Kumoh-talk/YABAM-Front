import { createContext, useContext, useEffect } from 'react';
import { useKakao, useStore } from '@/hooks';
import { Store } from '@/types';
import { useSale } from '@/hooks/useSale';
import { SaleDto } from '@/types/backend/sale';
import { StoreCreateDto } from '@/types/backend/store';
import { createStore } from '@/utils/api/backend/store';

export type Values = {
  store: Store;
  sales: SaleDto[];
  sale: SaleDto | null;
};

export type Actions = {
  logout: () => Promise<boolean>;
  updateStore: (value: Partial<Omit<Store, 'id'>>) => void;
  requestCreateStore: (value: Omit<Store, 'id'>) => Promise<boolean>;
  openSale: () => Promise<void>;
  closeSale: () => Promise<void>;
};

const StoreValuesContext = createContext<Values | undefined>(undefined);
const StoreActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const StoreProvider = (props: Props) => {
  const { accessToken, logout } = useKakao();
  const { store, update, refresh: refreshStore } = useStore();
  const { sales, sale, openSale, closeSale } = useSale(store);

  const requestCreateStore = async (value: Omit<Store, 'id'>) => {
    try {
      const dto: StoreCreateDto = {
        storeName: value.name,
        description: value.description,
        latitude: value.location.latitude,
        longitude: value.location.longitude,
        headImageUrl: value.logo,
        university: value.university,
        tableTime: value.tableTime,
        tableCost: value.tableCost,
      };
      await createStore(dto);
      await refreshStore();
      return true;
    } catch (error) {
      console.error('점포 생성 실패', error);
      return false;
    }
  };

  useEffect(() => {
    if (accessToken) {
      refreshStore();
    }
  }, [accessToken]);

  return (
    <StoreValuesContext.Provider value={{ store, sales, sale }}>
      <StoreActionsContext.Provider
        value={{
          updateStore: update,
          requestCreateStore,
          openSale,
          closeSale,
          logout,
        }}
      >
        {props.children}
      </StoreActionsContext.Provider>
    </StoreValuesContext.Provider>
  );
};

export const useStoreValues = () => {
  const context = useContext(StoreValuesContext);
  if (context === undefined) {
    throw new Error('useStoreValues must be used within a StoreProvider');
  }
  return context;
};

export const useStoreActions = () => {
  const context = useContext(StoreActionsContext);
  if (context === undefined) {
    throw new Error('useStoreActions must be used within a StoreProvider');
  }
  return context;
};
