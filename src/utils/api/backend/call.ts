import { CallInfo, GetCallsResponse } from "@/types/backend/call";
import { api } from "./common";

export const getCalls = async (
  saleId: number,
  lastCallId?: number,
  size: number = 999
): Promise<GetCallsResponse> => {
  const url =
    `/yabam/api/v1/calls?saleId=${saleId}` +
    (lastCallId ? `&lastCallId=${lastCallId}` : "") +
    `&size=${size}`;
  const res = await api<GetCallsResponse>(url, "GET");
  if ("success" in res && res.success === "true") {
    return res.data;
  }
  throw new Error("콜 목록 조회 실패");
};

export const completeCall = async (callId: number): Promise<void> => {
  const url = `/yabam/api/v1/call/complete?callId=${callId}`;
  const res = await api(url, "PATCH");
  if ("success" in res && res.success === "true") {
    return;
  }
  throw new Error("콜 완료 처리 실패");
};
