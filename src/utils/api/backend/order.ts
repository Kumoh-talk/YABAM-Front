import { OrderSelectResponse, OrderStatus } from '@/types/backend/order';
import { api } from './common';

export const getOrders = async (
  saleId: number,
  perPage: number = 999,
  statuses: OrderStatus[],
) => {
  const res = await api<OrderSelectResponse>(
    `/yabam/api/v1/sales/${saleId}/orders?pageSize=${perPage}&orderStatuses=${statuses.join()}`,
    'GET',
  );
  if ('success' in res && res.success == 'true') {
    return res.data;
  }
  throw new Error('주문 목록 조회 실패');
};
