import { useCallback, useEffect, useState } from 'react';
import { Store } from '@/types';
import { SaleDto } from '@/types/backend/sale';
import {
  adjustReceipts,
  stopReceipts,
  restartReceipt,
  getNonAdjustReceipts,
} from '@/utils/api/backend/receipt';
import { TableWithReceipt } from '@/types/backend/receipt';

export const useReceipt = (store: Store, sale: SaleDto | null) => {
  const [tableWithReceipts, setTableWithReceipts] = useState<TableWithReceipt[]>([]);

  const refreshTableWithReceipts = useCallback(async () => {
    try {
      if (store.id === -1 || !sale) {
        return;
      }
      const resNonAdjust = await getNonAdjustReceipts(sale.saleId);
      setTableWithReceipts(resNonAdjust.tableWithReceipts);
    } catch (e) {
      console.error(e);
    }
  }, [store.id, sale?.saleId]);


  const setRestartReceipt = async (receiptIds: string[]) => {
    try {
      await restartReceipt(receiptIds);
    } catch (error) {
      console.error(`영수증 재시작 실패:`, error);
    }
  };

  return {
    tableWithReceipts,
    refreshTableWithReceipts,
    stopReceipts,
    adjustReceipts,
    setRestartReceipt,
  };
};
