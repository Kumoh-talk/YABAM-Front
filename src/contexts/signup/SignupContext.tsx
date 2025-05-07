import { Store, User } from '@/types';
import { createContext, useContext, useState } from 'react';

export type Values = {
  page: 1 | 2 | 3 | 4;
  manager: Omit<User, 'id'>;
  store: Omit<Store, 'id'>;
};

export type Actions = {
  nextPage: () => void;
  updateManager: (value: Partial<Values['manager']>) => void;
  updateStore: (value: Partial<Values['store']>) => void;
};

const SignupValuesContext = createContext<Values | undefined>(undefined);
const SignupActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const SignupProvider = (props: Props) => {
  const [page, setPage] = useState<Values['page']>(1);
  const [manager, setManager] = useState<Omit<User, 'id'>>({
    name: '',
    phone: '',
    department: '',
  });
  const [store, setStore] = useState<Omit<Store, 'id'>>({
    name: '',
    description: '',
    logo: '',
    location: {
      latitude: 36.142043,
      longitude: 128.394253,
    },
    tableTime: 30,
    tableCost: 1000,
  });

  const nextPage = () => {
    setPage((prev) => {
      if (prev === 4) return prev;
      return (prev + 1) as Values['page'];
    });
  };

  const updateManager = (value: Partial<Omit<User, 'id'>>) => {
    setManager((prev) => ({
      ...prev,
      ...value,
    }));
  };
  const updateStore = (value: Partial<Omit<Store, 'id'>>) => {
    setStore((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return (
    <SignupValuesContext.Provider value={{ page, manager, store }}>
      <SignupActionsContext.Provider
        value={{ nextPage, updateManager, updateStore }}
      >
        {props.children}
      </SignupActionsContext.Provider>
    </SignupValuesContext.Provider>
  );
};

export const useSignupValues = () => {
  const context = useContext(SignupValuesContext);
  if (context === undefined) {
    throw new Error('useSignupValues must be used within a SignupProvider');
  }
  return context;
};

export const useSignupActions = () => {
  const context = useContext(SignupActionsContext);
  if (context === undefined) {
    throw new Error('useSignupActions must be used within a SignupProvider');
  }
  return context;
};
