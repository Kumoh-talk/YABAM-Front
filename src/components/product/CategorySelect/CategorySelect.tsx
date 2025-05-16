import { useCategoryValues } from '@/contexts/category/CategoryContext';

interface Props {
  selected: number;
  onSelect: (categoryId: number) => void;
}

export const CategorySelect = ({ selected, onSelect }: Props) => {
  const { categories } = useCategoryValues();

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`cursor-pointer w-auto h-10 flex items-center justify-center gap-2.5 px-8 py-3 rounded-lg font-medium transition-colors ${
            selected === category.id
              ? 'bg-[#0092CA] text-white'
              : 'bg-[#E5E8EB] text-black'
          }`}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
