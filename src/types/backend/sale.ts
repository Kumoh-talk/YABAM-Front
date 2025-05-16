export type SaleDto = {
  saleId: number;
  openDateTime: string;
  closeDateTime: string | null;
  isOpen: boolean;
};

export type SaleSelectResponse = {
  totalCount: number;
  hasNextPage: boolean;
  lastSaleId: number | null;
  saleInfoDtos: SaleDto[];
};

export type SaleOpenResponse = {
  saleId: number;
};

export type SaleCloseResponse = {
  saleId: number;
};
