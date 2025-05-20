import { useTable } from '@/hooks';
import { Table } from '@/types';
import { createContext, useContext } from 'react';

export type Values = {
  tables: Table[];
};

export type Actions = {
  calcTableCost: (time: number, tableCapacity: number) => number;
  refreshTable: () => Promise<void>;
  createTable: (table: Omit<Table, 'id'> & { capacity: number }) => void;
  updateTable: (table: Table) => void;
  removeTable: (id: string) => void;
  moveTable: (id: string, x: number, y: number) => void;
  setTableActive: (id: string, isActive: boolean) => void;
  getAvailableNum: () => number;
};

const TableValuesContext = createContext<Values | undefined>(undefined);
const TableActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const TableProvider = (props: Props) => {
  const {
    tables,
    refreshTable,
    createTable,
    updateTable,
    removeTable,
    moveTable,
    setTableActive,
    getAvailableNum,
  } = useTable();

  const calcTableCost = (time: number, tableCapacity: number) => {
    const hourlyRate = tableCapacity === 4 ? 4000 : 6000;
    return Math.ceil(time / 3600) * hourlyRate;
  };

  return (
    <TableValuesContext.Provider value={{ tables }}>
      <TableActionsContext.Provider
        value={{
          calcTableCost,
          refreshTable,
          createTable,
          updateTable,
          removeTable,
          moveTable,
          setTableActive,
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
