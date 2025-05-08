import { fetchGetTokenKakao } from '@/utils/api/kakao';
import { useCookies } from 'react-cookie';

export const useKakao = () => {
  const [_, setCookies] = useCookies([
    'access_token',
    'refresh_token',
    'id_token',
  ]);

  const requestLogin = async (code: string): Promise<boolean> => {
    try {
      const res = await fetchGetTokenKakao(code as string);
      if ('error' in res) {
        console.error(res.error);
        return false;
      }

      setCookies('access_token', res.access_token, {
        path: '/',
        expires: new Date(Date.now() + res.expires_in * 1000),
      });
      setCookies('refresh_token', res.refresh_token, {
        path: '/',
        expires: new Date(Date.now() + res.refresh_token_expires_in * 1000),
      });
      setCookies('id_token', res.id_token, {
        path: '/',
        expires: new Date(Date.now() + res.refresh_token_expires_in * 1000),
      });
      return true;
    } catch (e) {
      console.error(e);
      // TODO: 로그인 에러 창 띄우기
    }
    return false;
  };

  return {
    requestLogin,
  };
};
