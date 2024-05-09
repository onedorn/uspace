import React, { createContext, useContext, useState } from 'react';
import {
  AuthProvider as FirebaseAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  linkWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  unlink,
  updateEmail,
  updatePassword,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { useStatus } from './StatusContext';
import { defaultTheme, useTheme } from './ThemeContext';
import { defaultLanguage, useLanguage } from './LanguageContext';
import { useFirestore } from './FirestoreContext';
import { auth } from '../firebase/config';
import { FirebaseError } from 'firebase/app';

interface AuthContextType {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  createUser: (email: string, password: string) => void;
  signInUser: (email: string, password: string) => void;
  signOutUser: () => void;
  updateUserProfile: (updates: { displayName?: string; photoURL?: string }) => void;
  updateUserEmail: (newEmail: string) => void;
  deleteUserAccount: () => void;
  updateUserPassword: (newPassword: string) => void;
  signInUserWithPopup: (provider: FirebaseAuthProvider) => void;
  triggerPasswordResetEmail: (email: string) => void;
  triggerEmailVerification: () => void;
  linkProviderWithPopup: (provider: FirebaseAuthProvider) => void;
  unlinkProvider: (providerId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { setLoading, setAlert } = useStatus();
  const { setTheme } = useTheme();
  const { setLanguage } = useLanguage();
  const { getDocument, updateDocument, deleteDocument } = useFirestore();

  const createUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await createUserWithEmailAndPassword(auth, email, password);
      setAlert('Verification email sent. Please check your inbox.', 'success');
    } catch (error) {
      setLoading(false);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      // setLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
      setTheme(defaultTheme);
      setLanguage(defaultLanguage);
    } catch (error) {
      setLoading(false);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: any): Promise<void> => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser as FirebaseUser, updates);
      await updateDocument('users', (auth.currentUser as FirebaseUser).uid, updates);
      setUser({ ...user, ...updates });
      setAlert('Profile updated successfully.', 'success');
      console.log('Profile updated successfully.');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserEmail = async (newEmail: string): Promise<void> => {
    setLoading(true);
    try {
      const authUser = auth.currentUser as FirebaseUser;
      await updateEmail(authUser, newEmail);
      await updateDocument('users', authUser.uid, { email: newEmail });
      console.log('Email updated successfully.');
      setUser({ ...authUser, email: newEmail });
      setAlert('Email updated successfully.', 'success');
    } catch (error) {
      console.error('Failed to update email:', error);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async (): Promise<void> => {
    setLoading(true);
    try {
      const authUser = auth.currentUser as FirebaseUser;
      await deleteUser(authUser);
      await deleteDocument('users', authUser.uid);
      setAlert('User deleted successfully.', 'success');
      console.log('User deleted successfully.');
      // Additional clean up could go here (e.g., navigate, clear state)
    } catch (error) {
      console.error('Failed to delete user:', error);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserPassword = async (newPassword: string): Promise<void> => {
    setLoading(true);
    try {
      await updatePassword(auth.currentUser as FirebaseUser, newPassword);
      setAlert('Password updated successfully.', 'success');
      console.log('Password updated successfully.');
    } catch (error) {
      console.error('Failed to update password:', error);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const signInUserWithPopup = async (provider: FirebaseAuthProvider): Promise<void> => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, provider);
      setAlert('Logged in successfully!', 'success');
      console.log('Logged in successfully!', 'success');
    } catch (error) {
      console.error('Error signing in with popup:', error);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const triggerEmailVerification = async (): Promise<void> => {
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser as FirebaseUser);
      setAlert('Verification email sent. Please check your inbox.', 'success');
      console.log('Verification email sent. Please check your inbox.');
    } catch (error) {
      console.error('Failed to send verification email:', error);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const triggerPasswordResetEmail = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setAlert('Password reset email sent. Please check your inbox.', 'success');
      console.log('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const linkProviderWithPopup = async (provider: FirebaseAuthProvider): Promise<void> => {
    setLoading(true);
    try {
      const credentials = await linkWithPopup(auth.currentUser!, provider);
      const userData = await getDocument('users', credentials.user.uid);
      const userUpdated = { ...userData, providerData: credentials.user.providerData };

      await updateDocument('users', credentials.user.uid, userUpdated);

      setUser(userUpdated);
      setAlert('Provider linked successfully!', 'success');
      console.log('Provider linked:', credentials);
    } catch (error) {
      console.error('Error linking provider:', error);
      setAlert((error as FirebaseError).message, 'error');
      console.log('Provider linking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const unlinkProvider = async (providerId: string): Promise<void> => {
    setLoading(true);
    try {
      const credentials = await unlink(auth.currentUser!, providerId);
      const userData = await getDocument('users', credentials.uid);
      const userUpdated = { ...userData, providerData: credentials.providerData };

      await updateDocument('users', credentials.uid, userUpdated);

      setUser(userUpdated);
      setAlert('Provider unlinked successfully!', 'success');
      console.log('Provider unlinked:', credentials);
    } catch (error) {
      console.error('Error unlinking provider:', error);
      setAlert((error as FirebaseError).message, 'error');
      console.log('Provider unlinking error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        updateUserEmail,
        deleteUserAccount,
        updateUserPassword,
        signInUserWithPopup,
        triggerPasswordResetEmail,
        triggerEmailVerification,
        linkProviderWithPopup,
        unlinkProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
