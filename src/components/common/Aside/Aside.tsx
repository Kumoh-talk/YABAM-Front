import { useState } from 'react';
import { AsideItem } from './components';

export const Aside = () => {
  const [selectedMenu, setSelectedMenu] = useState('상품');

  const menuList = ['상품', '카테고리']; // 나중에 더 추가할 수도 있음

  return (
    <div className="flex flex-col w-64 h-full items-start gap-6 px-0 py-8 relative bg-[#eeeeee]">
      <div className="text-black gap-2.5 px-8 text-xl leading-5 relative w-fit font-semibold whitespace-nowrap">
        상품 관리
      </div>
      <div className="flex-col py-0 flex items-center relative self-stretch w-full h-auto flex-[0_0_auto]">
        {menuList.map((menu) => (
          <AsideItem
            key={menu}
            name={menu}
            isSelected={selectedMenu === menu}
            onClick={() => setSelectedMenu(menu)}
          />
        ))}
      </div>
    </div>
  );
};
