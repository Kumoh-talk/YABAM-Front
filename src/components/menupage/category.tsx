import { useState } from "react";

const Category = () => {
    const [selected, setSelected] = useState("전체");

    const categories = ["전체", "기본", "메뉴"];

    return (
        <div className="flex gap-4">
            {categories.map((name) => (
                <div
                    key={name}
                    onClick={() => setSelected(name)}
                    className={`cursor-pointer w-auto h-10 flex items-center justify-center gap-2.5 px-8 py-3 rounded-lg transition-colors ${
                        selected === name ? "bg-[#0092CA] text-white" : "bg-[#E5E8EB] text-black"
                    }`}
                >
                    {name}
                </div>
            ))}
        </div>
    );
};

export default Category;
