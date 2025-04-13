
type Props = {
    selected: boolean;
    onToggle: () => void;
}

const Greentoggle = ({selected, onToggle}: Props) => {
    return (
        <button onClick={onToggle}
        className={`transition-colors duration-300 cursor-pointer flex justify-end w-14 h-auto gap-2.5 p-1 rounded-[50px] ${selected? "justify-end bg-[#059669]" : "justify-start bg-[#E5E8EB]"}`}>
            <div className="w-6 h-6 bg-white rounded-3xl"></div>
        </button>
    )
}

export default Greentoggle;
