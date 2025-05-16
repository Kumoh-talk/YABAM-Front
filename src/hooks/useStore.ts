import { Store } from '@/types';
import { StoreUpdateDto } from '@/types/backend/store';
import { getMyStores, updateStore } from '@/utils/api/backend/store';
import { useEffect, useRef, useState } from 'react';

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
  const prevStoreRef = useRef<Store | null>(null);

  const refresh = async () => {
    try {
      const stores = await getMyStores();
      if (stores && stores.length > 0) {
        const store = stores[stores.length - 1];
        setStore({
          id: store.storeId,
          name: store.storeName,
          description: store.description,
          logo: store.headImageUrl,
          location: {
            latitude: store.latitude,
            longitude: store.longitude,
          },
          university: store.university,
          tableTime: store.tableTime,
          tableCost: store.tableCost,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (
      store.id !== -1 &&
      prevStoreRef &&
      JSON.stringify(store) !== JSON.stringify(prevStoreRef.current)
    ) {
      const dto: StoreUpdateDto = {
        storeName: store.name,
        latitude: store.location.latitude,
        longitude: store.location.longitude,
        description: store.description,
        headImageUrl: store.logo,
        university: store.university,
        tableTime: store.tableTime,
        tableCost: store.tableCost,
      };
      updateStore(store.id, dto);
      prevStoreRef.current = { ...store };
    }
  }, [store]);

  const update = (value: Partial<Omit<Store, 'id'>>) => {
    setStore((prev) => ({
      ...prev,
      ...value,
    }));
  };

  return {
    store,
    update,
    refresh,
  };
};
