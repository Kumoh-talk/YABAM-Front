export type StoreCreateDto = {
  storeName: string;
  latitude: number;
  longitude: number;
  description: string;
  headImageUrl: string;
  university: string;
  tableTime: number;
  tableCost: number;
};

export type StoreCreateResponse = {
  storeId: number;
};

export type StoreSelectResponse = {
  storeId: number;
  isOpen: boolean;
  storeName: string;
  latitude: number;
  longitude: number;
  description: string;
  headImageUrl: string;
  university: string;
  tableTime: number;
  tableCost: number;
  detailImageUrls: string[];
};

export type StoreUpdateDto = StoreCreateDto;
export type StoreUpdateResponse = StoreCreateResponse;

export type MystoreSelectResponse = {
  storeInfoResponses: StoreSelectResponse[];
};
