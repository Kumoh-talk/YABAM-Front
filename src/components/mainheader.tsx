import React, { useState, useEffect } from "react";
import dayjs from "dayjs";      
import 'dayjs/locale/ko';
import Hamburger from "../assets/icon/hamburger.tsx";
import Quiticon from "../assets/icon/quiticon.tsx";
dayjs.locale('ko');

export const MainHeader = () => {
    const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const Time = time.format("M.DD (dd) A hh:mm");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[3.75rem] items-center justify-between  bg-[#393e46]">
      <div className="justify-center flex w-[3.75rem] ">
          <Hamburger />
      </div>

      <div className=" font-semibold text-xl  text-white leading-6">
        가게 이름
      </div>

      <div className="justify-end flex w-[3.75rem] items-center">
        <div className="w-fit ml-[-9.25rem] font-normal text-base whitespace-nowrap text-white leading-6">
            {Time}
        </div>
        <div className="justify-center flex w-[3.75rem] ">
            <Quiticon />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;