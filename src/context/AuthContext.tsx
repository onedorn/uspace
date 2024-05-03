import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import {
  AuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  linkWithPopup,
  onAuthStateChanged,
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
  User,
} from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  alert: { open: boolean; message: string; severity: 'error' | 'info' | 'success' | 'warning' };
  setAlert: (message: string, severity: 'error' | 'info' | 'success' | 'warning') => void;
  clearAlert: () => void;
  createUser: (email: string, password: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  signInUserWithPopup: (provider: AuthProvider) => Promise<void>;
  updateUserProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateUserEmail: (newEmail: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  deleteUserAccount: () => Promise<void>;
  triggerPasswordResetEmail: (email: string) => Promise<void>;
  linkProviderWithPopup: (provider: AuthProvider) => Promise<void>;
  unlinkProvider: (providerId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children, navigate }: { children: React.ReactNode; navigate: NavigateFunction }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlertState] = useState({ open: false, message: '', severity: 'info' as 'error' | 'info' | 'success' | 'warning' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      setLoading(false);

      if (currentUser) {
        if (!currentUser.emailVerified) {
          await signOut(auth);
          setUser(null);
          setAlert('Verification email sent. Please check your inbox.', 'success');
          console.log('User email not verified, logged out', currentUser);
        } else {
          setUser(currentUser);
          navigate('/student');
          console.log('User successfully logged in', currentUser);
        }
      } else {
        navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const setAlert = (message: string, severity: 'error' | 'info' | 'success' | 'warning'): void => {
    setAlertState({ open: true, message, severity });
  };

  const clearAlert = (): void => {
    setAlertState({ open: false, message: '', severity: 'info' });
  };

  const createUser = async (email: string, password: string): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser as User);
      setAlert('Verification email sent. Please check your inbox.', 'success');
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email: string, password: string): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await updateProfile(auth.currentUser as User, {
        displayName: updates.displayName,
        photoURL: updates.photoURL,
      });
      setUser({ ...(auth.currentUser as User), ...updates });
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserEmail = async (newEmail: string): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await updateEmail(auth.currentUser as User, newEmail);
      setUser({ ...(auth.currentUser as User), email: newEmail });
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUserPassword = async (newPassword: string): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await updatePassword(auth.currentUser as User, newPassword);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async (): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await deleteUser(auth.currentUser as User);
      setUser(null);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const triggerPasswordResetEmail = async (email: string): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setAlert('Password reset email sent. Please check your inbox.', 'success');
      setLoading(false);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const signInUserWithPopup = async (provider: AuthProvider): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const linkProviderWithPopup = async (provider: AuthProvider): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      const result = await linkWithPopup(auth.currentUser as User, provider);
      setUser(result.user);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const unlinkProvider = async (providerId: string): Promise<void> => {
    try {
      clearAlert();
      setLoading(true);
      const result = await unlink(auth.currentUser as User, providerId);
      setUser(result);
    } catch (error) {
      setAlert((error as FirebaseError).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        alert,
        setAlert,
        clearAlert,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        updateUserEmail,
        updateUserPassword,
        deleteUserAccount,
        triggerPasswordResetEmail,
        signInUserWithPopup,
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
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
