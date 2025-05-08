import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const useCheckLogin = (isShouldLogin: boolean) => {
  const [cookies] = useCookies(['access_token', 'refresh_token', 'id_token']);
  const navigate = useNavigate();

  const isLogined =
    cookies.access_token && cookies.refresh_token && cookies.id_token;

  useEffect(() => {
    if (!isShouldLogin && isLogined) {
      navigate('/main', { replace: true });
    } else if (isShouldLogin && !isLogined) {
      navigate('/', { replace: true });
    }
  }, [cookies]);
};
