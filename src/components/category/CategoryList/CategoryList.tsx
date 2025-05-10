import { useState } from 'react';
import { Close } from '@mui/icons-material';
import { Button, Toggle } from '@/components/common';
import { DragIndicator } from '@mui/icons-material';

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

  return categories.map((category, index) => (
    <div
      key={category}
      className={`w-full flex justify-between px-2 py-4 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
    >
      <div className='gap-4 flex items-center '>
        <DragIndicator/>
        <div className='gap-1'>
          <div className='text-text-primary'>카테고리이름</div>
          <div className='text-sm text-text-secondary'>메뉴 3개</div>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div>
          <Toggle
            color="primary"
            isSelected={selectedStates[category]}
            onClick={() => toggleCategory(category)}
          />
        </div>
        <Button color="black-transparent" isNoPadding>
          <Close className='text-gray-700'/>
        </Button>
      </div>
    </div>
  ));
};
