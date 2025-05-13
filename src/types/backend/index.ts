export type ApiResponse<T> = {
  success: boolean;
  data: T;
}

export type ApiError = {
  "timestamp": string,
  "status": 404 | 403 | 400 | 500,
  "error": string,
  "path": string
}