export type MenuCategoryInfo = {
  menuCategoryId: number;
  menuCategoryName: string;
  menuCategoryOrder: number;
};

export type MenuInfo = {
  menuId: number;
  menuOrder: number;
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImageUrl: string;
  menuIsSoldOut: boolean;
  menuIsRecommended: boolean;
};

export type MenuPageContent = {
  menuInfo: MenuInfo;
  menuCategoryInfo: MenuCategoryInfo;
};

export type MenuListResponse = {
  nextPage: boolean;
  pageSize: number;
  pageContents: MenuPageContent[];
};

export type MenuCreateDto = {
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImageUrl: string;
  menuIsRecommended: boolean;
  menuCategoryId: number;
  menuIsSoldOut: boolean;
};

export type MenuCreateResponse = {
  menuId: number;
};

export type MenuUpdateSoldOutDto = {
  menuIsSoldOut: boolean;
};

export type MenuUpdateOrderDto = {
  menuOrder: number;
};

export type MenuUpdateDetailDto = {
  menuName?: string;
  menuPrice?: number;
  menuDescription?: string;
  menuImageUrl?: string;
  menuIsRecommended?: boolean;
  menuIsSoldOut?: boolean;
  menuCategoryId?: number;
};

export type MenuUpdateResponse = MenuUpdateDetailDto;

export type MenuDetailResponse = MenuInfo;

export type MenuByCategoryResponse = {
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImageUrl: string;
  menuIsSoldOut: boolean;
  menuIsRecommended: boolean;
  menuCategoryId: number;
  menuOrder: number;
}[];
