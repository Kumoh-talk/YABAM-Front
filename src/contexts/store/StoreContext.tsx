import { useOrder, useStore, useTable } from '@/hooks';
import { Order, Store, Table } from '@/types';
import { StoreCreateDto } from '@/types/backend/store';
import { createStore } from '@/utils/api/backend/store';
import { createContext, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export type Values = {
  store: Store;
  orders: Order[];
  tables: Table[];
};

export type Actions = {
  updateStore: (value: Partial<Omit<Store, 'id'>>) => void;
  requestCreateStore: (value: Omit<Store, 'id'>) => Promise<boolean>;
  calcTableCost: (time: number) => number;
  createTable: (table: Table) => void;
  updateTable: (table: Table) => void;
  removeTable: (id: number) => void;
  moveTable: (id: number, x: number, y: number) => void;
};

const StoreValuesContext = createContext<Values | undefined>(undefined);
const StoreActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const StoreProvider = (props: Props) => {
  const [cookies] = useCookies(['access_token', 'refresh_token', 'id_token']);
  const { store, update, refresh: refreshStore } = useStore();
  const { orders } = useOrder();
  const { tables, createTable, updateTable, removeTable, moveTable } =
    useTable();

  const calcTableCost = (time: number) => {
    return Math.ceil(time / store.tableTime / 60) * store.tableCost;
  };

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
    if (cookies.access_token) {
      refreshStore();
    }
  }, [cookies.access_token]);

  return (
    <StoreValuesContext.Provider value={{ orders, tables, store }}>
      <StoreActionsContext.Provider
        value={{
          updateStore: update,
          requestCreateStore,
          calcTableCost,
          createTable,
          updateTable,
          removeTable,
          moveTable,
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
