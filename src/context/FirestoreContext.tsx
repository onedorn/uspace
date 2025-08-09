import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreError,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  UpdateData,
  updateDoc,
} from 'firebase/firestore';
import React, { createContext } from 'react';
import { useFirebase } from '../hooks/useFirebase';

interface FirestoreContextType {
  getDocument: <T = DocumentData>(colName: string, docId: string) => Promise<T | undefined>;
  setDocument: <T extends Record<string, unknown>>(
    colName: string,
    docId: string,
    data: T
  ) => Promise<void>;
  updateDocument: <T extends Record<string, unknown>>(
    colName: string,
    docId: string,
    data: UpdateData<T>
  ) => Promise<void>;
  deleteDocument: (colName: string, docId: string) => Promise<void>;
  getCollection: <T = DocumentData>(colName: string) => Promise<T[]>;
  queryCollection: <T = DocumentData>(
    colName: string,
    conditions: QueryConstraint[]
  ) => Promise<T[]>;
}

export const FirestoreContext = createContext<FirestoreContextType | null>(null);

export const FirestoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { firestore } = useFirebase();

  const getDocument = async <T = DocumentData,>(
    colName: string,
    docId: string
  ): Promise<T | undefined> => {
    try {
      const docRef = doc(firestore, colName, docId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.warn(`Document with ID '${docId}' does not exist in collection '${colName}'.`);
      }

      return docSnap.data() as T;
    } catch (error) {
      throw new Error(`Failed to fetch document: ${(error as FirestoreError).message}`);
    }
  };

  const setDocument = async <T extends Record<string, unknown>>(
    colName: string,
    docId: string,
    data: T
  ): Promise<void> => {
    try {
      const docRef = doc(firestore, colName, docId);
      await setDoc(docRef, data);
    } catch (error) {
      throw new Error(
        `Failed to set document in collection '${colName}': ${(error as FirestoreError).message}`
      );
    }
  };

  const updateDocument = async <T extends Record<string, unknown>>(
    colName: string,
    docId: string,
    data: UpdateData<T>
  ): Promise<void> => {
    try {
      const docRef = doc(firestore, colName, docId) as DocumentReference<DocumentData, T>;
      await updateDoc(docRef, data);
    } catch (error) {
      throw new Error(
        `Failed to update document in collection '${colName}': ${(error as FirestoreError).message}`
      );
    }
  };

  const deleteDocument = async (colName: string, docId: string): Promise<void> => {
    try {
      const docRef = doc(firestore, colName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(
        `Failed to delete document from collection '${colName}': ${(error as FirestoreError).message}`
      );
    }
  };

  const getCollection = async <T = DocumentData,>(colName: string): Promise<T[]> => {
    try {
      const colRef = collection(firestore, colName);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      throw new Error(
        `Failed to fetch collection '${colName}': ${(error as FirestoreError).message}`
      );
    }
  };

  const queryCollection = async <T = DocumentData,>(
    colName: string,
    conditions: QueryConstraint[]
  ): Promise<T[]> => {
    try {
      const colRef = collection(firestore, colName);
      const q = query(colRef, ...conditions);
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      throw new Error(
        `Failed to query collection '${colName}': ${(error as FirestoreError).message}`
      );
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
