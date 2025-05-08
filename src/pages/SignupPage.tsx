import { SignupContent, SignupHeader } from '@/components/signup';
import { SignupProvider } from '@/contexts/signup/SignupContext';
import { useCheckLogin } from '@/hooks';

export const SignupPage = () => {
  useCheckLogin(true);

  return (
    <SignupProvider>
      <section className="flex flex-col w-full h-full items-center overflow-y-auto">
        <section className="flex flex-col gap-8 p-8 w-[40rem]">
          <SignupHeader />
          <SignupContent />
        </section>
      </section>
    </SignupProvider>
  );
};
export default SignupPage;
