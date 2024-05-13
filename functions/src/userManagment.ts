import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const sendGoodbyeEmail = functions.auth.user().onDelete(async (user: functions.auth.UserRecord) => {
  try {
    await admin.firestore().collection('mail').add({
      to: [user.email],
      template: {
        name: 'unsubscribe',
        data: {
          email: user.email,
          username: user.displayName || 'USpace student',
          deleteDate: new Date().toISOString(),
        },
      },
    });
    return console.log('Goodbye email queued for sending to:', user.email);
  } catch (error) {
    return console.error('Error queuing goodbye email:', error);
  }
});
