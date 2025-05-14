import { useEffect, useState } from 'react';
import { TableItem } from './components';
import { useStoreActions, useStoreValues } from '@/contexts/store/StoreContext';

export type PointerMode = 'idle' | 'navigate_view' | 'move_table';

export interface Props {
  isEditable?: boolean;
  onChangeSelectedTable?: (id: number) => void;
}

export const TableView = (props: Props) => {
  const tableSize = {
    w: 120,
    h: 112,
  };
  const tableGap = 10;
  const tableGrid = {
    width: (tableSize.w + tableGap) / 2,
    height: (tableSize.h + tableGap) / 2,
  };

  const { tables, orders } = useStoreValues();
  const { createTable, moveTable, removeTable } = useStoreActions();
  const [viewState, setViewState] = useState({
    pos: {
      x: 0,
      y: 0,
    },
    zoom: 1,
  });
  const [pointerState, setPointerState] = useState({
    mode: 'idle' as PointerMode,
    seletedItem: -1,
    itemPos: {
      x: 0,
      y: 0,
    },
    startPos: {
      x: 0,
      y: 0,
    },
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      setPointerState((prevState) => ({
        ...prevState,
        startPos: {
          x: e.clientX,
          y: e.clientY,
        },
      }));
    } else if (e.button === 1) {
      setPointerState((prevState) => ({
        ...prevState,
        mode: 'navigate_view',
        startPos: {
          x: e.clientX,
          y: e.clientY,
        },
      }));
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    const dx = e.clientX - pointerState.startPos.x;
    const dy = e.clientY - pointerState.startPos.y;
    if (pointerState.mode === 'navigate_view') {
      setViewState({
        ...viewState,
        pos: {
          x: viewState.pos.x - dx,
          y: viewState.pos.y - dy,
        },
      });
    } else if (pointerState.mode === 'move_table') {
      const tx = pointerState.itemPos.x + Math.round(dx / tableGrid.width);
      const ty = pointerState.itemPos.y + Math.round(dy / tableGrid.height);
      const targetTable = tables.find(
        (table) => table.id === pointerState.seletedItem,
      );
      if (targetTable) {
        moveTable(targetTable.id, tx, ty);
      }
    }
  };

  const onPointerUp = () => {
    setPointerState((prevState) => ({
      ...prevState,
      mode: 'idle',
    }));
  };

  const onPointerDownItem = (id: number, x: number, y: number) => {
    if (pointerState.mode === 'idle') {
      setPointerState((prevState) => ({
        ...prevState,
        ...(props.isEditable ? { mode: 'move_table' } : {}),
        seletedItem: id,
        itemPos: {
          x,
          y,
        },
      }));
    }
  };

  useEffect(() => {
    props.onChangeSelectedTable?.(pointerState.seletedItem);
  }, [pointerState]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [pointerState]);

  const list = tables.map((item) => {
    const targetOrders = orders.filter(
      (order) => order.tableId === item.id && order.status !== 'completed',
    );

    const productPrice = targetOrders.reduce(
      (acc, order) =>
        acc + order.products.reduce((sum, product) => sum + product.price, 0),
      0,
    );

    return (
      <TableItem
        key={item.id}
        table={item}
        x={
          (item.pos.x * tableGrid.width - viewState.pos.x + 16) * viewState.zoom
        }
        y={
          (item.pos.y * tableGrid.height - viewState.pos.y + 16) *
          viewState.zoom
        }
        onPointerDown={onPointerDownItem}
        isSelected={pointerState.seletedItem === item.id}
        startedAt={targetOrders[0]?.orderAt}
        price={productPrice}
      />
    );
  });

  return (
    <div className="overflow-hidden relative w-full h-full">
      <div
        className={`absolute size-full touch-none`}
        onPointerDown={onPointerDown}
        onDragStart={(_) => false}
      >
        {list}
      </div>
    </div>
  );
};
