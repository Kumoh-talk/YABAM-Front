import { KakaoAccessTokenResponse, KakaoErrorResponse } from '@/types/kakao';

export const fetchGetTokenKakao = async (code: string) => {
  const response = await fetch(`https://kauth.kakao.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: `${import.meta.env.VITE_BASE_URI}/auth/kakao`,
      code,
    }).toString(),
  });
  return response.json() as Promise<
    KakaoAccessTokenResponse | KakaoErrorResponse
  >;
};
