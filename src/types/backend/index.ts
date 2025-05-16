export type ApiResponse<T> = {
  success: 'true';
  data: T;
};

export type ApiError = {
  success: 'false';
  code: string;
  msg: string;
};
