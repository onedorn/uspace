import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { UserRecord } from 'firebase-functions/lib/common/providers/identity';


export const sendWelcomeEmail = functions.auth.user().onCreate(async (user: UserRecord) => {
  try {
    await admin.firestore().collection('mail').add({
      to: [user.email],
      template: { name: 'subscribe' },
    });
    return console.log('Welcome email queued for sending.');
  } catch (error) {
    return console.error('Error queuing welcome email:', error);
  }
});

export const sendGoodbyeEmail = functions.auth.user().onDelete(async (user: functions.auth.UserRecord) => {
  try {
    await admin.firestore().collection('mail').add({
      to: [user.email],
      template: { name: 'unsubscribe' },
    });
    return console.log('Goodbye email queued for sending to:', user.email);
  } catch (error) {
    return console.error('Error queuing goodbye email:', error);
  }
});
