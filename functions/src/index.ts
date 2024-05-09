import * as admin from 'firebase-admin';
import { sendGoodbyeEmail, sendWelcomeEmail } from './userManagment';

admin.initializeApp();

export { sendWelcomeEmail, sendGoodbyeEmail };
