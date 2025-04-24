import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface Props {
  isSelected: boolean;
  onClick: () => void;
  color: 'primary' | 'secondary';
}

export const Toggle = (props: Props) => {
  const color = props.color === 'primary' ? 'bg-primary' : 'bg-secondary';
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        'flex justify-start transition-colors duration-300 cursor-pointer w-14 p-1 rounded-full',
        {
          'bg-gray-500': !props.isSelected,
          [color]: props.isSelected,
        },
      )}
    >
      <motion.div
        className="size-6 bg-white rounded-full"
        animate={{
          x: props.isSelected ? '100%' : 0,
        }}
      ></motion.div>
    </button>
  );
};
