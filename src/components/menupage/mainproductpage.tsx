import WhitePlusIcon from "../../assets/icon/whiteplusicon";
import Category from "./category";
import MenuList from "./menulist";
const MainProduct = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 h-screen">
      <div className="w-full h-auto gap-3 flex flex-col">
        <div className="w-full h-auto flex items-center justify-between">
          <div className="leading-6 font-semibold text-2xl text-center">
            상품
          </div>
          <div className="w-auto h-auto gap-2.5 flex items-center p-3 bg-[#0092CA] rounded-xl">
            <WhitePlusIcon />
            <div className="text-white leading-6">상품 등록</div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-between items-center">
          <Category />
          <div className="flex gap-9 px-1">
            <div>사장님추천</div>
            <div>품절표시</div>
          </div>
        </div>
      </div>
      <MenuList
        image=""
        name="상품명"
        price={0}
        description="상품 설명"
        recommended={false}
        soldOut={false}
      />
    </div>
  );
};

export default MainProduct;
