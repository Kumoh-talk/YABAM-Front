import clsx from 'clsx';
import { CommonLink } from '../CommonLink/CommonLink';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'red'
  | 'black'
  | 'white'
  | 'primary-transparent'
  | 'secondary-transparent'
  | 'tertiary-transparent'
  | 'red-transparent'
  | 'black-transparent'
  | 'white-transparent';
export interface Props {
  className?: string;
  href?: string;
  children?: React.ReactNode;
  color?: ButtonColor;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isNoPadding?: boolean;
}

export const Button = (props: Props) => {
  const color = props.color || 'primary';

  const className = clsx(
    'flex flex-row justify-center items-center rounded-lg text-base leading-none font-medium cursor-pointer',
    props.className,
    {
      'px-3 h-10': !props.isNoPadding,
      'bg-primary text-text-dark-primary': color === 'primary',
      'bg-secondary text-text-dark-primary': color === 'secondary',
      'bg-tertiary text-text-dark-primary': color === 'tertiary',
      'bg-red text-text-dark-primary': color === 'red',
      'bg-black text-text-dark-primary': color === 'black',
      'bg-white text-text-primary': color === 'white',
      'bg-transparent text-primary': color === 'primary-transparent',
      'bg-transparent text-secondary': color === 'secondary-transparent',
      'bg-transparent text-tertiary': color === 'tertiary-transparent',
      'bg-transparent text-red': color === 'red-transparent',
      'bg-transparent text-black': color === 'black-transparent',
      'bg-transparent text-white': color === 'white-transparent',
    },
  );

  if (props.href) {
    return (
      <CommonLink className={className} href={props.href}>
        {props.children}
      </CommonLink>
    );
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
