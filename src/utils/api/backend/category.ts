import {
  CategoryCreateDto,
  CategoryCreateResponse,
  CategoryListResponse,
  CategoryUpdateNameDto,
  CategoryUpdateOrderDto,
  CategoryUpdateResponse,
} from '@/types/backend/category';
import { api } from './common';

export const getCategories = async (storeId: number) => {
  const res = await api<CategoryListResponse>(`/yabam/api/v1/stores/${storeId}/menu-categories`, 'GET');
  if ('success' in res && res.success) {
    return res.data;
  }
  throw new Error('카테고리 목록 조회 실패');
};

export const createCategory = async (storeId: number, dto: CategoryCreateDto) => {
  const res = await api<CategoryCreateResponse>(`/yabam/api/v1/stores/${storeId}/menu-categories`, 'POST', dto);
  if ('success' in res && res.success) {
    return res.data;
  }
  throw new Error('카테고리 생성 실패');
};

export const updateCategoryOrder = async (storeId: number, menuCategoryId: number, dto: CategoryUpdateOrderDto) => {
  const res = await api<CategoryUpdateResponse>(
    `/yabam/api/v1/stores/${storeId}/menu-categories/${menuCategoryId}/order`,
    'PATCH',
    dto
  );
  if ('success' in res && res.success) {
    return res.data;
  }
  throw new Error('카테고리 순서 수정 실패');
};

export const updateCategoryName = async (storeId: number, menuCategoryId: number, dto: CategoryUpdateNameDto) => {
  const res = await api<CategoryUpdateResponse>(
    `/yabam/api/v1/stores/${storeId}/menu-categories/${menuCategoryId}/info`,
    'PATCH',
    dto
  );
  if ('success' in res && res.success) {
    return res.data;
  }
  throw new Error('카테고리 이름 수정 실패');
};

export const deleteCategory = async (storeId: number, menuCategoryId: number) => {
  const res = await api<void>(`/yabam/api/v1/stores/${storeId}/menu-categories/${menuCategoryId}`, 'DELETE');
  if ('success' in res && res.success) {
    return;
  }
  throw new Error('카테고리 삭제 실패');
};
