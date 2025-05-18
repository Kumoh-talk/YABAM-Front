import { createContext, useContext, useEffect } from 'react';
import { useKakao, useOrder, useStore } from '@/hooks';
import { Store } from '@/types';
import { useSale } from '@/hooks/useSale';
import { SaleDto } from '@/types/backend/sale';
import { StoreCreateDto } from '@/types/backend/store';
import { createStore } from '@/utils/api/backend/store';
import { OrderInfo } from '@/types/backend/order';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export type Values = {
  store: Store;
  orders: OrderInfo[];
  sales: SaleDto[];
  sale: SaleDto | null;
};

export type Actions = {
  logout: () => Promise<boolean>;
  updateStore: (value: Partial<Omit<Store, 'id'>>) => void;
  requestCreateStore: (value: Omit<Store, 'id'>) => Promise<boolean>;
  openSale: () => Promise<void>;
  closeSale: () => Promise<void>;
};

const StoreValuesContext = createContext<Values | undefined>(undefined);
const StoreActionsContext = createContext<Actions | undefined>(undefined);

export interface Props {
  readonly children: React.ReactNode;
}

export const StoreProvider = (props: Props) => {
  const { accessToken, logout } = useKakao();
  const { store, update, refresh: refreshStore } = useStore();
  const { sales, sale, openSale, closeSale } = useSale(store);
  const { orders, refreshOrder } = useOrder(store, sale);

  const navigate = useNavigate();
  const lastOrderIdRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshOrder();
    }, 1000);
    return () => clearInterval(interval);
  }, [refreshOrder]);

  useEffect(() => {
    const ordered = orders.filter(order => order.orderStatus === 'ORDERED');
    if (ordered.length > 0) {
      const latestOrderId = ordered[0].orderId;
      if (lastOrderIdRef.current !== latestOrderId) {
        if (lastOrderIdRef.current !== null) {
          toast.info('새로운 주문이 들어왔습니다!', {
            onClick: () => navigate('/main'),
            style: { cursor: 'pointer' },
            autoClose: 4000,
          });
        }
        lastOrderIdRef.current = latestOrderId;
      }
    }
  }, [orders, navigate]);

  const requestCreateStore = async (value: Omit<Store, 'id'>) => {
    try {
      const dto: StoreCreateDto = {
        storeName: value.name,
        description: value.description,
        latitude: value.location.latitude,
        longitude: value.location.longitude,
        headImageUrl: value.logo,
        university: value.university,
        tableTime: value.tableTime,
        tableCost: value.tableCost,
      };
      await createStore(dto);
      await refreshStore();
      return true;
    } catch (error) {
      console.error('점포 생성 실패', error);
      return false;
    }
  };

  useEffect(() => {
    if (accessToken) {
      refreshStore();
    }
  }, [accessToken]);

  return (
    <StoreValuesContext.Provider value={{ orders, store, sales, sale }}>
      <StoreActionsContext.Provider
        value={{
          updateStore: update,
          requestCreateStore,
          openSale,
          closeSale,
          logout,
        }}
      >
        {props.children}
      </StoreActionsContext.Provider>
    </StoreValuesContext.Provider>
  );
};

export const useStoreValues = () => {
  const context = useContext(StoreValuesContext);
  if (context === undefined) {
    throw new Error('useStoreValues must be used within a StoreProvider');
  }
  return context;
};

export const useStoreActions = () => {
  const context = useContext(StoreActionsContext);
  if (context === undefined) {
    throw new Error('useStoreActions must be used within a StoreProvider');
  }
  return context;
};
