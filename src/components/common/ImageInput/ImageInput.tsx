import { ImageRounded } from '@mui/icons-material';
import { InputChangeHandler } from '@/hooks/useInputs';
import clsx from 'clsx';

export interface Props {
  className?: string;
  name?: string;
  onChange?: InputChangeHandler<string>;
  value?: string;
}

export const ImageInput = (props: Props) => {
  const loadImage = (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const img = e.target.result as string;
          props.onChange?.({ target: { name: props.name ?? '', value: img } });
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {}
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files[0]) {
      loadImage(files[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      loadImage(files[0]);
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-col p-4 justify-center items-center rounded-lg border border-gray-500 bg-gray-300 text-text-secondary leading-none text-[3.25rem] size-[8.5rem] text-center relative cursor-pointer',
        props.className,
      )}
    >
      <ImageRounded fontSize="inherit" />
      <span className="text-sm">여기를 클릭하거나 끌어다 놓으세요</span>
      {props.value && (
        <img
          src={props.value}
          alt="preview"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      )}
      <input
        onDrop={onDrop}
        onChange={onChange}
        type="file"
        className="absolute top-0 left-0 w-full h-full select-none opacity-0 cursor-pointer text-[0px]"
      />
    </div>
  );
};
