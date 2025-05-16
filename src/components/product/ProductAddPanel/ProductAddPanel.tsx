import { CategorySelect } from '../CategorySelect/CategorySelect';
import { Button } from '../../common/Button/Button';
import { useState } from 'react';
import { useCategoryValues } from '@/contexts/category/CategoryContext';
import { useStoreValues } from '@/contexts/store/StoreContext';
import { useMenuActions, useMenuValues } from '@/contexts/menu/MenuContext';
import { MenuCreateDto } from '@/types/backend/menu';

interface Props {
  onClose?: () => void;
}

interface MenuForm {
  name: string;
  price: string;
  description: string;
}

export const ProductAddPanel = ({ onClose }: Props) => {
  const { categories } = useCategoryValues();
  const { store } = useStoreValues();
  const { createMenu } = useMenuActions();
  const { menus } = useMenuValues();
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? 0);
  const [form, setForm] = useState<MenuForm>({
    name: '',
    price: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.description) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const menuData: MenuCreateDto = {
        menuName: form.name,
        menuPrice: Number(form.price),
        menuDescription: form.description,
        menuImageUrl: 'https://example.com/image.jpg',
        menuIsSoldOut: false,
        menuIsRecommended: false,
        menuCategoryId: selectedCategoryId,
      };
      await createMenu(menuData);
      onClose?.();
    } catch (error) {
      console.error('메뉴 추가 실패:', error);
      alert('메뉴 추가에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-[40rem] h-full p-8 gap-8 border-2 bg-white border-gray-300 rounded-4xl justify-between">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl ">상품 추가</h1>
        <div className="flex flex-col gap-4">
          <div className="text-gray-800 px-4">카테고리</div>
          <CategorySelect selected={selectedCategoryId} onSelect={setSelectedCategoryId} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4">이름</div>
          <input 
            className="w-full px-4 py-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent rounded-md"
            type="text" 
            name="name"
            placeholder="메뉴 이름" 
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4">가격</div>
          <div className="relative">
            <input 
              className="w-full px-4 py-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent rounded-md remove-arrow" 
              type="number" 
              name="price"
              value={form.price}
              onChange={handleChange}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700">원</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4">설명</div>
          <textarea
            className="w-full px-4 py-2 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent rounded-md resize-none"
            name="description"
            placeholder="설명입니다"
            value={form.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Button 
          color="tertiary" 
          className={`px-8 py-3 justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onClose}
        >
          취소
        </Button>
        <Button 
          color="primary" 
          className={`px-8 py-3 justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSubmit}
        >
          {isSubmitting ? '추가 중...' : '추가'}
        </Button>
      </div>
    </div>
  );
};
