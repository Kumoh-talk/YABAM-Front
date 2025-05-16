import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface Props {
  isSelected: boolean;
  onClick: () => void;
  color: 'primary' | 'secondary';
  size?: 'normal' | 'small';
}

export const Toggle = (props: Props) => {
  const color = props.color === 'primary' ? 'bg-primary' : 'bg-secondary';
  const size = props.size ?? 'normal';
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        'flex justify-start transition-colors duration-300 cursor-pointer rounded-full',
        {
          'bg-gray-500': !props.isSelected,
          [color]: props.isSelected,
          'w-14 p-1': size === 'normal',
          'w-9 p-[.125rem]': size === 'small',
        },
      )}
    >
      <motion.div
        className={clsx('bg-white rounded-full', {
          'size-6': size === 'normal',
          'size-4': size === 'small',
        })}
        animate={{
          x: props.isSelected ? '100%' : 0,
        }}
      ></motion.div>
    </button>
  );
};
