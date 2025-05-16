import { TableView } from '@/components/common';
import { useCheckLogin } from '@/hooks';

export const TablePage = () => {
  useCheckLogin(true);

  return (
    <section className="flex flex-col w-full h-full">
      <TableView isEditable />
    </section>
  );
};
export default TablePage;
