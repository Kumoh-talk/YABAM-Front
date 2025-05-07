import {
  Button,
  ImageInput,
  InputForm,
  LocationInput,
} from '@/components/common';
import { useInputs } from '@/hooks';
import { Store } from '@/types';

export const StorePage = () => {
  const [form, onChange] = useInputs<Omit<Store, 'id'>>({
    name: '',
    description: '',
    logo: '',
    location: {
      latitude: 36.142043,
      longitude: 128.394253,
    },
  });

  return (
    <section className="flex flex-col gap-8 w-full h-full p-8">
      <header className="w-full flex items-center justify-between">
        <div className="font-semibold text-2xl">점포 정보 수정</div>
        <Button>저장</Button>
      </header>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-[40rem]">
          <InputForm label="점포 이름">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="금오포차"
            />
          </InputForm>
          <InputForm label="소개글">
            <textarea
              className="h-24 resize-none"
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="점포를 자유롭게 소개해주세요. (200자 이내)"
              maxLength={200}
            />
          </InputForm>
        </div>
        <InputForm label="점포 로고">
          <ImageInput name="logo" value={form.logo} onChange={onChange} />
        </InputForm>
      </div>
      <InputForm label="테이블 사용료">
        <div className="flex flex-row gap-3 items-center leading-none font-medium">
          <input
            type="text"
            name="tableTime"
            value={form.tableTime}
            onChange={onChange}
            placeholder="30"
            className="w-16"
          />
          분마다
          <input
            type="number"
            name="tableCost"
            value={form.tableCost}
            onChange={onChange}
            placeholder="1000"
            className="w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          원
        </div>
      </InputForm>
      <InputForm label="위치">
        <LocationInput
          className="w-[36rem] h-60"
          name="location"
          value={form.location}
          onChange={onChange}
        />
      </InputForm>
    </section>
  );
};
export default StorePage;
