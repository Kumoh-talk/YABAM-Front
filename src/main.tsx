import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { CommonProvider } from './contexts/common/CommonContext.tsx';
import { StoreProvider } from './contexts/store/StoreContext.tsx';
import { CategoryProvider } from './contexts/category/CategoryContext.tsx';
import { MenuProvider } from './contexts/menu/MenuContext.tsx';
import App from './App.tsx';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <CommonProvider>
          <StoreProvider>
            <CategoryProvider>
              <MenuProvider>
                <App />
              </MenuProvider>
            </CategoryProvider>
          </StoreProvider>
        </CommonProvider>
      </CookiesProvider>
    </BrowserRouter>
  </StrictMode>,
);
