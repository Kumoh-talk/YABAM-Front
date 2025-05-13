import { useKakao } from '@/hooks/useKakao';
import { checkHasOwnStore } from '@/utils/functions';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

  return <>로그인 중입니다..</>;
};
export default AuthPage;
