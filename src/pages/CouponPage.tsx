import { useCheckLogin } from '@/hooks';

export const CouponPage = () => {
  useCheckLogin(true);

  return (
    <section className="asdf flex flex-row w-full h-full">
      <header className="p-8">
        <h2 className="text-2xl font-medium">쿠폰 관리</h2>
      </header>
    </section>
  );
};
export default CouponPage;
