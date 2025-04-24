import { createContext, useContext, useState } from 'react';

export type Values = {
  isAsideOpened: boolean;
  storeName: string;
};

export type Actions = {
  setIsAsideOpened: (value: boolean) => void;
  toggleAsideOpened: () => void;
  setStoreName: (value: string) => void;
};

const CommonValuesContext = createContext<Values | undefined>(undefined);
const CommonActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const CommonProvider = (props: Props) => {
  const [isAsideOpened, setIsAsideOpened] = useState(true);
  const [storeName, setStoreName] = useState('가게 이름');

  const toggleAsideOpened = () => {
    setIsAsideOpened((prev) => !prev);
  };

  return (
    <CommonValuesContext.Provider value={{ isAsideOpened, storeName }}>
      <CommonActionsContext.Provider
        value={{ setIsAsideOpened, setStoreName, toggleAsideOpened }}
      >
        {props.children}
      </CommonActionsContext.Provider>
    </CommonValuesContext.Provider>
  );
};

export const useCommonValues = () => {
  const context = useContext(CommonValuesContext);
  if (context === undefined) {
    throw new Error('useCommonValues must be used within a CommonProvider');
  }
  return context;
};

export const useCommonActions = () => {
  const context = useContext(CommonActionsContext);
  if (context === undefined) {
    throw new Error('useCommonActions must be used within a CommonProvider');
  }
  return context;
};
