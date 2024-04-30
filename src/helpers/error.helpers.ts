/**
 * Retrieves a user-friendly error message based on the specific Firebase authentication error code.
 * This function maps various Firebase auth error codes to custom messages that can be displayed directly to end users.
 *
 * @param {string} errorCode - A string identifier for the Firebase auth error.
 * @returns {string} - A human-readable message describing the nature of the error.
 */
const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email address is badly formatted. Please check it and try again.';
    case 'auth/user-disabled':
      return 'This user has been disabled. Please contact support for help.';
    case 'auth/user-not-found':
      return 'No user found with this email. Please sign up first.';
    case 'auth/email-already-in-use':
      return 'This email is already in use by another account. Please use a different email.';
    case 'auth/weak-password':
      return 'The password is too weak. Please use a stronger password.';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed. Please contact support.';
    case 'auth/too-many-requests':
      return 'We have detected too many requests from your device. Please try again later.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials. Please try another sign-in method.';
    case 'auth/requires-recent-login':
      return 'This operation is sensitive and requires recent authentication. Log in again before retrying this request.';
    case 'auth/provider-already-linked':
      return 'This provider is already linked to your account.';
    case 'auth/credential-already-in-use':
      return 'This credential is already associated with a different user account.';
    case 'auth/invalid-credential':
      return 'The credential provided is malformed or has expired. Please try again with a new one.';
    case 'auth/wrong-password':
      return 'The password is invalid or the user does not have a password.';
    case 'auth/invalid-verification-code':
      return 'The verification code entered is incorrect. Please check and try again.';
    case 'auth/invalid-verification-id':
      return 'The verification ID used to create the phone auth credential is invalid.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

export { getErrorMessage };
