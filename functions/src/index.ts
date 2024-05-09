import * as admin from 'firebase-admin';
import { sendGoodbyeEmail } from './userManagment';

admin.initializeApp();

export { sendGoodbyeEmail };
