import { OrderInfo } from './order';
import { TableInfo } from './table';

export type ReceiptInfo = {
  receiptId: string;
  isAdjustment: boolean;
  startUsageTime: string | null;
  stopUsageTime: string | null;
  occupancyFee: number | null;
};

export type TableWithReceipt = {
  tableId: string;
  tableNumber: number;
  isActive: boolean;
  receiptInfo: {
    receiptInfo: ReceiptInfo | null;
    orderInfo: Omit<OrderInfo, 'receipt' | 'orderMenus'>[];
  };
};

export type ReceiptCreateResponse = {
  receiptInfo: ReceiptInfo;
  tableInfo: TableInfo;
};

export type ReceiptNonAdjustSelectResponse = {
  receiptId: string;
};

export type ReceiptSelectResponse = {
  pageSize: number;
  pageNum: number;
  totalPage: number;
  pageSort: string;
  pageContents: ReceiptInfo[];
};

export type ReceiptsNonAdjustSelectResponse = {
  tableWithReceipts: TableWithReceipt[];
};
