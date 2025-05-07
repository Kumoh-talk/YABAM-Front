import { Table } from '@/types';
import { useState } from 'react';

const dummy: Table[] = [
  {
    id: 1,
    name: '1번 페이블',
    pos: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 2,
    name: '2번 테이블',
    pos: {
      x: 150,
      y: 0,
    },
  },
  {
    id: 3,
    name: '3번 테이블',
    pos: {
      x: 300,
      y: 0,
    },
  },
  {
    id: 4,
    name: '4번 테이블',
    pos: {
      x: 450,
      y: 0,
    },
  },
  {
    id: 5,
    name: '5번 테이블',
    pos: {
      x: 600,
      y: 0,
    },
  },
  {
    id: 6,
    name: '6번 테이블',
    pos: {
      x: 750,
      y: 0,
    },
  },
  {
    id: 7,
    name: '7번 테이블',
    pos: {
      x: 900,
      y: 0,
    },
  },
  {
    id: 8,
    name: '8번 테이블',
    pos: {
      x: 1050,
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
