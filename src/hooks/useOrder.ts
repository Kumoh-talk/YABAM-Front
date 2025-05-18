import { useEffect, useState } from 'react';
import { Store } from '@/types';
import { OrderInfo } from '@/types/backend/order';
import { getOrders } from '@/utils/api/backend/order';
import { SaleDto } from '@/types/backend/sale';
import {
  updateOrderMenuItemStatus,
  updateOrderMenuStatus,
} from '@/utils/api/backend/order';
import { OrderMenuStatus, OrderStatus } from '@/types/backend/order';

export const useOrder = (
  store: Store,
  sale: SaleDto | null,
  onStatusChange?: () => void,
) => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  const refreshOrder = async () => {
    try {
      if (store.id === -1 || !sale) return;
      const orders = await getOrders(sale.saleId, 999, [
        'ORDERED',
        'RECEIVED',
        'COMPLETED',
        'CANCELED',
      ]);
      setOrders(orders.pageContents);
    } catch (e) {
      console.error(e);
    }
  };

  // 주문 단위 상태 변경 핸들러
  const handleOrderCancel = async (orderId: number) => {
    try {
      await updateOrderMenuStatus(orderId, 'CANCELED' as OrderStatus);
      onStatusChange?.();
    } catch (error) {
      console.error('주문 취소 실패:', error);
    }
  };
  const handleOrderComplete = async (orderId: number) => {
    try {
      await updateOrderMenuStatus(orderId, 'RECEIVED' as OrderStatus);
      onStatusChange?.();
    } catch (error) {
      console.error('주문 완료 처리 실패:', error);
    }
  };
  const handleOrderReroll = async (orderId: number) => {
    try {
      await updateOrderMenuStatus(orderId, 'RECEIVED' as OrderStatus);
      onStatusChange?.();
    } catch (error) {
      console.error('주문 리롤(대기중 변경) 실패:', error);
    }
  };

  // 주문메뉴 단위 상태 변경 핸들러
  const handleCancel = async (orderMenuId: number) => {
    try {
      await updateOrderMenuItemStatus(
        orderMenuId,
        'CANCELED' as OrderMenuStatus,
      );
      onStatusChange?.();
    } catch (error) {
      console.error('주문 메뉴 취소 실패:', error);
    }
  };

  const handleComplete = async (orderMenuId: number) => {
    try {
      await updateOrderMenuItemStatus(
        orderMenuId,
        'COMPLETED' as OrderMenuStatus,
      );
      onStatusChange?.();
    } catch (error) {
      console.error('주문 메뉴 완료 처리 실패:', error);
    }
  };

  const handleReplay = async (orderMenuId: number) => {
    try {
      await updateOrderMenuItemStatus(
        orderMenuId,
        'COOKING' as OrderMenuStatus,
      );
      onStatusChange?.();
    } catch (error) {
      console.error('주문 메뉴 재시작 실패:', error);
    }
  };

  useEffect(() => {
    refreshOrder();
  }, [store, sale]);

  // orderStatus가 바뀔 때마다 동기화: 3초마다 폴링
  useEffect(() => {
    const interval = setInterval(() => {
      refreshOrder();
    }, 1000);
    return () => clearInterval(interval);
  }, [refreshOrder]);

  return {
    orders,
    refreshOrder,
    // 주문 단위
    handleOrderCancel,
    handleOrderComplete,
    handleOrderReroll,
    // 주문메뉴 단위
    handleCancel,
    handleComplete,
    handleReplay,
  };
};
