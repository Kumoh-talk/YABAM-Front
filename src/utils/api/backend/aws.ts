import {
    PresignedUrlRequestDto,
    PresignedUrlResponseDto
} from '@/types/backend/aws';
import { api } from './common';

export const getPresignedUrl = async (dto: PresignedUrlRequestDto) => {
  console.log('Presigned URL 요청 데이터:', dto); // 디버깅용 로그
  const res = await api<PresignedUrlResponseDto>(
    '/yabam/api/v1/presigned-url',
    'POST',
    dto,
  );
    console.log('Presigned URL 응답 데이터:', res);
  if (res.success === 'true') {
    return res.data;
  }
  throw new Error('Presigned URL 발급 실패');
};

export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  try {
    const res = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    if (!res.ok) {
      throw new Error('이미지 업로드 실패');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};