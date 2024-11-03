import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { FirebaseProvider } from './context/FirebaseContext';
import { FirestoreProvider } from './context/FirestoreContext';
import { StorageProvider } from './context/StorageContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseProvider>
      <FirestoreProvider>
        <StorageProvider>
          <App></App>
        </StorageProvider>
      </FirestoreProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
