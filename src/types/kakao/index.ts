export type KakaoAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: 'bearer';
};

export type KakaoErrorResponse = {
  error: string;
  error_code: string;
  error_description: string;
};

export type KakaoIdToken = {
  aud: string;
  sub: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  nonce: string;
};
