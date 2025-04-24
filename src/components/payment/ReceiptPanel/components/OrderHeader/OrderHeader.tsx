export const OrderHeader = () => {
  return (
    <li className="flex flex-row p-4 items-center text-base font-medium leading-none border-y border-y-gray-500">
      <span className="flex-1 w-0">메뉴명</span>
      <span className="w-[4.24rem] text-center">수량</span>
      <span className="w-20 text-center">금액</span>
    </li>
  );
};
