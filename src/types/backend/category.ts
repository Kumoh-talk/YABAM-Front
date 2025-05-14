export type CategoryResponse = {
  menuCategoryId: number;
  menuCategoryName: string;
  menuCategoryOrder: number;
};

export type CategoryListResponse = CategoryResponse[];

export type CategoryCreateDto = {
  menuCategoryName: string;
  menuCategoryOrder: number;
};

export type CategoryCreateResponse = {
  menuCategoryId: number;
};

export type CategoryUpdateOrderDto = {
  menuCategoryOrder: number;
};

export type CategoryUpdateNameDto = {
  menuCategoryName: string;
};

export type CategoryUpdateResponse = CategoryCreateResponse; 