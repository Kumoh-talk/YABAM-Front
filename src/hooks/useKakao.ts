import { toast } from 'react-toastify';
import { AccessTokenJwt } from '@/types/backend/auth';
import { requestLogin } from '@/utils/api/backend/auth';
import { fetchGetTokenKakao } from '@/utils/api/kakao';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

export const useKakao = () => {
  const [_, setCookies] = useCookies([
    'access_token',
    'refresh_token',
    'id_token',
  ]);

  const login = async (code: string): Promise<boolean> => {
    try {
      const res = await fetchGetTokenKakao(code as string);
      if ('error' in res) {
        console.error(res.error);
        return false;
      }

      const resLogin = await requestLogin('KAKAO', res.id_token as string);

      setCookies('id_token', res.id_token, {
        path: '/',
        expires: new Date(Date.now() + res.refresh_token_expires_in * 1000),
      });
      const parsed = jwtDecode<AccessTokenJwt>(resLogin.accessToken);
      setCookies('access_token', resLogin.accessToken, {
        path: '/',
        expires: new Date(parsed.exp * 1000),
      });
      setCookies('refresh_token', resLogin.refreshToken, {
        path: '/',
        expires: new Date(Date.now() + res.refresh_token_expires_in * 1000),
      });
      return true;
    } catch (e) {
      console.error(e);
      toast.error('로그인을 실패했습니다.');
    }
    return false;
  };

  return {
    login,
  };
};
