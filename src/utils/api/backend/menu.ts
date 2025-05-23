import {
  MenuListResponse,
  MenuCreateDto,
  MenuCreateResponse,
  MenuUpdateOrderDto,
  MenuUpdateDetailDto,
  MenuUpdateResponse,
  MenuDetailResponse,
  MenuByCategoryResponse,
} from '@/types/backend/menu';
import { api } from './common';

export const getMenus = async (storeId: number, pageSize: number = 200) => {
  const res = await api<MenuListResponse>(
    `/yabam/api/v1/stores/${storeId}/menus?pageSize=${pageSize}`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data.pageContents;
  }
  throw new Error('메뉴 목록 조회 실패');
};

export const getMenu = async (storeId: number, menuId: number) => {
  const res = await api<MenuDetailResponse>(
    `/yabam/api/v1/stores/${storeId}/menus/${menuId}`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('메뉴 상세 조회 실패');
};

export const createMenu = async (storeId: number, dto: MenuCreateDto) => {
  const res = await api<MenuCreateResponse>(
    `/yabam/api/v1/stores/${storeId}/menus`,
    'POST',
    dto,
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('메뉴 생성 실패');
};

export const updateMenuSoldOut = async (
  storeId: number,
  menuId: number,
  isSoldOut: boolean,
) => {
  const res = await api<MenuUpdateResponse>(
    `/yabam/api/v1/stores/${storeId}/menus/${menuId}/sold-out?isSoldOut=${isSoldOut}`,
    'PATCH',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('메뉴 매진 상태 수정 실패');
};

export const updateMenuOrder = async (
  storeId: number,
  menuId: number,
  dto: MenuUpdateOrderDto,
) => {
  const res = await api<MenuUpdateResponse>(
    `/yabam/api/v1/stores/${storeId}/menus/${menuId}/order`,
    'PATCH',
    dto,
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('메뉴 순서 수정 실패');
};

export const updateMenuDetail = async (
  storeId: number,
  menuId: number,
  dto: MenuUpdateDetailDto,
) => {
  const res = await api<MenuUpdateResponse>(
    `/yabam/api/v1/stores/${storeId}/menus/${menuId}/info`,
    'PATCH',
    dto,
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('메뉴 정보 수정 실패');
};

export const deleteMenu = async (storeId: number, menuId: number) => {
  const res = await api<void>(
    `/yabam/api/v1/stores/${storeId}/menus/${menuId}`,
    'DELETE',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('메뉴 삭제 실패');
};

export const getMenusByCategory = async (
  storeId: number,
  menuCategoryId: number,
) => {
  const res = await api<MenuByCategoryResponse>(
    `/yabam/api/v1/stores/${storeId}/menu-category/${menuCategoryId}/menus`,
    'GET',
  );
  if ('success' in res && res.success === 'true') {
    return res.data;
  }
  throw new Error('카테고리별 메뉴 조회 실패');
};
