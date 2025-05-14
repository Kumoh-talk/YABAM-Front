import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProgressActivityIcon } from '@/assets/icon/ProgressActivityIcon';
import { useKakao } from '@/hooks/useKakao';
import { checkHasOwnStore } from '@/utils/functions';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useKakao();

  const isRequestedRef = useRef(false);
  const { provider } = useParams<{ provider: string }>();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const code = query.get('code');

  useEffect(() => {
    if (!code) {
      return;
    }

    const processLogin = async () => {
      if (provider === 'kakao') {
        const isLogined = await login(code);
        if (isLogined) {
          try {
            if (await checkHasOwnStore()) {
              navigate('/', { replace: true });
            } else {
              navigate('/signup', { replace: true });
            }
          } catch (e) {
            console.error(e);
            navigate('/signup', { replace: true });
          }
        } else {
          alert('로그인에 실패했습니다.');
        }
      }
    };
    if (!isRequestedRef.current) {
      processLogin();
      isRequestedRef.current = true;
    }
  }, [provider, code]);

  return (
    <section className="flex flex-col w-full h-full justify-center items-center fixed z-1000 top-0 left-0 bg-white select-none">
      <div className="flex flex-col gap-4 items-center py-8">
        <ProgressActivityIcon className="fill-primary animate-spin size-24" />
        <span className="text-xl font-medium">로그인 중..</span>
      </div>
    </section>
  );
};
export default AuthPage;
