import { User, UserInfo, UserMetadata } from 'firebase/auth';
import { defaultTheme } from '../context/ThemeContext';
import { defaultLanguage } from '../context/LanguageContext';

/**
 * Maps a Firebase User object to a more comprehensive user data object.
 * @param {User} user - The Firebase User object.
 * @returns {Partial<User> & { preferences: { theme: string; language: string } }} - The mapped user object.
 */
function mapUserData(user: User): Partial<User> & { preferences: { theme: 'light' | 'dark'; language: string } } {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    isAnonymous: user.isAnonymous,
    tenantId: user.tenantId,
    metadata: {
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    } as UserMetadata,
    providerData: user.providerData.map((provider) => ({
      providerId: provider.providerId,
      uid: provider.uid,
      displayName: provider.displayName,
      email: provider.email,
      photoURL: provider.photoURL,
    })) as UserInfo[],
    preferences: {
      theme: defaultTheme,
      language: defaultLanguage,
    },
  };
}

export { mapUserData };
