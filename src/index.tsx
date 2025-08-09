import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/i18n';
import './styles/index.css';
import MainProvider from './context/MainProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
);
