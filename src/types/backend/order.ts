import { MenuInfo } from './menu';
import { ReceiptInfo } from './receipt';
import { TableInfo } from './table';

export type OrderStatus = 'ORDERED' | 'RECEIVED' | 'CANCELED' | 'COMPLETED';
export type OrderMenuStatus = 'ORDERED' | 'COOKING' | 'CANCELED' | 'COMPLETED';
export const orderStatusList: OrderStatus[] = [
  'ORDERED',
  'RECEIVED',
  'CANCELED',
  'COMPLETED',
];

export type OrderInfo = {
  orderId: number;
  orderStatus: OrderStatus;
  totalPrice: number;
  createdAt: string;
  completedCount: number;
  receipt: {
    receiptInfo: ReceiptInfo;
    tableInfo: TableInfo;
  };
  orderMenus: OrderMenuInfo[];
};

export type OrderMenuInfo = {
  orderMenuId: number;
  orderMenuStatus: OrderMenuStatus;
  quantity: number;
  completedCount: number;
  menuInfo: MenuInfo;
};

export type OrderSelectResponse = {
  nextPage: boolean;
  pageSize: number;
  pageContents: OrderInfo[];
};
