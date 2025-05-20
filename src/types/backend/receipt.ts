import { TableInfo } from './table';

export type ReceiptInfo = {
  receiptId: string;
  isAdjustment: boolean;
  startUsageTime: string | null;
  stopUsageTime: string | null;
  occupancyFee: number | null;
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
