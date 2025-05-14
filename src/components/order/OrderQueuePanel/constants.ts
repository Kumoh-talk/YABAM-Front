import { Order } from '@/types';

export const dummyOrders: Order[] = [
  {
    id: 1,
    status: 'ready',
    orderAt: '2025-05-07T15:30:00Z',
    tableId: 1,
    products: [
      { id: 1, name: '음료수', price: 2000, quantity: 2, isEnded: false },
      { id: 2, name: '식사', price: 10000, quantity: 1, isEnded: false },
    ],
  },
  {
    id: 2,
    status: 'inProgress',
    orderAt: '2025-05-07T15:25:00Z',
    tableId: 2,
    products: [
      { id: 3, name: '디저트', price: 5000, quantity: 1, isEnded: true },
      { id: 3, name: '디저트', price: 5000, quantity: 1, isEnded: false },
      { id: 3, name: '디저트', price: 5000, quantity: 1, isEnded: true },
      { id: 3, name: '디저트', price: 5000, quantity: 1, isEnded: true },
      { id: 3, name: '디저트', price: 5000, quantity: 1, isEnded: true },
      { id: 4, name: '음료수', price: 2000, quantity: 3, isEnded: false },
    ],
  },
  {
    id: 3,
    status: 'inProgress',
    orderAt: '2025-05-07T15:20:00Z',
    tableId: 2,
    products: [
      { id: 3, name: '디저트', price: 5000, quantity: 1, isEnded: false },
      { id: 4, name: '음료수', price: 2000, quantity: 3, isEnded: false },
    ],
  },
  {
    id: 4,
    status: 'completed',
    orderAt: '2025-05-07T15:15:00Z',
    tableId: 3,
    products: [
      { id: 5, name: '식사', price: 10000, quantity: 2, isEnded: true },
      { id: 6, name: '디저트', price: 5000, quantity: 1, isEnded: true },
    ],
  },
  {
    id: 5,
    status: 'completed',
    orderAt: '2025-05-07T15:10:00Z',
    tableId: 3,
    products: [
      { id: 5, name: '식사', price: 10000, quantity: 2, isEnded: true },
      { id: 6, name: '디저트', price: 5000, quantity: 1, isEnded: true },
    ],
  },
  {
    id: 6,
    status: 'completed',
    orderAt: '2025-05-07T15:05:00Z',
    tableId: 5,
    products: [
      { id: 5, name: '식사', price: 10000, quantity: 2, isEnded: true },
      { id: 6, name: '디저트', price: 5000, quantity: 1, isEnded: true },
    ],
  },
  {
    id: 7,
    status: 'completed',
    orderAt: '2025-05-07T15:04:00Z',
    tableId: 6,
    products: [
      { id: 5, name: '식사', price: 10000, quantity: 2, isEnded: true },
      { id: 6, name: '디저트', price: 5000, quantity: 1, isEnded: true },
    ],
  },
  {
    id: 8,
    status: 'completed',
    orderAt: '2025-05-07T15:03:00Z',
    tableId: 7,
    products: [
      { id: 5, name: '식사', price: 10000, quantity: 2, isEnded: true },
      { id: 6, name: '디저트', price: 5000, quantity: 1, isEnded: true },
    ],
  },
];
