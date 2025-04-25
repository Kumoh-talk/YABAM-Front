import { useState } from 'react';
import { Close } from '@mui/icons-material';
import { Button, Toggle } from '@/components/common';

export const CategoryList = () => {
  const categories = ['전체', '기본', '메뉴','gd'];
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
          <Toggle
            color="primary"
            isSelected={selectedStates[category]}
            onClick={() => toggleCategory(category)}
          />
        </div>
        <Button color="black-transparent">
          <Close />
        </Button>
      </div>
    </div>
  ));
};
