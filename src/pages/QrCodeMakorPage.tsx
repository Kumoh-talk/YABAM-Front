import React, { useState } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useStore } from '@/hooks/useStore';
import { getTables } from '@/utils/api/backend/table';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QrCodeMakorPage = () => {
  const { store } = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateAndDownloadQRCodes = async () => {
    if (!store?.id) {
      toast.error('가게 ID를 확인하세요.');
      return;
    }

    setLoading(true);

    try {
      const tables = await getTables(store.id);

      if (!tables || tables.length === 0) {
        toast.warn('등록된 테이블이 없습니다.');
        return;
      }

      const zip = new JSZip();

      for (const table of tables) {
        const url = `${
          import.meta.env.VITE_USER_BASE_URI
        }/validate-table?tableid=${table.tableId}&storeid=${store.id}`;
        const qrCodeDataUrl = await QRCode.toDataURL(url);

        zip.file(
          `${table.tableNumber}번 테이블.png`,
          qrCodeDataUrl.split(',')[1],
          { base64: true },
        );
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, '테이블_QR_코드.zip');
      toast.success('QR 코드가 성공적으로 생성되었습니다!');
    } catch (error) {
      console.error('QR 코드 생성 실패:', error);
      toast.error('QR 코드 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">QR 코드 생성 및 다운로드</h1>
      <button
        onClick={handleGenerateAndDownloadQRCodes}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? '생성 중...' : 'QR 코드 다운로드'}
      </button>
    </div>
  );
};

export default QrCodeMakorPage;
