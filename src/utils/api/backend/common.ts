import { ApiError, ApiResponse } from "@/types/backend";

export const api = async <T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: Record<string, string | number | boolean>,
): Promise<ApiResponse<T> | ApiError> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URI}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return (await res.json()) as ApiResponse<T> | ApiError;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return {
      timestamp: new Date().toISOString(),
      status: 500,
      error: 'Internal Server Error',
      path,
    } as ApiError;
  }
};