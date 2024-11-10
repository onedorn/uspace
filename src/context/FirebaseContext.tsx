import React, { createContext } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Database, getDatabase } from 'firebase/database';
import { Functions, getFunctions } from 'firebase/functions';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { getMessaging, Messaging } from 'firebase/messaging';
import { options } from '../firebase/config';

interface FirebaseContextType {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  database: Database;
  functions: Functions;
  storage: FirebaseStorage;
  analytics: Analytics;
  messaging: Messaging;
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const app = initializeApp(options);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const database = getDatabase(app);
  const functions = getFunctions(app);
  const storage = getStorage(app);
  const analytics = getAnalytics(app);
  const messaging = getMessaging(app);

  return (
    <FirebaseContext.Provider value={{
      app,
      auth,
      firestore,
      database,
      functions,
      storage,
      analytics,
      messaging,
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

