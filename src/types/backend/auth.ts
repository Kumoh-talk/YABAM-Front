export type LoginProvider = 'KAKAO' | 'GOOGLE';
export type UserRole = 'ROLE_OWNER' | 'ROLE_USER';

export type AccessTokenJwt = {
  USER_ID: number;
  USER_NICKNAME: string;
  USER_ROLE: UserRole;
  iat: number;
  exp: number;
};

export type LoginRequestDto = {
  provider: LoginProvider;
  idToken: string;
  oauthId: string;
  nonce: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
