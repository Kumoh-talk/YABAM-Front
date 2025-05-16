import { SaleCloseResponse, SaleOpenResponse, SaleSelectResponse } from '@/types/backend/sale';
import { api } from './common';

export const getSales = async (storeId: number) => {
  const res = await api<SaleSelectResponse>(
    `/yabam/api/v1/sales?storeId=${storeId}&size=1000`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영업 목록 조회 실패');
};

export const openSale = async (storeId: number) => {
  const res = await api<SaleOpenResponse>(
    `/yabam/api/v1/sale/open?storeId=${storeId}`,
    'POST',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영업 시작 실패');
};

export const closeSale = async (saleId: number) => {
  const res = await api<SaleCloseResponse>(
    `/yabam/api/v1/sale/close?saleId=${saleId}`,
    'PATCH',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영업 종료 실패');
};
