export type TableCreateDto = {
  storeId: number;
  tableX: number;
  tableY: number;
  tableNumber: number;
};

export type TableCreateResponse = {
  tableId: number;
};

export type TableSelectResponse = {
  tableInfoList: TableInfo[];
};

export type TableInfo = {
  tableId: number;
  tableNumber: number;
  isActive: boolean;
  tableX: number;
  tableY: number;
};

export type TableUpdateDto = {
  tableId: number;
  tableNumber: number;
  tableX: number;
  tableY: number;
};
