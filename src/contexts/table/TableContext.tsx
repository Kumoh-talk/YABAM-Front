import { useTable } from '@/hooks';
import { Table } from '@/types';
import { createContext, useContext } from 'react';
import { useStoreValues } from '../store/StoreContext';

export type Values = {
  tables: Table[];
};

export type Actions = {
  calcTableCost: (time: number) => number;
  createTable: (table: Omit<Table, 'id'>) => void;
  updateTable: (table: Table) => void;
  removeTable: (id: number) => void;
  moveTable: (id: number, x: number, y: number) => void;
  getAvailableNum: () => number;
};

const TableValuesContext = createContext<Values | undefined>(undefined);
const TableActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const TableProvider = (props: Props) => {
  const {store} = useStoreValues();
  const {
    tables,
    createTable,
    updateTable,
    removeTable,
    moveTable,
    getAvailableNum,
  } = useTable();

  const calcTableCost = (time: number) => {
    return Math.ceil(time / store.tableTime / 60) * store.tableCost;
  };

  return (
    <TableValuesContext.Provider value={{ tables }}>
      <TableActionsContext.Provider
        value={{
          calcTableCost,
          createTable,
          updateTable,
          removeTable,
          moveTable,
          getAvailableNum,
        }}
      >
        {props.children}
      </TableActionsContext.Provider>
    </TableValuesContext.Provider>
  );
};

export const useTableValues = () => {
  const context = useContext(TableValuesContext);
  if (context === undefined) {
    throw new Error('useTableValues must be used within a TableProvider');
  }
  return context;
};

export const useTableActions = () => {
  const context = useContext(TableActionsContext);
  if (context === undefined) {
    throw new Error('useTableActions must be used within a TableProvider');
  }
  return context;
};
