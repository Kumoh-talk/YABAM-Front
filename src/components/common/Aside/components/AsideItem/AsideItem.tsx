import { RightMouseIcon } from '@/assets/icon/rightmouse';

export interface Props {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export const AsideItem = ({ name, isSelected, onClick }: Props) => {
  return (
    <div className="w-full flex flex-col items-center px-4">
      <div
        onClick={onClick}
        className={`w-full p-4 flex justify-between items-center gap-2.5 relative font-semibold rounded-2xl cursor-pointer transition-colors ${
          isSelected ? 'bg-[#393E46] text-white' : 'text-black'
        }`}
      >
        {name}
        {isSelected && <RightMouseIcon />}
      </div>
    </div>
  );
};
