import { Route, Routes } from 'react-router-dom';
import { Aside, Header } from '@/components/common';
import MainPage from './pages/MainPage';
import StorePage from './pages/manage/StorePage';
import ProductPage from './pages/manage/ProductPage';
import CategoryPage from './pages/manage/CategoryPage';
import TablePage from './pages/manage/TablePage';
import HistoryPage from './pages/HistoryPage';
import CouponPage from './pages/CouponPage';
import TestProduct from './pages/TestProduct';

function App() {
  return (
    <div className="flex flex-col w-dvw h-dvh overflow-hidden">
      <Header />
      <div className="flex flex-row h-0 flex-1">
        <Aside />
        <div className="w-0 flex-1">
          <Routes>
            <Route path="/manage/store" element={<StorePage />} />
            <Route path="/manage/product" element={<ProductPage />} />
            <Route path="/manage/category" element={<CategoryPage />} />
            <Route path="/manage/table" element={<TablePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/coupon" element={<CouponPage />} />
            <Route path="/test-product" element={<TestProduct />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
