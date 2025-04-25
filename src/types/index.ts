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
