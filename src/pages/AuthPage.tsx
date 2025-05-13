import { useKakao } from '@/hooks/useKakao';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useKakao();

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
          navigate('/main', { replace: true });
        } else {
          alert('로그인에 실패했습니다.');
        }
      }
    };
    processLogin();
  }, [provider, code]);

  return <>로그인 중입니다..</>;
};
export default AuthPage;
