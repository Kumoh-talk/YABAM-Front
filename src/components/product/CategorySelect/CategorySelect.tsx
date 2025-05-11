import { useState } from 'react';

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

export const CategorySelect = ({ selected, onSelect }: Props) => {
  const categories = ['기본', '메뉴'];

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((name) => (
        <div
          key={name}
          onClick={() => onSelect(name)}
          className={`cursor-pointer w-auto h-10 flex items-center justify-center gap-2.5 px-8 py-3 rounded-lg transition-colors ${
            selected === name
              ? 'bg-[#0092CA] text-white'
              : 'bg-[#E5E8EB] text-black'
          }`}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
