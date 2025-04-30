import { SignupContent, SignupHeader } from '@/components/signup';
import { SignupProvider } from '@/contexts/signup/SignupContext';

export const SignupPage = () => {
  return (
    <SignupProvider>
      <section className="flex flex-col w-full h-full items-center">
        <section className="flex flex-col gap-8 p-8 w-[40rem]">
          <SignupHeader />
          <SignupContent />
        </section>
      </section>
    </SignupProvider>
  );
};
export default SignupPage;
