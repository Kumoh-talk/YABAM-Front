import { useEffect, useState } from 'react';
import { TableItem } from './components';
import { useStoreValues } from '@/contexts/store/StoreContext';

export interface Props {
  onChangeSelectedTable?: (id: number) => void;
}

export const TableView = (props: Props) => {
  const { tables, orders } = useStoreValues();
  const [selectedTableId, setSelectedTableId] = useState<number>(-1);
  const [viewState, setViewState] = useState({
    pos: {
      x: 0,
      y: 0,
    },
    zoom: 1,
  });
  const [pointerState, setPointerState] = useState({
    isDown: false,
    seletedItem: -1,
    startPos: {
      x: 0,
      y: 0,
    },
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button === 1) {
      setPointerState({
        ...pointerState,
        isDown: true,
        startPos: {
          x: e.clientX,
          y: e.clientY,
        },
      });
      console.log('onPointerDown', e.clientX, e.clientY);
    }
  };

  const onPointerMove = (e: PointerEvent) => {
    if (pointerState.isDown) {
      const dx = e.clientX - pointerState.startPos.x;
      const dy = e.clientY - pointerState.startPos.y;
      setViewState({
        ...viewState,
        pos: {
          x: viewState.pos.x - dx,
          y: viewState.pos.y - dy,
        },
      });
      console.log('onPointerMove', dx, dy);
    }
  };

  const onPointerUp = () => {
    setPointerState({
      ...pointerState,
      isDown: false,
    });
    console.log('onPointerUp');
  };

  useEffect(() => {
    props.onChangeSelectedTable?.(selectedTableId);
  }, [selectedTableId]);

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
        acc +
        order.products.reduce(
          (sum, product) => sum + product.price,
          0,
        ),
      0,
    );

    return (
      <TableItem
        key={item.id}
        table={item}
        x={(item.pos.x - viewState.pos.x + 32) * viewState.zoom}
        y={(item.pos.y - viewState.pos.y + 32) * viewState.zoom}
        onClick={setSelectedTableId}
        isSelected={selectedTableId === item.id}
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
