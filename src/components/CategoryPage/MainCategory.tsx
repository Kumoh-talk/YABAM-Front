import { useState } from "react";
import WhitePlusIcon from "../../assets/icon/whiteplusicon";
import CategoryList from "./CategoryList";
const MainCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-8 ">
      <div className="w-full gap-2 flex flex-col">
        <div className="w-full flex items-center justify-between">
          <div className="leading-6 font-semibold text-2xl text-center">
            카테고리
          </div>
          <div className="flex items-center gap-4">
            <input
              className="p-4 rounded-xl bg-[#F6F7F8]"
              placeholder="카테고리 이름"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button className="cursor-pointer gap-2.5 flex items-center p-3 bg-[#0092CA] rounded-xl">
              <WhitePlusIcon />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-end gap-12 px-3 py-2">
          <div className="text-sm leading-6">표시</div>
          <div className="text-sm leading-6">삭제</div>
        </div>
      </div>
      <CategoryList />
    </div>
  );
};

export default MainCategory;
