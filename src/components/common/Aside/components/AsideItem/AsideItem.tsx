import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  AsideSubItem,
  Props as AsideSubItemProps,
} from '../AsideSubItem/AsideSubItem';

export interface Props {
  icon: React.ReactNode;
  name: string;
  to?: string;
  subItems?: AsideSubItemProps[];
}

export const AsideItem = (props: Props) => {
  const location = useLocation();
  const isSelected = location.pathname === props.to;

  if (props.subItems) {
    return (
      <div className="flex flex-col w-full">
        <div
          className={clsx(
            'w-full flex flex-row items-center gap-3 px-3 py-2 text-base font-medium leading-none rounded-lg select-none',
          )}
        >
          {props.icon}
          {props.name}
        </div>
        {props.subItems.map((subItem, index) => (
          <AsideSubItem {...subItem} key={index} />
        ))}
      </div>
    );
  }

  return (
    <Link
      to={props.to!}
      className={clsx(
        'w-full flex flex-row items-center gap-3 px-3 py-2 text-base font-medium leading-none rounded-lg select-none hover:bg-gray-400',
        { 'text-primary bg-gray-400': isSelected },
      )}
    >
      {props.icon}
      {props.name}
    </Link>
  );
};
