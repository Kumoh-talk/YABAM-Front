import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles.css';
import { CommonProvider } from './contexts/common/CommonContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CommonProvider>
        <App />
      </CommonProvider>
    </BrowserRouter>
  </StrictMode>,
);
