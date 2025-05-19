import { Button } from '@/components/common';
import { SaleSelect, OrderHistoryList } from '@/components/history';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useCheckLogin } from '@/hooks';
import { SaleDto } from '@/types/backend/sale';
import { useEffect, useState } from 'react';

export const HistoryPage = () => {
  useCheckLogin(true);
  const { sales } = useStoreValues();
  const [sale, setSale] = useState<SaleDto | null>(null);

  useEffect(() => {
    if (sales.length > 0) {
      const latestSale = sales[0];
      setSale(latestSale);
    }
  }, [sales]);

  return (
    <section className="flex flex-col w-full h-full">
      <header className="flex flex-row items-center justify-between p-8">
        <div className="flex flex-row gap-4 items-center">
          <h2 className="text-2xl font-medium">주문 내역(마감 후 정산용)</h2>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <SaleSelect value={sale} values={sales} onChange={setSale} />
          <Button>CSV로 출력</Button>
        </div>
      </header>
      <OrderHistoryList saleId={sale?.saleId ?? -1} />
    </section>
  );
};
export default HistoryPage;
