import { useStoreValues } from '@/contexts/store/StoreContext';
import { Table } from '@/types';
import {
  createTable as createTableApi,
  updateTable as updateTableApi,
  removeTable as removeTableApi,
  getTables,
} from '@/utils/api/backend/table';
import { useEffect, useState } from 'react';

export const useTable = () => {
  const { store } = useStoreValues();
  const [tables, setTables] = useState<Table[]>([]);

  const refreshTable = async () => {
    try {
      if (store.id === -1) return;
      const tables = await getTables(store.id);
      setTables(
        tables.map((table) => ({
          id: table.tableId,
          number: table.tableNumber,
          isActive: table.isActive,
          pos: {
            x: table.tableX,
            y: table.tableY,
          },
        })),
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshTable();
  }, [store]);

  const createTable = async (table: Omit<Table, 'id'>) => {
    try {
      if (store.id === -1) return;
      await createTableApi({
        storeId: store.id,
        tableNumber: table.number,
        tableX: table.pos.x,
        tableY: table.pos.y,
      });
      await refreshTable();
    } catch (e) {
      console.error(e);
    }
  };

  const updateTable = async (table: Table) => {
    try {
      if (store.id === -1) return;
      await updateTableApi({
        tableId: table.id,
        tableNumber: table.number,
        tableX: table.pos.x,
        tableY: table.pos.y,
      });
      await refreshTable();
    } catch (e) {
      console.error(e);
    }
  };

  const removeTable = async (id: number) => {
    try {
      if (store.id === -1) return;
      setTables((prev) => {
        const index = prev.findIndex((t) => t.id === id);
        if (index === -1) return prev;
        const newTables = [...prev];
        newTables.splice(index, 1);
        return newTables;
      });
      await removeTableApi(id);
      await refreshTable();
    } catch (e) {
      console.error(e);
    }
  };

  const moveTable = (id: number, x: number, y: number) => {
    if (store.id === -1) return;
    setTables((prev) => {
      const index = prev.findIndex((t) => t.id === id);
      if (index === -1) return prev;
      if (prev[index].pos.x === x && prev[index].pos.y === y) return prev;
      const newTables = [...prev];
      newTables[index] = {
        ...newTables[index],
        pos: {
          x,
          y,
        },
      };
      updateTableApi({
        tableId: newTables[index].id,
        tableNumber: newTables[index].number,
        tableX: newTables[index].pos.x,
        tableY: newTables[index].pos.y,
      });
      return newTables;
    });
  };

  const getAvailableNum = () => {
    const maxNum = Math.max(...[{ number: 1 }, ...tables].map((t) => t.number));
    console.log('maxNum', maxNum);
    const availableNum = Array.from({ length: maxNum }, (_, i) => i + 1).filter(
      (num) => !tables.some((t) => t.number === num),
    );
    console.log('availableNum', availableNum);
    console.log(availableNum.length > 0 ? availableNum[0] : maxNum + 1);
    return availableNum.length > 0 ? availableNum[0] : maxNum + 1;
  };

  return {
    tables,
    createTable,
    updateTable,
    removeTable,
    moveTable,
    getAvailableNum,
  };
};
