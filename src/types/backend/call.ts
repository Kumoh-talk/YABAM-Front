export interface CallInfo {
  callId: number;
  callMessage: string;
  isCompleted: boolean;
  tableId: string;
  tableNumber: number;
  createdAt: string;
}

export interface GetCallsResponse {
  totalCount: number;
  hasNextPage: boolean;
  saleId: number;
  callInfoDtos: CallInfo[];
}
