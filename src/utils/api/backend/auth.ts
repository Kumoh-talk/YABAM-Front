import { LoginProvider, LoginResponse } from '@/types/backend/auth';
import { KakaoIdToken } from '@/types/kakao';
import { jwtDecode } from 'jwt-decode';
import { api } from './common';

export const requestLogin = async (
  provider: LoginProvider,
  idToken: string,
) => {
  const token = jwtDecode<KakaoIdToken>(idToken);
  const res = await api<LoginResponse>('/auth/api/login', 'POST', {
    provider: provider,
    idToken,
    oauthId: token.sub,
    nonce: token.nonce,
  });
  if ('success' in res && res.success) {
    return res.data;
  }
  throw new Error('로그인 실패');
};

export const requestFakeLoginOwner = async () => {
  const res = await api<LoginResponse>('/auth/api/login/fake/owner', 'POST');
  if ('success' in res && res.success) {
    return res.data;
  }
  throw new Error('점포 주인 페이크 로그인 실패');
};

export const requestRefreshToken = async (
  accessToken: string,
  refreshToken: string,
) => {
  const res = await api<LoginResponse>('/gateway/api/v1/refresh', 'POST', {
    accessToken,
    refreshToken,
  });
  if ('success' in res && res.success) {
    return res.data;
  }
  throw new Error('토큰 갱신 실패');
};
