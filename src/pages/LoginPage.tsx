import { Logo } from '@/assets/Logo';
import { LoginButton } from '@/components/login';

export const LoginPage = () => {
  const kakaoUriParams = new URLSearchParams({
    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
    redirect_uri: `${import.meta.env.VITE_BASE_URI}/auth/kakao`,
    response_type: 'code',
    scope: 'openid',
  });
  const kakaoUri = `https://kauth.kakao.com/oauth/authorize?${kakaoUriParams.toString()}`;

  return (
    <>
      <section className="flex flex-col w-full h-full justify-center items-center fixed z-1000 top-0 left-0">
        <img
          src="/images/login-bg.webp"
          className="size-full object-cover absolute top-0 left-0 z-100"
        />
        <div className="flex flex-col items-stretch gap-16 w-100 pb-4 z-100">
          <Logo className="w-40 fill-white self-center drop-shadow-[0_2px_4px_rgba(0,0,0,.8)]" />
          <div className="flex flex-col items-stretch gap-4">
            <LoginButton className="gap-3 bg-gray-300" href="/signup">
              <img src="/images/google.svg" alt="구글" />
              구글로 로그인
            </LoginButton>
            <LoginButton className="gap-1.5 bg-[#FEE500]" href={kakaoUri}>
              <img src="/images/kakaotalk.svg" alt="카카오톡" />
              카카오 계정으로 로그인
            </LoginButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
