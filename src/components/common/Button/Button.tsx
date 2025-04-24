import clsx from 'clsx';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'red'
  | 'black'
  | 'primary-transparent'
  | 'secondary-transparent'
  | 'tertiary-transparent'
  | 'red-transparent'
  | 'black-transparent';
export interface Props {
  className?: string;
  children?: React.ReactNode;
  color?: ButtonColor;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: Props) => {
  const color = props.color || 'primary';
  return (
    <button
      className={clsx(
        'flex flex-row items-center rounded-lg px-3 h-10 text-base leading-none font-medium cursor-pointer',
        props.className,
        {
          'bg-primary text-text-dark-primary': color === 'primary',
          'bg-secondary text-text-dark-primary': color === 'secondary',
          'bg-tertiary text-text-dark-primary': color === 'tertiary',
          'bg-red text-text-dark-primary': color === 'red',
          'bg-black text-text-dark-primary': color === 'black',
          'bg-transparent text-primary': color === 'primary-transparent',
          'bg-transparent text-secondary': color === 'secondary-transparent',
          'bg-transparent text-tertiary': color === 'tertiary-transparent',
          'bg-transparent text-red': color === 'red-transparent',
          'bg-transparent text-black': color === 'black-transparent',
        },
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
