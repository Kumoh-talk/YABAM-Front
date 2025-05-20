import clsx from 'clsx';
import { Button, InputForm } from '@/components/common';
import { useInputs } from '@/hooks';

export interface Props {
  onClose?: () => void;
  onSubmit?: (form: { name: string; price: number }) => Promise<boolean>;
  isSubmitting?: boolean;
}

export const CustomOrderPanel = (props: Props) => {
  const [form, onChange] = useInputs({
    name: '',
    price: 0,
  });

  const onClickSubmit = async () => {
    const isSubmited = await props.onSubmit?.(form);
    console.log('isSubmited', isSubmited);
    if (isSubmited) {
      props.onClose?.();
    }
  };

  return (
    <section className="flex flex-col w-full h-fit p-4 gap-8">
      <h1 className="text-xl leading-none">커스텀 주문</h1>
      <InputForm label="이름">
        <input
          className="w-full px-4 py-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent rounded-md"
          type="text"
          name="name"
          placeholder="메뉴 이름"
          value={form.name}
          onChange={onChange}
        />
      </InputForm>
      <InputForm label="가격">
        <div className="flex flex-row items-center gap-2">
          <input
            className="w-full px-4 py-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent rounded-md remove-arrow"
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
          />
          <span className="">원</span>
        </div>
      </InputForm>
      <div className="flex gap-4 justify-end">
        <Button
          color="tertiary"
          className={clsx('px-8 py-3 justify-center', {
            'opacity-50 cursor-not-allowed': props.isSubmitting,
          })}
          onClick={props.onClose}
        >
          취소
        </Button>
        <Button
          className={clsx('px-8 py-3 justify-center', {
            'opacity-50 cursor-not-allowed': props.isSubmitting,
          })}
          onClick={onClickSubmit}
        >
          {props.isSubmitting ? '추가 중...' : '추가'}
        </Button>
      </div>
    </section>
  );
};
