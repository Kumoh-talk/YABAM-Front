export type PresignedUrlRequestDto = {
  storeId: number;
  imageProperty: 'STORE_HEAD' | 'STORE_DETAIL';
};

export type PresignedUrlResponseDto = {
  presignedUrl: string;
};