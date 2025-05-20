import {
  OrderSelectResponse,
  OrderStatus,
  OrderInfo,
  OrderMenuStatus,
} from '@/types/backend/order';
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

export const createDirectOrder = async (
  receiptId: string,
  menus: { menuId: number; menuQuantity: number }[],
) => {
  const res = await api<OrderInfo>(
    `/yabam/api/v1/receipts/${receiptId}/orders/direct`,
    'POST',
    menus,
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('직접 주문 추가 실패');
};

export const updateOrderStatus = async (
  orderId: number,
  status: OrderStatus,
): Promise<OrderInfo> => {
  const res = await api<OrderInfo>(
    `/yabam/api/v1/orders/${orderId}/status?orderStatus=${status}`,
    'PATCH',
    {
      status: status,
    },
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('주문 상태 업데이트 실패');
};

export const updateOrderMenuStatus = async (
  orderMenuId: number,
  status: OrderMenuStatus,
): Promise<OrderInfo> => {
  const res = await api<OrderInfo>(
    `/yabam/api/v1/order-menus/${orderMenuId}/status?orderMenuStatus=${status}`,
    'PATCH',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('주문 메뉴 상태 업데이트 실패');
};

export const updateOrderMenuQuantity = async (
  orderMenuId: number,
  patchQuantity: number,
): Promise<OrderInfo> => {
  const res = await api<OrderInfo>(
    `/yabam/api/v1/order-menus/${orderMenuId}/quantity?patchQuantity=${patchQuantity}`,
    'PATCH',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('주문 메뉴 수량 변경 실패');
};

export const deleteOrderMenu = async (
  orderMenuId: number,
): Promise<OrderInfo> => {
  const res = await api<OrderInfo>(
    `/yabam/api/v1/order-menus/${orderMenuId}`,
    'DELETE',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('주문 메뉴 삭제 실패');
};
