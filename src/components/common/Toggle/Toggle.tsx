import clsx from 'clsx';

export interface Props {
  isSelected: boolean;
  onToggle: () => void;
  color: 'primary' | 'secondary';
}

export const Toggle = (props: Props) => {
  const color = props.color === 'primary' ? 'bg-primary' : 'bg-secondary';
  return (
    <button
      onClick={props.onToggle}
      className={clsx(
        'transition-colors duration-300 cursor-pointer flex w-14 h-auto gap-2.5 p-1 rounded-full',
        {
          'justify-start bg-gray-300': !props.isSelected,
          'justify-end': props.isSelected,
          [color]: props.isSelected,
        },
      )}
    >
      <div className="w-6 h-6 bg-white rounded-full"></div>
    </button>
  );
};
