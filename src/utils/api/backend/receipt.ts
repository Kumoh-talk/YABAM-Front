import { ReceiptCreateResponse, ReceiptNonAdjustSelectResponse } from '@/types/backend/receipt';
import { api } from './common';

export const createReceipt = async (storeId: number, tableId: number) => {
  const res = await api<ReceiptCreateResponse>(`/yabam/api/v1/receipts?storeId=${storeId}&tableId=${tableId}`, 'POST');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 생성 실패');
};

export const getNonAdjestReceipt = async (tableId: number) => {
  const res = await api<ReceiptNonAdjustSelectResponse>(`/yabam/api/v1/table/${tableId}/receipts/non-adjust`, 'GET');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('테이블별 영수증 조회 실패');
};

export const getReceipts = async (saleId: number, isAdjust: boolean) => {
  const res = await api<ReceiptCreateResponse>(
    isAdjust ? `/yabam/api/v1/sales/${saleId}/receipts` : `/yabam/api/v1/sales/${saleId}/non-adjust-receipts`,
    'POST'
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 생성 실패');
};

export const getReceipt = async (receiptId: string) => {
  const res = await api(`/yabam/api/v1/receipts/${receiptId}`, 'GET');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 조회 실패');
};
