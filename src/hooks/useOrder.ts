import { useCallback, useEffect, useState } from 'react';
import { Store } from '@/types';
import { OrderInfo, OrderStatus } from '@/types/backend/order';
import {
  getOrders,
  updateOrderMenuQuantity,
  deleteOrderMenu,
  updateOrderMenuStatus,
  updateOrderStatus,
} from '@/utils/api/backend/order';
import { SaleDto } from '@/types/backend/sale';
import { OrderMenuStatus } from '@/types/backend/order';
import { adjustReceipts, stopReceipts, restartReceipt } from '@/utils/api/backend/receipt';
import { ReceiptInfo } from '@/types/backend/receipt';

export const useOrder = (store: Store, sale: SaleDto | null) => {
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  const refreshOrders = useCallback(async () => {
    try {
      if (store.id === -1 || !sale) {
        return;
      }
      const res = await getOrders(sale.saleId, 1500, [
        'ORDERED',
        'RECEIVED',
        'COMPLETED',
        'CANCELED',
      ]);
      setOrders(res.pageContents);
    } catch (e) {
      console.error(e);
    }
  }, [store, sale]);

  useEffect(() => {
    const interval = setInterval(refreshOrders, 1000);
    refreshOrders();
    return () => clearInterval(interval);
  }, [refreshOrders]);

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

  return {
    orders,
    getOrders,
    refreshOrders,
    setOrderStatus,
    setOrderMenuStatuses,
    setOrderMenuQuantity,
    deleteOrderMenu,
    stopReceipts,
    updateOrderStatus,
    adjustReceipts,
    setRestartReceipt,
  };
};
