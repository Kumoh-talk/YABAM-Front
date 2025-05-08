import { TableView } from '@/components/common';
import { useCheckLogin } from '@/hooks';

export const TablePage = () => {
  useCheckLogin(true);

  return (
    <section className="asdf flex flex-col w-full h-full">
      <header className="p-8">
        <h2 className="text-2xl font-medium">테이블 관리</h2>
      </header>
      <TableView />
    </section>
  );
};
export default TablePage;
