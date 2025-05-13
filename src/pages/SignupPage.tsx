import { SignupContent, SignupHeader } from '@/components/signup';
import { SignupProvider } from '@/contexts/signup/SignupContext';
import { useCheckLogin } from '@/hooks';
import { checkHasOwnStore } from '@/utils/functions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  useCheckLogin(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStore = async () => {
      try {
        if (await checkHasOwnStore()) {
          navigate('/main', { replace: true });
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkStore();
  }, []);

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
