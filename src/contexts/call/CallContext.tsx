import React, { createContext, useContext } from 'react';
import { useCall } from '@/hooks/useCall';
import { CallInfo } from '@/types/backend/call';
import { useStoreValues } from '../store/StoreContext';

export type CallValues = {
  calls: CallInfo[];
  handleCompleteCall: (callId: number) => Promise<void>;
};

const CallValuesContext = createContext<CallValues | undefined>(undefined);

export interface Props {
  children: React.ReactNode;
}

export const CallProvider = (props: Props) => {
  const { sale } = useStoreValues();
  const { calls, handleCompleteCall } = useCall(sale?.saleId);

  return (
    <CallValuesContext.Provider value={{ calls, handleCompleteCall }}>
      {props.children}
    </CallValuesContext.Provider>
  );
};

export const useCallValues = () => {
  const context = useContext(CallValuesContext);
  if (context === undefined) {
    throw new Error('useCallValues must be used within a CallProvider');
  }
  return context;
};
