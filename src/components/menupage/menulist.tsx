import BlackPlusIcon from "../../assets/icon/blackplusicon";
import Bluetoggle from "../../assets/icon/bluetoggle";
import Greentoggle from "../../assets/icon/greentoggle";
import { useState } from "react";
type Props = {
    image: string;
    name: string;
    price: number;
    description: string;
    recommended: boolean;
    soldOut: boolean;
}   



const MenuList = ({image, name, price, description, recommended, soldOut}: Props) => {

    const [isRecommended, setIsRecommended] = useState(recommended);
    const [isSoldOut, setIsSoldOut] = useState(soldOut);

    return (
        <div className="w-full h-auto flex justify-between items-center pr-2">
            <div className="w-auto h-auto gap-4 flex items-center justify-center">
            <div className="w-20 h-20 p-3 flex flex-col justify-center items-center rounded-lg border-1 border-[#989898]">
            {image ? (<img src={image} alt={name} />) :(
                <div className="flex flex-col gap-1 items-center justify-center">
                    <BlackPlusIcon />
                    <div className="leading-6 ">이미지</div>
                </div>
            )}
            </div>
            <div className="w-auto h-auto flex flex-col gap-1 justify-baseline">
                <div className=" text-xl text-[#3B3B3C] leading-5">{name}</div>
                <div className="leading-6 text-[#0092CA]">{price}</div>
            </div>
            <div className="leading-6 text-[#6C6C6C]">{description}</div>
            </div>
            <div className="flex gap-10">
                <Bluetoggle selected={isRecommended} onToggle={() => setIsRecommended(!isRecommended)} />
                <Greentoggle selected={isSoldOut} onToggle={() => setIsSoldOut(!isSoldOut)} />
            </div>
        </div>
    )
}

export default MenuList;
