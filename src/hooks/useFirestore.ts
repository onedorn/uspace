import { useContext } from 'react';
import { FirestoreContext } from '../context/FirestoreContext';

export const useFirestore = () => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }
  return context;
};