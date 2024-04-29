import { User, UserInfo, UserMetadata } from 'firebase/auth';

/**
 * Maps a Firebase User object to a more comprehensive user data object.
 * @param {User} user - The Firebase User object.
 * @returns {object} - The mapped user object.
 */
function mapUserData(user: User): object {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    isAnonymous: user.isAnonymous,
    tenantId: user.tenantId,
    refreshToken: user.refreshToken,
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
  };
}

export { mapUserData };
