import { ApiError, ApiResponse } from '@/types/backend';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';

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
  body?: Record<string, string | number | boolean> | Array<Record<string, string | number | boolean>>
): Promise<ApiResponse<T> | ApiError> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URI}${path}`, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as ApiResponse<T> | ApiError;
    if (data.success === 'false') {
      toast.error(data.msg);
    }
    return data;
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
