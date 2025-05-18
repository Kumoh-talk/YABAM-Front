import { GetCallsResponse } from '@/types/backend/call';
import { api } from './common';


export const getCalls = async (
    saleId: number,
    lastCallId?: number,
    size: number = 999
  ): Promise<GetCallsResponse> => {
    const url = `/yabam/api/v1/calls?saleId=${saleId}` +
      (lastCallId ? `&lastCallId=${lastCallId}` : `&lastCallId=1`) +
      `&size=${size}`;
    const res = await api<GetCallsResponse>(url, 'GET');
    if ('success' in res && res.success === 'true') {
        console.log(res.data);
        return res.data;
    }
    throw new Error('콜 목록 조회 실패');
  };