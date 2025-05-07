export type User = {
  id: number;
  name: string;
  phone: string;
  department: string;
};
export type Store = {
  id: number;
  name: string;
  description: string;
  logo: string;
  location: LocationPoint;
  tableTime: number;
  tableCost: number;
};

export type LocationPoint = {
  latitude: number;
  longitude: number;
};

export type Order = {
  id: number;
  status: OrderStatus;
  orderAt: string;
  tableName: string;
  products: Product[];
};

export type OrderStatus = 'ready' | 'inProgress' | 'completed';
export const orderStatusList: OrderStatus[] = [
  'ready',
  'inProgress',
  'completed',
];

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isEnded: boolean;
};

export type Call = {
  id: number;
  message: string;
  calledAt: string;
  isEnded: boolean;
};
