import { useCallback, useEffect, useState } from 'react';
import { Store } from '@/types';
import { OrderInfo, OrderStatus } from '@/types/backend/order';
import {
  getOrders,
  updateOrderMenuQuantity,
  updateOrderMenuStatus,
  updateOrderStatus,
  updateOrderMenuCompletedCount,
} from '@/utils/api/backend/order';
import { SaleDto } from '@/types/backend/sale';
import {} from '@/utils/api/backend/order';
import { OrderMenuStatus } from '@/types/backend/order';
import {
  adjustReceipts,
  stopReceipts,
  restartReceipt,
  removeReceipt,
} from '@/utils/api/backend/receipt';

export const useOrder = (store: Store, sale: SaleDto | null) => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  const refreshOrders = useCallback(async () => {
    try {
      if (store.id === -1 || !sale) {
        return;
      }
      const res = await getOrders(sale.saleId, 200, [
        'ORDERED',
        'RECEIVED',
        'COMPLETED',
        'CANCELED',
      ]);
      setOrders(res.pageContents);
    } catch (e) {
      console.error(e);
    }
  }, [store.id, sale?.saleId]);

  // 주문 상태 변경
  const setOrderStatus = async (orderId: number, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      await refreshOrders();
    } catch (error) {
      console.error(`주문 상태 변경(${status}) 실패:`, error);
    }
  };
  // 주문메뉴 상태 변경
  const setOrderMenuStatuses = async (
    orderMenuIds: number[],
    status: OrderMenuStatus,
  ) => {
    try {
      for (const orderMenuId of orderMenuIds) {
        await updateOrderMenuStatus(orderMenuId, status);
      }
      await refreshOrders();
    } catch (error) {
      console.error(`주문 메뉴 상태 변경(${status}) 실패:`, error);
    }
  };
  // 주문 메뉴 수량 변경
  const setOrderMenuQuantity = async (
    orderMenuId: number,
    quantity: number,
  ) => {
    try {
      await updateOrderMenuQuantity(orderMenuId, quantity);
      await refreshOrders();
    } catch (error) {
      console.error(`주문 메뉴 수량 변경(${quantity}) 실패:`, error);
    }
  };
  // 주문 메뉴 삭제
  const deleteOrderMenu = async (orderMenuId: number) => {
    try {
      await deleteOrderMenu(orderMenuId);
      await refreshOrders();
    } catch (error) {
      console.error(`주문 메뉴 삭제(${orderMenuId}) 실패:`, error);
    }
  };

  const setRestartReceipt = async (receiptIds: string[]) => {
    try {
      await restartReceipt(receiptIds);
      await refreshOrders();
    } catch (error) {
      console.error(`영수증 재시작 실패:`, error);
    }
  };
  const setOrderMenuCompletedCount = async (
    orderMenuId: number,
    completedCount: number,
  ) => {
    try {
      await updateOrderMenuCompletedCount(orderMenuId, completedCount);
      await refreshOrders();
    } catch (error) {
      console.error(`주문 메뉴 완료 수량 업데이트 실패:`, error);
    }
  };

  return {
    orders,
    getOrders,
    refreshOrders,
    setOrderStatus,
    setOrderMenuStatuses,
    setOrderMenuQuantity,
    deleteOrderMenu,
    stopReceipts,
    removeReceipt,
    updateOrderStatus,
    adjustReceipts,
    setRestartReceipt,
    setOrderMenuCompletedCount,
  };
};
