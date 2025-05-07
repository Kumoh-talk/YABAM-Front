import { useOrder, useStore, useTable } from '@/hooks';
import { Order, Store, Table } from '@/types';
import { createContext, useContext, useState } from 'react';

export type Values = {
  store: Store;
  orders: Order[];
  tables: Table[];
};

export type Actions = {
  updateStore: (value: Partial<Omit<Store, 'id'>>) => void;
  calcTableCost: (time: number) => number;
};

const StoreValuesContext = createContext<Values | undefined>(undefined);
const StoreActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const StoreProvider = (props: Props) => {
  const { store, updateStore } = useStore();
  const { orders } = useOrder();
  const { tables } = useTable();

  const calcTableCost = (time: number) => {
    return Math.ceil(time / store.tableTime / 60) * store.tableCost;
  };

  return (
    <StoreValuesContext.Provider value={{ orders, tables, store }}>
      <StoreActionsContext.Provider value={{ updateStore, calcTableCost }}>
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
