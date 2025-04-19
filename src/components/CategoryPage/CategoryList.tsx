import { useState } from "react";
import Bluetoggle from "../../assets/icon/bluetoggle";
import { Close } from "@mui/icons-material";

const CategoryList = () => {
  const categories = ["전체", "기본", "메뉴"];
  const [selectedStates, setSelectedStates] = useState<{
    [key: string]: boolean;
  }>(categories.reduce((acc, category) => ({ ...acc, [category]: true }), {}));

  const toggleCategory = (category: string) => {
    setSelectedStates((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return categories.map((category) => (
    <div
      key={category}
      className="w-full flex justify-between px-3 py-6 border-t border-gray-500"
    >
      <div className="text-xl">{category}</div>
      <div className="flex gap-8 items-center">
        <div>
          <Bluetoggle
            selected={selectedStates[category]}
            onToggle={() => toggleCategory(category)}
          />
        </div>
        <button className="cursor-pointer text-sm leading-6">
          <Close />
        </button>
      </div>
    </div>
  ));
};

export default CategoryList;
