import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { AccessTokenJwt } from '@/types/backend/auth';
import {
  requestLogin,
  requestLogout,
  requestRefreshToken,
} from '@/utils/api/backend/auth';
import { fetchGetTokenKakao } from '@/utils/api/kakao';

export const useKakao = () => {
  const [cookies, setCookies, removeCookie] = useCookies([
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

  const _refreshToken = async () => {
    try {
      if (!cookies.access_token || !cookies.refresh_token) {
        return;
      }
      const res = await requestRefreshToken(
        cookies.access_token,
        cookies.refresh_token,
      );
      const parsed = jwtDecode<AccessTokenJwt>(res.accessToken);
      setCookies('access_token', res.accessToken, {
        path: '/',
        expires: new Date(parsed.exp * 1000),
      });
      setCookies('refresh_token', res.refreshToken, {
        path: '/',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    } catch (e) {
      console.error(e);
      toast.error('토큰 갱신을 실패했습니다.');
    }
  };

  const logout = async () => {
    try {
      await requestLogout();
      removeCookie('id_token', { path: '/' });
      removeCookie('access_token', { path: '/' });
      removeCookie('refresh_token', { path: '/' });
      return true;
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toast.error('로그아웃에 실패했습니다.');
      return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!cookies.access_token || !cookies.refresh_token) {
        return;
      }

      const parsed = jwtDecode<AccessTokenJwt>(cookies.access_token);
      const exp = parsed.exp * 1000;
      const remainedTime = exp - Date.now();

      if (remainedTime < 5 * 60 * 1000) {
        // 5분 남았을 때
        _refreshToken();
        return;
      }
    }, 5 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [cookies.access_token, cookies.refresh_token]);

  return {
    login,
    logout,
    accessToken: cookies.access_token,
    refreshToken: cookies.refresh_token,
  };
};
