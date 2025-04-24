import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

export interface Props {
  name: string;
  to: string;
}

export const AsideSubItem = (props: Props) => {
  const location = useLocation();
  const isSelected = location.pathname === props.to;
  return (
    <Link
      to={props.to}
      className={clsx(
        'w-full flex flex-row items-center gap-3 pl-12 pr-3 py-2 text-sm font-medium leading-none rounded-lg select-none hover:bg-gray-400',
        { 'text-primary bg-gray-400': isSelected },
      )}
    >
      {props.name}
    </Link>
  );
};
