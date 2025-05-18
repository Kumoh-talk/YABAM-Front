import {
  MystoreSelectResponse,
  StoreCreateDto,
  StoreCreateResponse,
  StoreSelectResponse,
  StoreUpdateDto,
  StoreUpdateResponse,
} from '@/types/backend/store';
import { api } from './common';

export const createStore = async (dto: StoreCreateDto) => {
  const res = await api<StoreCreateResponse>(
    '/yabam/api/v1/store',
    'POST',
    dto,
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('점포 생성 실패');
};

export const getMyStores = async () => {
  const res = await api<MystoreSelectResponse>(`/yabam/api/v1/mystore`, 'GET');
  if ('success' in res && res.success === 'true') {
    return res.data.storeInfoResponses;
  }
  throw new Error('내 점포 조회 실패');
};

export const getStore = async (storeId: number) => {
  const res = await api<StoreSelectResponse>(
    `/yabam/api/v1/store?storeId=${storeId}`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('점포 조회 실패');
};

export const updateStore = async (storeId: number, dto: StoreUpdateDto) => {
  const res = await api<StoreUpdateResponse>(
    `/yabam/api/v1/store?storeId=${storeId}`,
    'PATCH',
    dto,
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('점포 수정 실패');
};

export const uploadStoreImage = async (storeId: number, detailImageUrl: string) => {
  // 중복된 슬래시 제거
  const cleanedUrl = detailImageUrl.replace(/\/{2,}/g, '/');

  const res = await api(
    `/yabam/api/v1/store/image?storeId=${storeId}&detailImageUrl=${encodeURIComponent(cleanedUrl)}`,
    'POST',
  );

  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('가게 상세 이미지 업로드 실패');
};
