import { useTableActions } from '@/contexts/table/TableContext';
import { OrderInfo } from '@/types/backend/order';
import { formatTimeString, getRelativeSeconds } from '@/utils/functions';
import { toast } from 'react-toastify';

export const useCsv = () => {
  const { calcTableCost } = useTableActions();

  const saveHistory = async (orders: OrderInfo[][]) => {
    const csvData = formatData(orders);
    const filename = `history_${new Date().toISOString()}.csv`;
    saveToCsv(csvData, filename);
  };
  const saveToCsv = async (data: string, filename: string) => {
    try {
      const blob = new Blob([data], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (error) {
      toast.error('CSV 파일로 저장하는 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const formatData = (orders: OrderInfo[][]) => {
    const cols = [
      '영수증 번호',
      '시작시각',
      '종료시각',
      '점유 시간',
      '테이블 번호',
      '메뉴 이름',
      '메뉴 가격',
      '갯수',
      '메뉴 합계',
      '테이블 사용료',
      '총 금액',
    ];

    const data = orders
      .map((orderGroup) => formatReceiptData(orderGroup))
      .join('\n');
    return `\ufeff${cols.join(',')}\n${data}`;
  };

  const formatReceiptData = (orders: OrderInfo[]) => {
    const startedTime = orders[0].receipt.receiptInfo.startUsageTime!;
    const stoppedTime = orders[0].receipt.receiptInfo.stopUsageTime;
    const duration = stoppedTime
      ? new Date(stoppedTime!).getTime() - new Date(startedTime).getTime()
      : -1;

    const tableInfo = orders[0].receipt.tableInfo;

    const orderMenus: Record<number, number> = {};
    orders.forEach((order) =>
      order.orderMenus.forEach((menu) => {
        if (orderMenus[menu.menuInfo.menuId]) {
          orderMenus[menu.menuInfo.menuId] += menu.quantity;
        } else {
          orderMenus[menu.menuInfo.menuId] = menu.quantity;
        }
      }),
    );

    const startedTimeStr = new Date(startedTime).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const closedTimeStr = new Date(stoppedTime ?? new Date()).toLocaleString(
      'ko-KR',
      {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      },
    );

    const menuPrice = orders.reduce(
      (accm, order) => accm + order.totalPrice,
      0,
    );
    const tablePrice = calcTableCost(
      getRelativeSeconds(startedTime, stoppedTime ?? new Date()),
      tableInfo.tableCapacity,
    );
    const totalPrice = menuPrice + tablePrice;

    return Object.entries(orderMenus)
      .map(([menuId, quantity], index) => {
        const menu = orders
          .flatMap((order) => order.orderMenus)
          .find((menu) => menu.menuInfo.menuId === parseInt(menuId))?.menuInfo;
        const menuPrice = menu?.menuPrice;
        const menuTotalPrice = (menuPrice ?? 0) * quantity;
        return [
          orders[0].receipt.receiptInfo.receiptId,
          startedTimeStr,
          closedTimeStr,
          formatTimeString(duration),
          tableInfo.tableNumber,
          menu?.menuName,
          menuPrice,
          quantity,
          menuTotalPrice,
          index === 0 ? tablePrice : 0,
          index === 0 ? totalPrice : 0,
        ].join(',');
      })
      .join('\n');
  };

  return { saveHistory };
};
