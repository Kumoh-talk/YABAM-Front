import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { CommonProvider } from './contexts/common/CommonContext.tsx';
import { StoreProvider } from './contexts/store/StoreContext.tsx';
import { TableProvider } from './contexts/table/TableContext.tsx';
import { CategoryProvider } from './contexts/category/CategoryContext.tsx';
import { MenuProvider } from './contexts/menu/MenuContext.tsx';
import { OrderProvider } from './contexts/order/OrderContext.tsx';
import App from './App.tsx';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <CommonProvider>
          <StoreProvider>
            <TableProvider>
              <CategoryProvider>
                <MenuProvider>
                  <OrderProvider>
                    <App />
                    <ToastContainer
                      position="bottom-right"
                      limit={5}
                      closeButton={false}
                      autoClose={4000}
                      hideProgressBar
                    />
                  </OrderProvider>
                </MenuProvider>
              </CategoryProvider>
            </TableProvider>
          </StoreProvider>
        </CommonProvider>
      </CookiesProvider>
    </BrowserRouter>
  </StrictMode>
);
