import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreError,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { createContext } from 'react';
import { useFirebase } from '../hooks/useFirebase';

interface FirestoreContextType {
  getDocument: (colName: string, docId: string) => Promise<DocumentData | undefined>;
  setDocument: (colName: string, docId: string, data: Record<string, any>) => Promise<void>;
  updateDocument: (colName: string, docId: string, data: Record<string, any>) => Promise<void>;
  deleteDocument: (colName: string, docId: string) => Promise<void>;
  getCollection: (colName: string) => Promise<DocumentData[]>;
  queryCollection: (colName: string, conditions: QueryConstraint[]) => Promise<DocumentData[]>;
}

export const FirestoreContext = createContext<FirestoreContextType | null>(null);

export const FirestoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const {firestore} = useFirebase();

  const getDocument = async (colName: string, docId: string): Promise<DocumentData | undefined> => {
    try {
      const docRef = doc(firestore, colName, docId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn(`Document with ID '${docId}' does not exist in collection '${colName}'.`);
      }

      return docSnap.data() as DocumentData;
    } catch (error) {
      throw new Error(`Failed to fetch document: ${(error as FirestoreError).message}`);
    }
  };

  const setDocument = async (colName: string, docId: string, data: Record<string, any>): Promise<void> => {
    try {
      const docRef = doc(firestore, colName, docId);
      await setDoc(docRef, data);
    } catch (error) {
      throw new Error(`Failed to set document in collection '${colName}': ${(error as FirestoreError).message}`);
    }
  };

  const updateDocument = async (colName: string, docId: string, data: Record<string, any>): Promise<void> => {
    try {
      const docRef = doc(firestore, colName, docId);
      await updateDoc(docRef, data);
    } catch (error) {
      throw new Error(`Failed to update document in collection '${colName}': ${(error as FirestoreError).message}`);
    }
  };

  const deleteDocument = async (colName: string, docId: string) => {
    try {
      const docRef = doc(firestore, colName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(`Failed to delete document from collection '${colName}': ${(error as FirestoreError).message}`);
    }
  };

  const getCollection = async (colName: string) => {
    try {
      const colRef = collection(firestore, colName);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(doc => doc.data() as DocumentData);
    } catch (error) {
      throw new Error(`Failed to fetch collection '${colName}': ${(error as FirestoreError).message}`);
    }
  };

  const queryCollection = async (colName: string, conditions: QueryConstraint[]) => {
    try {
      const colRef = collection(firestore, colName);
      const q = query(colRef, ...conditions);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data() as DocumentData);
    } catch (error) {
      throw new Error(`Failed to query collection '${colName}': ${(error as FirestoreError).message}`);
    }
  };

  return (
    <FirestoreContext.Provider
      value={{
        getDocument,
        setDocument,
        updateDocument,
        deleteDocument,
        getCollection,
        queryCollection,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

