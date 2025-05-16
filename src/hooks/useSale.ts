import { Store } from '@/types';
import { SaleDto } from '@/types/backend/sale';
import {
  getSales,
  openSale as openSaleApi,
  closeSale as closeSaleApi,
} from '@/utils/api/backend/sale';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useSale = (store: Store) => {
  const [sales, setSales] = useState<SaleDto[]>([]);
  const [sale, setSale] = useState<SaleDto | null>(null);

  const refreshSale = async () => {
    try {
      if (store.id === -1) return;
      const sales = await getSales(store.id);
      setSales(sales.saleInfoDtos);
      const opened = sales.saleInfoDtos.find((sale) => sale.isOpen);
      if (opened) {
        setSale(opened);
      } else {
        setSale(null);
      }
    } catch (e) {
      toast.error('영업 상태를 갱신할 수 없습니다.');
      console.error(e);
    }
  };

  useEffect(() => {
    refreshSale();
  }, [store]);

  const openSale = async () => {
    try {
      if (store.id === -1) return;
      const res = await openSaleApi(store.id);
      await refreshSale();
    } catch (e) {
      toast.error('영업을 시작할 수 없습니다.');
      console.error(e);
    }
  };

  const closeSale = async () => {
    try {
      if (sale === null) return;
      await closeSaleApi(sale.saleId);
      setSale(null);
      await refreshSale();
    } catch (e) {
      toast.error('영업을 종료할 수 없습니다.');
      console.error(e);
    }
  };

  return {
    sale,
    sales,
    refreshSale,
    openSale,
    closeSale,
  };
};
