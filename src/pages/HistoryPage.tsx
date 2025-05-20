import { Button } from '@/components/common';
import { SaleSelect, OrderHistoryList } from '@/components/history';
import { useOrderActions } from '@/contexts/order/OrderContext';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useCheckLogin, useCsv } from '@/hooks';
import { OrderInfo } from '@/types/backend/order';
import { SaleDto } from '@/types/backend/sale';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const HistoryPage = () => {
  useCheckLogin(true);
  const { getOrders, removeReceipt } = useOrderActions();
  const { sales } = useStoreValues();
  const [sale, setSale] = useState<SaleDto | null>(null);
  const [orders, setOrders] = useState<OrderInfo[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { saveHistory } = useCsv();

  useEffect(() => {
    if (sales.length > 0) {
      const latestSale = sales[0];
      setSale(latestSale);
    }
  }, [sales]);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders(sale?.saleId ?? -1, undefined, [
        'RECEIVED',
        'COMPLETED',
      ]);

      const receiptsAndOrders = [
        ...new Set(
          response.pageContents.map(
            (order) => order.receipt.receiptInfo.receiptId,
          ),
        ),
      ]
        .map((receiptId) =>
          response.pageContents.filter(
            (order) => order.receipt.receiptInfo.receiptId === receiptId,
          ),
        )
        .sort((a, b) => {
          const aTime = new Date(
            a[0].receipt.receiptInfo.startUsageTime!,
          ).getTime();
          const bTime = new Date(
            b[0].receipt.receiptInfo.startUsageTime!,
          ).getTime();
          return bTime - aTime;
        });

      setOrders(receiptsAndOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('주문 내역을 불러오는 중 오류가 발생했습니다.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [sale?.saleId]);

  return (
    <section className="flex flex-col w-full h-full">
      <header className="flex flex-row items-center justify-between p-8">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-2xl font-medium">주문 내역(마감 후 정산용)</h2>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <SaleSelect value={sale} values={sales} onChange={setSale} />
          <Button onClick={() => saveHistory(orders)}>CSV로 출력</Button>
        </div>
      </header>
      <OrderHistoryList
        receiptsAndOrders={orders}
        isLoading={isLoading}
        onRemoveItem={async (receiptId) => {
          try {
            await removeReceipt(receiptId);
            toast.success('영수증 항목이 삭제되었습니다.');
            refresh();
          } catch (e) {
            toast.error('삭제 중 오류가 발생했습니다.');
          }
        }}
      />
    </section>
  );
};
export default HistoryPage;
