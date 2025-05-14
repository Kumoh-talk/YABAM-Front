import { ProgressActivityIcon } from '@/assets/icon/ProgressActivityIcon';
import {
  Button,
  ImageInput,
  InputForm,
  LocationInput,
} from '@/components/common';
import {
  useSignupActions,
  useSignupValues,
} from '@/contexts/signup/SignupContext';
import { useStoreActions } from '@/contexts/store/StoreContext';
import { useInputs } from '@/hooks';
import { Store, User } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const SignupContent = () => {
  const { page } = useSignupValues();

  const pages = [
    <StoreInfoPage key={1} />,
    <FetchingPage key={2} />,
    <LastPage key={3} />,
  ];
  return <AnimatePresence mode="wait">{pages[page - 1]}</AnimatePresence>;
};

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="flex flex-col gap-8 w-full"
      initial={{ opacity: 0, x: 150 }}
      exit={{ opacity: 0, x: -150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.29, 0, 0.24, 0.99] }}
    >
      {children}
    </motion.div>
  );
};

const UserInfoPage = () => {
  const { nextPage, updateManager } = useSignupActions();
  const [form, onChange] = useInputs<Omit<User, 'id'>>({
    name: '',
    phone: '',
    department: '',
  });

  useEffect(() => {
    updateManager(form);
  }, [form]);

  return (
    <ContentContainer>
      <h3 className="text-xl px-4 font-medium">점주님에 대해 알려주세요.</h3>
      <InputForm label="이름">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="김금붕"
        />
      </InputForm>
      <InputForm label="전화번호">
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="-없이 숫자만"
        />
      </InputForm>
      <InputForm label="학과">
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={onChange}
          placeholder="컴퓨터공학전공"
        />
      </InputForm>
      <Button className="self-end" onClick={nextPage}>
        다음
      </Button>
    </ContentContainer>
  );
};

const StoreInfoPage = () => {
  const { nextPage, updateStore } = useSignupActions();
  const [form, onChange] = useInputs<Omit<Store, 'id'>>({
    name: '',
    description: '',
    logo: '',
    location: {
      latitude: 36.142043,
      longitude: 128.394253,
    },
    university: '',
    tableTime: 30,
    tableCost: 1000,
  });

  useEffect(() => {
    updateStore(form);
  }, [form]);

  return (
    <ContentContainer>
      <h3 className="text-xl px-4 font-medium">점포에 대해 알려주세요.</h3>
      <div className="flex flex-row gap-4">
        <InputForm label="점포 로고">
          <ImageInput name="logo" value={form.logo} onChange={onChange} />
        </InputForm>
        <div className="flex flex-col gap-4 w-0 flex-1">
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
      </div>
      <InputForm label="위치">
        <LocationInput
          className="w-full h-60"
          name="location"
          value={form.location}
          onChange={onChange}
        />
      </InputForm>
      <Button className="self-end" onClick={nextPage}>
        가입 완료하기
      </Button>
    </ContentContainer>
  );
};

const FetchingPage = () => {
  const { requestCreateStore } = useStoreActions();
  const { nextPage, prevPage } = useSignupActions();
  const { store } = useSignupValues();
  const [index, setIndex] = useState(0);
  const ellipsis = ['.', '..', '...'];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ellipsis.length);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      const isStoreCreated = await requestCreateStore(store);
      if (!isStoreCreated) {
        alert('점포 생성에 실패했습니다. 다시 시도해주세요.');
        prevPage();
        return;
      }
      nextPage();
    };
    _fetch();
  }, []);

  return (
    <ContentContainer>
      <div className="flex flex-col gap-4 items-center py-8">
        <ProgressActivityIcon className="fill-primary animate-spin size-24" />
        <span className="text-base font-medium">
          입력한 정보를 확인하는 중이에요{ellipsis[index]}
        </span>
      </div>
    </ContentContainer>
  );
};

const LastPage = () => {
  const { nextPage } = useSignupActions();
  return (
    <ContentContainer>
      <span className="text-xl font-medium leading-[1.4] px-4">
        이제 테이블이랑 메뉴를 등록하고,
        <br />
        손님 맞을 준비를 해보아요!
      </span>
      <Button href="/manage/product" onClick={nextPage}>
        점포에 메뉴 등록하러 가기
      </Button>
    </ContentContainer>
  );
};
