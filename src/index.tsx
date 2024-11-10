import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainProvider from './context/MainProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
);
