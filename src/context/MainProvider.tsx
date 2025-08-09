import React from 'react';
import { FirebaseProvider } from './FirebaseContext';
import { FirestoreProvider } from './FirestoreContext';
import { StorageProvider } from './StorageContext';
import { FunctionsProvider } from './FunctionsContext';
import { AuthProvider } from './AuthContenxt';

const MainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FirebaseProvider>
    <FirestoreProvider>
      <StorageProvider>
        <FunctionsProvider>
          <AuthProvider>{children}</AuthProvider>
        </FunctionsProvider>
      </StorageProvider>
    </FirestoreProvider>
  </FirebaseProvider>
);

export default MainProvider;
