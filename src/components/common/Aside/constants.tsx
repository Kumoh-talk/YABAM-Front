import {
  HomeRounded,
  ReceiptLongRounded,
  StoreRounded,
  QrCode2Rounded,
} from '@mui/icons-material';
import { Props as AsideItemProps } from './components/AsideItem/AsideItem';

export const list: AsideItemProps[] = [
  {
    name: 'POS 메인',
    icon: <HomeRounded />,
    to: '/main',
  },
  {
    name: '점포 관리',
    icon: <StoreRounded />,
    subItems: [
      {
        name: '기본 정보',
        to: '/manage/store',
      },
      {
        name: '메뉴',
        to: '/manage/product',
      },
      {
        name: '카테고리',
        to: '/manage/category',
      },
      {
        name: '테이블',
        to: '/manage/table',
      },
    ],
  },
  {
    name: '주문 내역 관리',
    icon: <ReceiptLongRounded />,
    to: '/history',
  },
  {
    name: '테이블 QR 코드 생성',
    icon: <QrCode2Rounded />,
    to: '/qrcode',
  },
];
