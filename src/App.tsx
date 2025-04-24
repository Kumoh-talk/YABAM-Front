import { Route, Routes } from 'react-router-dom';
import { Aside, Header } from '@/components/common';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <div className="flex flex-col w-dvw h-dvh overflow-hidden">
      <Header />
      <div className="flex flex-row h-0 flex-1">
        <Aside />
        <div className="w-0 flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/manage/product" element={<ProductPage />} />
            <Route path="/manage/category" element={<CategoryPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
