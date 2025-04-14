import { Route, Routes } from 'react-router-dom';
import ProductPage from './pages/product.page';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
