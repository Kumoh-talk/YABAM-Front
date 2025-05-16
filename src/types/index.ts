import { OrderStatus } from './backend/order';

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
  university: string;
  tableTime: number;
  tableCost: number;
};

export type LocationPoint = {
  latitude: number;
  longitude: number;
};

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

export type Table = {
  id: number;
  number: number;
  isActive: boolean;
  pos: {
    x: number;
    y: number;
  };
};
