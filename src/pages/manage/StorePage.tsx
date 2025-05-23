import { useEffect } from 'react';
import {
  Button,
  ImageInput,
  InputForm,
  LocationInput,
  Toggle,
} from '@/components/common';
import { StoreImageItem } from '@/components/store';
import { useStoreActions, useStoreValues } from '@/contexts/store/StoreContext';
import { useCheckLogin, useInputs } from '@/hooks';
import { Store } from '@/types';

export const StorePage = () => {
  useCheckLogin(true);
  const { updateStore, openSale, closeSale } = useStoreActions();
  const { store, sale } = useStoreValues();
  const [form, onChange, _, update] = useInputs<Omit<Store, 'id'>>(store);

  useEffect(() => {
    update(store);
  }, [store]);

  return (
    <section className="flex flex-col gap-8 w-full h-full p-8 overflow-y-auto">
      <header className="w-full flex items-center justify-between">
        <div className="font-semibold text-2xl">점포 정보 수정</div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-4">
            <span className="font-medium">영업 시작</span>
            <Toggle
              color="primary"
              size="small"
              isSelected={!!sale}
              onClick={() => (sale ? closeSale() : openSale())}
            />
          </div>
          <Button onClick={() => updateStore(form)}>저장</Button>
        </div>
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
          <ImageInput
            name="logo"
            value={form.logo}
            onChange={onChange}
            storeId={store.id}
            imageProperty="STORE_HEAD"
          />
        </InputForm>
      </div>
      <InputForm label="위치">
        <LocationInput
          className="w-[36rem] h-60"
          name="location"
          value={form.location}
          onChange={onChange}
        />
      </InputForm>
      <InputForm label="소개 이미지">
        <ul className="flex flex-row gap-2">
          {store.detailImageUrls.map((url, index) => (
            <StoreImageItem
              key={index}
              src={url}
              storeId={store.id}
              onDelete={() => {
                updateStore({
                  detailImageUrls: store.detailImageUrls.filter(
                    (imageUrl) => imageUrl !== url,
                  ),
                });
              }}
            />
          ))}
          <ImageInput
            className="w-32 h-48"
            storeId={store.id}
            imageProperty="STORE_DETAIL"
          />
        </ul>
      </InputForm>
    </section>
  );
};
export default StorePage;
