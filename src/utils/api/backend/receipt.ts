import {
  ReceiptCreateResponse,
  ReceiptNonAdjustSelectResponse,
  ReceiptSelectResponse,
  ReceiptsNonAdjustSelectResponse,
} from '@/types/backend/receipt';
import { api } from './common';

export const createReceipt = async (storeId: number, tableId: string) => {
  const res = await api<ReceiptCreateResponse>(
    `/yabam/api/v1/receipts?storeId=${storeId}&tableId=${tableId}`,
    'POST',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 생성 실패');
};

export const getReceipts = async (saleId: number) => {
  const res = await api<ReceiptSelectResponse>(
    `/yabam/api/v1/sales/${saleId}/receipts`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('정산된 영수증 목록 조회 실패');
};

export const getNonAdjustReceipts = async (saleId: number) => {
  const res = await api<ReceiptsNonAdjustSelectResponse>(
    `/yabam/api/v1/sales/${saleId}/non-adjust-receipts`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('미정산 영수증 목록 조회 실패');
};

export const getReceipt = async (receiptId: string) => {
  const res = await api(`/yabam/api/v1/receipts/${receiptId}`, 'GET');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 조회 실패');
};

export const getNonAdjestReceipt = async (tableId: string) => {
  const res = await api<ReceiptNonAdjustSelectResponse>(
    `/yabam/api/v1/table/${tableId}/receipts/non-adjust`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('테이블별 영수증 조회 실패');
};

export const restartReceipt = async (receiptIds: string[]) => {
  const ids = receiptIds.map((id) => `receiptIds=${id}`).join('&');
  const res = await api(`/yabam/api/v1/receipts/re-start?${ids}`, 'PATCH');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 재시작 실패');
};

export const stopReceipts = async (receiptIds: string[]) => {
  const ids = receiptIds.map((id) => `receiptIds=${id}`).join('&');
  const res = await api(`/yabam/api/v1/receipts/stop?${ids}`, 'PATCH');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 사용종료 실패');
};

export const adjustReceipts = async (receiptIds: string[]) => {
  const ids = receiptIds.map((id) => `receiptIds=${id}`).join('&');
  const res = await api(`/yabam/api/v1/receipts/adjust?${ids}`, 'PATCH');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 최종정산 실패');
};

export const removeReceipt = async (receiptId: string) => {
  const res = await api<{}>(`/yabam/api/v1/receipts/${receiptId}`, 'DELETE');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('영수증 삭제 실패');
};
