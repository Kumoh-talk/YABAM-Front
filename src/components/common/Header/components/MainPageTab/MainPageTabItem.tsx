import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export interface Props {
  name: string;
  to: string;
}

export const MainPageTabItem = (props: Props) => {
  const location = useLocation();
  const tab = new URLSearchParams(location.search).get('tab') ?? 'order';
  const isSelected = tab === props.to;

  return (
    <Link
      to={`/?${new URLSearchParams({ tab: props.to }).toString()}`}
      className={clsx(
        'flex flex-row p-1 rounded-lg text-base leading-none font-semibold w-max px-3 py-2',
        {
          'bg-gray-800': isSelected,
        },
      )}
    >
      {props.name}
    </Link>
  );
};
