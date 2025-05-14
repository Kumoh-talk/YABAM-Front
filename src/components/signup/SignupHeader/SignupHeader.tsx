import { useSignupValues } from '@/contexts/signup/SignupContext';
import { AnimatePresence, motion } from 'framer-motion';

export const SignupHeader = () => {
  const { page } = useSignupValues();

  const titles = [0, 1, 2, 3].map((_, index) => (
    <HeaderTitle key={index} page={index + 1} />
  ));
  return (
    <header className="flex flex-col gap-4 items-start w-full">
      <div className="w-full h-2 rounded-sm bg-gray-300">
        <motion.div
          className="h-full rounded-sm bg-primary"
          initial={{ width: '0%' }}
          animate={{
            width: ['33%', '66%', '100%', '100%'][page - 1],
          }}
          transition={{ duration: 1, ease: [0.17, 0.12, 0.07, 0.99] }}
        ></motion.div>
      </div>
      <div className="relative w-full h-[2.625rem]">
        <AnimatePresence>{titles[page - 1]}</AnimatePresence>
      </div>
    </header>
  );
};

const HeaderTitle = ({ page }: { page: number }) => {
  // const { manager } = useSignupValues();
  const titles = [
    '축제 준비, 지금부터 시작해볼까요?',
    // '잘하고 있어요. 계속해서 입력해 보아요.',
    '잠시만 기다려주세요.',
    `축하드려요, 점주님! 가입이 완료되었어요.`,
  ];
  return (
    <motion.h1
      className="text-3xl leading-[1.4] font-medium px-4 absolute w-full"
      initial={{ opacity: 0, x: 100 }}
      exit={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.17, 0.12, 0.07, 0.99] }}
    >
      {titles[page - 1]}
    </motion.h1>
  );
};
