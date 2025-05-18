export type PresignedUrlRequestDto = {
  storeId: number;
  imageProperty: 'STORE_HEAD' | 'STORE_DETAIL' | 'MENU_IMAGE';
};

export type PresignedUrlResponseDto = {
  presignedUrl: string;
};