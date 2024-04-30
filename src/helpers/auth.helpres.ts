/**
 * Validates an email address and returns an error message if the validation fails.
 *
 * @param {string} email - The email address to validate.
 * @return {string} - Returns an empty string if the email is valid, otherwise returns an error message.
 */
const validateEmail = (email: string): string => {
  if (!email) {
    return '';
  }
  if (email.includes('..')) {
    return 'Email address cannot contain consecutive dots.';
  }
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return 'Email must be in a valid format (example@example.com).';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Email address cannot contain spaces.';
  }
  if (email.length > 254) {
    return 'Email address is too long.';
  }
  const [localPart, domain] = email.split('@');
  if (localPart.length > 64) {
    return 'Local part of the email address is too long.';
  }
  if (domain.length > 255) {
    return 'Domain of the email address is too long.';
  }
  if (!/^[\x21-\x7E]+$/.test(localPart)) {
    return 'Local part of the email contains invalid characters.';
  }
  if (!/^[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(domain)) {
    return 'Domain must be valid and have at least two characters.';
  }
  return '';
};

/**
 * Validates the password and returns an error message if invalid.
 *
 * @param {string} password - The email address to validate.
 * @return {string} - Returns an empty string if the password is valid, otherwise returns an error message.
 */
const validatePassword = (password: string): string => {
  if (!password) {
    return '';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character.';
  }
  return '';
};

export { validateEmail, validatePassword };
