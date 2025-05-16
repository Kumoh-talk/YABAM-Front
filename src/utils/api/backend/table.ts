import { api } from './common';
import {
  TableCreateDto,
  TableCreateResponse,
  TableSelectResponse,
  TableUpdateDto,
} from '@/types/backend/table';

export const createTable = async (dto: TableCreateDto) => {
  const res = await api<TableCreateResponse>(
    '/yabam/api/v1/table',
    'POST',
    dto,
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('테이블 생성 실패');
};

export const getTables = async (storeId: number) => {
  const res = await api<TableSelectResponse>(
    `/yabam/api/v1/table?storeId=${storeId}`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data.tableInfoList;
  }
  throw new Error('테이블 목록 조회 실패');
};

export const updateTable = async (dto: TableUpdateDto) => {
  const res = await api(`/yabam/api/v1/table`, 'PATCH', dto);
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('테이블 수정 실패');
};

export const removeTable = async (tableId: number) => {
  const res = await api(`/yabam/api/v1/table?tableId=${tableId}`, 'DELETE');
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('테이블 제거 실패');
};
