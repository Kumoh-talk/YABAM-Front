import { useState } from 'react';
import { deleteStoreImage } from '@/utils/api/backend/store';

export interface Props {
  src: string;
  storeId: number;
  onDelete?: (url: string) => void;
}

export const StoreImageItem = ({ src, storeId, onDelete }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteStoreImage(storeId, src);
      onDelete?.(src);
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      alert('이미지 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="relative w-32 h-48 overflow-hidden rounded-lg border border-gray-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover outline-none"
      />
      {isHovered && (
        <button
          className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
      )}
    </div>
  );
};
