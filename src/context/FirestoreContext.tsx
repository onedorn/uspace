import React, { createContext, useContext } from 'react';
import { firestore } from '../firebase/config';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useStatus } from './StatusContext';

interface FirestoreContextType {
  getDocument: (colName: string, docId: string) => Promise<any>;
  setDocument: (colName: string, docId: string, data: any) => Promise<void>;
  updateDocument: (colName: string, docId: string, data: any) => Promise<void>;
  deleteDocument: (colName: string, docId: string) => Promise<void>;
}

const FirestoreContext = createContext<FirestoreContextType | null>(null);

export const FirestoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setLoading, setAlert } = useStatus(); // Use a status context to handle loading states and alerts

  const getDocument = async (colName: string, docId: string) => {
    try {
      setLoading(true);
      const docRef = doc(firestore, colName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      setAlert('Failed to fetch document.', 'error');
      console.error('Error fetching document:', error);
    } finally {
      setLoading(false);
    }
  };

  const setDocument = async (colName: string, docId: string, data: any) => {
    try {
      setLoading(true);
      const docRef = doc(firestore, colName, docId);
      await setDoc(docRef, data);
    } catch (error) {
      setAlert('Failed to set document.', 'error');
      console.error('Error setting document:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (colName: string, docId: string, data: any) => {
    try {
      setLoading(true);
      const docRef = doc(firestore, colName, docId);
      await updateDoc(docRef, data);
    } catch (error) {
      setAlert('Failed to update document.', 'error');
      console.error('Error updating document:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (colName: string, docId: string) => {
    try {
      setLoading(true);
      const docRef = doc(firestore, colName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      setAlert('Failed to delete document.', 'error');
      console.error('Error deleting document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FirestoreContext.Provider
      value={{
        getDocument,
        setDocument,
        updateDocument,
        deleteDocument,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }
  return context;
};
