import React, { createContext, useContext } from 'react';
import { useCall } from '@/hooks/useCall';
import { CallInfo } from '@/types/backend/call';

export type CallValues = {
  calls: CallInfo[];
};

export type CallActions = {
  refreshCalls: () => void;
};

const CallValuesContext = createContext<CallValues | undefined>(undefined);
const CallActionsContext = createContext<CallActions | undefined>(undefined);

export interface Props {
  saleId?: number;
  children: React.ReactNode;
}

export const CallProvider = (props: Props) => {
  const { calls } = useCall(props.saleId);
  const refreshCalls = () => {};

  return (
    <CallValuesContext.Provider value={{ calls }}>
      <CallActionsContext.Provider value={{ refreshCalls }}>
        {props.children}
      </CallActionsContext.Provider>
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

export const useCallActions = () => {
  const context = useContext(CallActionsContext);
  if (context === undefined) {
    throw new Error('useCallActions must be used within a CallProvider');
  }
  return context;
};
