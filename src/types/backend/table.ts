export type TableCreateDto = {
  storeId: number;
  tableX: number;
  tableY: number;
  tableNumber: number;
  tableCapacity: number;
};

export type TableCreateResponse = {
  tableId: string;
};

export type TableSelectResponse = {
  tableInfoList: TableInfo[];
};

export type TableInfo = {
  tableId: string;
  tableNumber: number;
  isActive: boolean;
  tableX: number;
  tableY: number;
  tableCapacity: number;
};

export type TableUpdateDto = {
  tableId: string;
  tableNumber: number;
  tableX: number;
  tableY: number;
};
