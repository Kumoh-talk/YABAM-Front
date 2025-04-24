import { useCommonValues } from "@/contexts/common/CommonContext";

export const StoreName = () => {
  const { storeName } = useCommonValues();
  return <div className="font-semibold text-xl leading-6">{storeName}</div>;
};
