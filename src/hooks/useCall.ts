import { useEffect, useState } from 'react';
import { getCalls, completeCall } from '@/utils/api/backend/call';
import { CallInfo } from '@/types/backend/call';

export const useCall = (
  saleId?: number,
  lastCallId?: number,
  interval: number = 5000,
) => {
  const [calls, setCalls] = useState<CallInfo[]>([]);

  useEffect(() => {
    if (!saleId) return;
    let timer: any;
    const fetchCalls = async () => {
      try {
        const res = await getCalls(saleId, lastCallId);
        setCalls(res.callInfoDtos);
      } catch (e) {
        console.error(e);
      }
      timer = setTimeout(fetchCalls, interval);
    };
    fetchCalls();
    return () => clearTimeout(timer);
  }, [saleId, lastCallId, interval]);

  const handleCompleteCall = async (callId: number) => {
    try {
      await completeCall(callId);
      const res = await getCalls(saleId!, lastCallId);
      setCalls(res.callInfoDtos);
    } catch (e) {
      console.error(e);
    }
  };

  return { calls, handleCompleteCall };
};
