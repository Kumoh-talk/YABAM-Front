import { ImageRounded } from '@mui/icons-material';
import { InputChangeHandler } from '@/hooks/useInputs';
import { getPresignedUrl, uploadImageToS3 } from '@/utils/api/backend/aws';
import { uploadStoreImage } from '@/utils/api/backend/store'; // 추가
import clsx from 'clsx';

export interface Props {
  className?: string;
  name?: string;
  onChange?: InputChangeHandler<string>;
  value?: string;
  storeId: number;
  imageProperty: 'STORE_HEAD' | 'STORE_DETAIL' | 'MENU_IMAGE';
}

export const ImageInput = (props: Props) => {
  const loadImage = async (file: File) => {
    try {
      // Presigned URL 요청
      const presignedUrlData = await getPresignedUrl({
        storeId: props.storeId,
        imageProperty: props.imageProperty,
      });

      // S3에 이미지 업로드
      await uploadImageToS3(presignedUrlData.presignedUrl, file);

      // 업로드된 이미지 URL
      const uploadedImageUrl = presignedUrlData.presignedUrl.split('?')[0];

      // 가게 상세 이미지 업로드 API 호출 (STORE_DETAIL일 경우만)
      if (props.imageProperty === 'STORE_DETAIL') {
        await uploadStoreImage(props.storeId, uploadedImageUrl);
      }

      // onChange로 업로드된 이미지 URL 전달
      props.onChange?.({
        target: { name: props.name ?? '', value: uploadedImageUrl },
      });
    } catch (err) {
      console.error('이미지 업로드 중 오류 발생:', err);
    }
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files && files[0]) {
      await loadImage(files[0]);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      await loadImage(files[0]);
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-col p-4 justify-center items-center rounded-lg border border-gray-500 bg-gray-300 text-text-secondary leading-none text-[3.25rem] size-[8.5rem] text-center relative cursor-pointer',
        props.className,
      )}
    >
      <ImageRounded fontSize="inherit" />
      <span className="text-sm">여기를 클릭하거나 끌어다 놓으세요</span>
      {props.value && (
        <img
          src={props.value}
          alt="preview"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      )}
      <input
        onDrop={onDrop}
        onChange={onChange}
        type="file"
        className="absolute top-0 left-0 w-full h-full select-none opacity-0 cursor-pointer text-[0px]"
      />
    </div>
  );
};
