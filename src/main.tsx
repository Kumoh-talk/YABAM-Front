import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CommonProvider } from './contexts/common/CommonContext.tsx';
import { StoreProvider } from './contexts/store/StoreContext.tsx';
import App from './App.tsx';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CommonProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </CommonProvider>
    </BrowserRouter>
  </StrictMode>,
);
