import { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteStoreImage } from '@/utils/api/backend/store';

export interface Props {
  src: string;
  storeId: number;
  onDelete?: (url: string) => void;
}

export const StoreImageItem = ({ src, storeId, onDelete }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteStoreImage(storeId, src);
      onDelete?.(src);
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      toast.error('이미지 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative w-32 h-48 overflow-hidden rounded-lg border border-gray-500 group">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover outline-none"
      />
      <button
        className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? '삭제 중...' : '삭제'}
      </button>
    </div>
  );
};
