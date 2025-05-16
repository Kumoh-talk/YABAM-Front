import { ApiError, ApiResponse } from '@/types/backend';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  };
  const accessToken = cookies.get('access_token');
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return headers;
};

export const api = async <T>(
  path: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: Record<string, string | number | boolean>,
): Promise<ApiResponse<T> | ApiError> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URI}${path}`, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    return (await res.json()) as ApiResponse<T> | ApiError;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return {
      success: 'false',
      code: 'UNKNOWN',
      msg: '네트워크 오류',
    } as ApiError;
  }
};
