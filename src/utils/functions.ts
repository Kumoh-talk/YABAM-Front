import { getMyStores } from './api/backend/store';
import { OrderInfo, OrderMenuInfo } from '@/types/backend/order';
import { Table } from '@/types';

export const formatNumberWithComma = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatRelativeTime = (date: string) => {
  const now = new Date();
  const orderDate = new Date(date);
  let diffInSeconds = Math.floor((now.getTime() - orderDate.getTime()) / 1000);
  if (diffInSeconds < 0) diffInSeconds = 0;

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  } else {
    return orderDate.toLocaleDateString();
  }
};

export const isExternalUrl = (url: string) =>
  url.startsWith('https:') ||
  url.startsWith('http:') ||
  url.startsWith('mailto:');

export const getRelativeSeconds = (date: number | string | Date) => {
  const result = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  return isNaN(result) ? 0 : result;
};

export const formarDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}. ${month}. ${day}.`;
};

export const formatTimeString = (time: number) => {
  const hours = Math.floor(time / 3600_000);
  const minutes = Math.floor((time % 3600_000) / 60_000)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((time % 60_000) / 1000)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const checkHasOwnStore = async () => {
  try {
    // 본인 점포가 존재하는지 여부로 가입완료 여부 판단
    const myStores = await getMyStores();
    return myStores.length > 0;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export function getTableTotalPrice(
  table: Table,
  orders: OrderInfo[],
  calcTableCost: (time: number, tableCapacity: number) => number,
): {
  orderMenus: OrderMenuInfo[];
  price: number;
  startTime: string | undefined;
} {
  const tableOrders = orders.filter(
    (order) =>
      order.receipt.tableInfo.tableId === table.id &&
      order.receipt.receiptInfo.isAdjustment === false &&
      (order.orderStatus === 'COMPLETED' || order.orderStatus === 'RECEIVED'),
  );
  const orderMenus = tableOrders.flatMap((order) => order.orderMenus ?? []);
  const activeOrder = tableOrders[0];
  const startTime =
    activeOrder?.receipt.receiptInfo.startUsageTime || undefined;
  const menuPrice = getTotalMenuPrice(orderMenus);
  const tableCost = startTime
    ? calcTableCost(getRelativeSeconds(startTime), table.capacity)
    : 0;
  return { orderMenus, price: menuPrice + tableCost, startTime };
}

export function getTotalMenuPrice(orderMenus: OrderMenuInfo[] = []): number {
  return orderMenus
    ? orderMenus
        .filter((menu) => menu.orderMenuStatus !== 'CANCELED')
        .reduce(
          (sum, menu) =>
            sum + (menu.menuInfo.menuPrice ?? 0) * (menu.quantity ?? 1),
          0,
        )
    : 0;
}

export function getTableOrdersByTableId(
  orders: OrderInfo[],
  tableId: string,
): OrderInfo[] {
  const filteredOrders = orders.filter(
    (order) => order.receipt.tableInfo.tableId === tableId,
  );
  return filteredOrders;
}
