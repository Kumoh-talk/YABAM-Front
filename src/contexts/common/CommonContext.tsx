import { createContext, useContext, useState } from 'react';

export type Values = {
  isAsideOpened: boolean;
};

export type Actions = {
  setIsAsideOpened: (value: boolean) => void;
  toggleAsideOpened: () => void;
};

const CommonValuesContext = createContext<Values | undefined>(undefined);
const CommonActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const CommonProvider = (props: Props) => {
  const [isAsideOpened, setIsAsideOpened] = useState(true);

  const toggleAsideOpened = () => {
    setIsAsideOpened((prev) => !prev);
  };

  return (
    <CommonValuesContext.Provider value={{ isAsideOpened }}>
      <CommonActionsContext.Provider
        value={{ setIsAsideOpened, toggleAsideOpened }}
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
