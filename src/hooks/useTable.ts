import { Table } from '@/types';
import { useState } from 'react';

const dummy: Table[] = [
  {
    id: 1,
    number: 1,
    isActive: true,
    pos: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 2,
    number: 2,
    isActive: true,
    pos: {
      x: 2,
      y: 0,
    },
  },
  {
    id: 3,
    number: 3,
    isActive: true,
    pos: {
      x: 4,
      y: 0,
    },
  },
  {
    id: 4,
    number: 4,
    isActive: true,
    pos: {
      x: 6,
      y: 0,
    },
  },
  {
    id: 5,
    number: 5,
    isActive: true,
    pos: {
      x: 8,
      y: 0,
    },
  },
  {
    id: 6,
    number: 6,
    isActive: true,
    pos: {
      x: 10,
      y: 0,
    },
  },
  {
    id: 7,
    number: 7,
    isActive: true,
    pos: {
      x: 12,
      y: 0,
    },
  },
  {
    id: 8,
    number: 8,
    isActive: true,
    pos: {
      x: 14,
      y: 0,
    },
  },
];

export const useTable = () => {
  const [tables, setTables] = useState<Table[]>(dummy);
  return {
    tables,
  };
};
