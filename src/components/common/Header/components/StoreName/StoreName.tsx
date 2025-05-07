import { useStoreValues } from '@/contexts/store/StoreContext';

export const StoreName = () => {
  const { store } = useStoreValues();
  return <div className="font-semibold text-xl leading-6">{store.name}</div>;
};
