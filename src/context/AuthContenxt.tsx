import React, { createContext, useEffect, useState } from 'react';
import {
  AuthError,
  AuthProvider as Provider,
  createUserWithEmailAndPassword,
  deleteUser,
  linkWithPopup,
  onAuthStateChanged,
  PopupRedirectResolver,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  unlink,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { useFirebase } from '../hooks/useFirebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  updateProfileInfo: (profile: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateEmailAddress: (newEmail: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  linkAccount: (provider: Provider, resolver?: PopupRedirectResolver) => Promise<UserCredential | undefined>;
  unlinkAccount: (providerId: string) => Promise<User | undefined>;
  deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {auth} = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(`Registration failed: ${(error as AuthError).message}`);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(`Login failed: ${(error as AuthError).message}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(`Logout failed: ${(error as AuthError).message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error(`Password reset failed: ${(error as AuthError).message}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (): Promise<void> => {
    if (user) {
      setLoading(true);
      try {
        await sendEmailVerification(user);
      } catch (error) {
        throw new Error(`Email verification failed: ${(error as AuthError).message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateProfileInfo = async (profile: { displayName?: string; photoURL?: string }): Promise<void> => {
    if (user) {
      setLoading(true);
      try {
        await updateProfile(user, profile);
      } catch (error) {
        throw new Error(`Profile update failed: ${(error as AuthError).message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateEmailAddress = async (newEmail: string): Promise<void> => {
    if (user) {
      setLoading(true);
      try {
        await updateEmail(user, newEmail);
      } catch (error) {
        throw new Error(`Email update failed: ${(error as AuthError).message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const changePassword = async (newPassword: string): Promise<void> => {
    if (user) {
      setLoading(true);
      try {
        await updatePassword(user, newPassword);
      } catch (error) {
        throw new Error(`Password update failed: ${(error as AuthError).message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const linkAccount = async (provider: Provider, resolver?: PopupRedirectResolver): Promise<UserCredential | undefined> => {
    if (user) {
      setLoading(true);
      try {
        return await linkWithPopup(user, provider, resolver);
      } catch (error) {
        throw new Error(`Account linking failed: ${(error as AuthError).message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const unlinkAccount = async (providerId: string): Promise<User | undefined> => {
    if (user) {
      setLoading(true);
      try {
        return await unlink(user, providerId);
      } catch (error) {
        throw new Error(`Account unlinking failed: ${(error as AuthError).message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteAccount = async (): Promise<void> => {
    if (user) {
      setLoading(true);
      try {
        await deleteUser(user);
      } catch (error) {
        throw new Error(`User account deletion failed: ${(error as AuthError).message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading,
        resetPassword,
        verifyEmail,
        updateProfileInfo,
        updateEmailAddress,
        changePassword,
        linkAccount,
        unlinkAccount,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
