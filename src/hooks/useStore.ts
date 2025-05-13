import { Store } from '@/types';
import { useState } from 'react';

export const useStore = () => {
  const [store, setStore] = useState<Store>({
    id: -1,
    name: '',
    description: '',
    logo: '',
    location: {
      latitude: 36.142043,
      longitude: 128.394253,
    },
    university: '',
    tableTime: 30,
    tableCost: 1000,
  });

  const updateStore = (value: Partial<Omit<Store, 'id'>>) => {
    setStore((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return {
    store,
    updateStore,
  };
};
