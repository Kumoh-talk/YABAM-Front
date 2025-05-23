import { useEffect, useRef, useState } from 'react';
import { useTableActions, useTableValues } from '@/contexts/table/TableContext';
import { useOrderValues } from '@/contexts/order/OrderContext';
import { getRelativeSeconds } from '@/utils/functions';
import { Button } from '..';
import { TableItem } from './components';

export type PointerMode = 'idle' | 'navigate_view' | 'move_table';

export interface Props {
  isEditable?: boolean;
  onChangeSelectedTable?: (id: string) => void;
  onTableDoubleClick?: (id: string) => void;
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
  const bodyRef = useRef<HTMLDivElement>(null);

  const { tables } = useTableValues();
  const { tableWithReceipts } = useOrderValues();
  const {
    createTable,
    moveTable,
    removeTable,
    getAvailableNum,
    calcTableCost,
  } = useTableActions();
  const [viewState, setViewState] = useState({
    pos: {
      x: 0,
      y: 0,
    },
    zoom: 1,
  });
  const [pointerState, setPointerState] = useState({
    mode: 'idle' as PointerMode,
    seletedItem: '' as string,
    itemPos: {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
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
        setPointerState((prevState) => ({
          ...prevState,
          itemPos: {
            ...prevState.itemPos,
            tx: tx,
            ty: ty,
          },
        }));
      }
    }
  };

  const onPointerUp = () => {
    setPointerState((prevState) => {
      if (prevState.mode === 'move_table') {
        const targetTable = tables.find(
          (table) => table.id === prevState.seletedItem,
        );
        if (targetTable) {
          moveTable(
            prevState.seletedItem,
            prevState.itemPos.tx,
            prevState.itemPos.ty,
          );
        }
      }

      return {
        ...prevState,
        mode: 'idle',
      };
    });
  };

  const onPointerDownItem = (id: string, x: number, y: number) => {
    props.onChangeSelectedTable?.(id);
    if (pointerState.mode === 'idle') {
      setPointerState((prevState) => ({
        ...prevState,
        ...(props.isEditable ? { mode: 'move_table' } : {}),
        seletedItem: id,
        itemPos: {
          x,
          y,
          tx: x,
          ty: y,
        },
      }));
    }
  };

  const handleDoubleClick = (id: string) => {
    if (pointerState.mode === 'idle') {
      props.onTableDoubleClick?.(id);
    }
  };

  const onClickRemoveButton = () => {
    removeTable(pointerState.seletedItem);
    setPointerState((prevState) => ({
      ...prevState,
      seletedItem: '',
    }));
  };

  const onClickCreateButton = (capacity: number) => {
    const bodyWidth = Math.floor(
      ((bodyRef.current?.clientWidth ?? 99999999) - 40) / tableGrid.width,
    );
    const x = tables.length > 0 ? tables[tables.length - 1].pos.x + 2 : 0;
    const y = tables.length > 0 ? tables[tables.length - 1].pos.y : 0;
    const isOvered = Math.floor(x / bodyWidth) > 0;
    const newPos = {
      x: isOvered ? 0 : x,
      y: y + (isOvered ? 2 : 0),
    };
    const newNumber = getAvailableNum();
    createTable({
      number: newNumber,
      isActive: true,
      pos: newPos,
      capacity,
    });
  };

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [pointerState]);

  const list = tables.map((item) => {
    const x =
      pointerState.mode === 'move_table' && pointerState.seletedItem === item.id
        ? pointerState.itemPos.tx
        : item.pos.x;
    const y =
      pointerState.mode === 'move_table' && pointerState.seletedItem === item.id
        ? pointerState.itemPos.ty
        : item.pos.y;

    const withReceipt = tableWithReceipts.find(
      (table) => table.tableId === item.id,
    );

    const startTime =
      withReceipt?.receiptInfo.receiptInfo?.startUsageTime || undefined;
    const stopTime = withReceipt?.receiptInfo.receiptInfo?.stopUsageTime;
    const price =
      (withReceipt?.receiptInfo.orderInfo.reduce(
        (accm, order) => order.totalPrice + accm,
        0,
      ) ?? 0) +
      (startTime
        ? calcTableCost(
            getRelativeSeconds(startTime, stopTime ?? new Date()),
            item.capacity,
          )
        : 0);

    return (
      <TableItem
        key={item.id}
        table={item}
        x={(x * tableGrid.width - viewState.pos.x + 16) * viewState.zoom}
        y={(y * tableGrid.height - viewState.pos.y + 16) * viewState.zoom}
        onPointerDown={onPointerDownItem}
        onDoubleClick={handleDoubleClick}
        isSelected={pointerState.seletedItem === item.id}
        isEditable={props.isEditable}
        startedAt={startTime}
        endedAt={stopTime}
        price={price}
      />
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setViewState((prev) => ({ ...prev }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {props.isEditable && (
        <header className="flex flex-row items-center justify-between p-8">
          <h2 className="text-2xl font-medium">테이블 관리</h2>
          <div className="flex flex-row gap-2">
            {pointerState.seletedItem !== '' && (
              <Button color="red" onClick={onClickRemoveButton}>
                선택한 테이블 제거
              </Button>
            )}
            <Button color="primary" onClick={() => onClickCreateButton(4)}>
              4인 테이블 추가
            </Button>
            <Button color="red" onClick={() => onClickCreateButton(6)}>
              6인 테이블 추가
            </Button>
          </div>
        </header>
      )}
      <div ref={bodyRef} className="relative w-full h-full overflow-hidden">
        <div
          className="absolute size-full touch-none"
          onPointerDown={onPointerDown}
          onDragStart={(e) => e.preventDefault()}
        >
          {list}
        </div>
      </div>
    </>
  );
};
