import React, { createContext } from 'react';
import {
  deleteObject,
  getDownloadURL,
  ref,
  StorageError,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';
import { useFirebase } from '../hooks/useFirebase';

interface StorageContextType {
  uploadFile: (file: File, path: string) => Promise<UploadResult>;
  getFileUrl: (path: string) => Promise<string>;
  deleteFile: (path: string) => Promise<void>;
}

export const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storage } = useFirebase();

  const uploadFile = async (file: File, path: string): Promise<UploadResult> => {
    const fileRef = ref(storage, path);
    try {
      return await uploadBytes(fileRef, file);
    } catch (error) {
      throw new Error(`File upload failed: ${(error as StorageError).message}`);
    }
  };

  const getFileUrl = async (path: string): Promise<string> => {
    const fileRef = ref(storage, path);
    try {
      return await getDownloadURL(fileRef);
    } catch (error) {
      throw new Error(`Failed to get file URL: ${(error as StorageError).message}`);
    }
  };

  const deleteFile = async (path: string): Promise<void> => {
    const fileRef = ref(storage, path);
    try {
      await deleteObject(fileRef);
    } catch (error) {
      throw new Error(`Deletion failed: ${(error as StorageError).message}`);
    }
  };

  return (
    <StorageContext.Provider value={{ uploadFile, getFileUrl, deleteFile }}>
      {children}
    </StorageContext.Provider>
  );
};
