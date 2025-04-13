import Rightmouse from "../../assets/icon/rightmouse.tsx";

type Props = {
  name: string;
  selected: boolean;
  onClick: () => void;
};

const Sidebar = ({ name, selected, onClick }: Props) => {
  return (
    <div className="w-full flex flex-col items-center px-4">
      <div
        onClick={onClick}
        className={`w-full p-4 flex justify-between items-center gap-2.5 relative font-semibold rounded-2xl cursor-pointer transition-colors ${
          selected ? "bg-[#393E46] text-white" : "text-black"
        }`}
      >
        {name}
        {selected && <Rightmouse />}
      </div>
    </div>
  );
};

export default Sidebar;
