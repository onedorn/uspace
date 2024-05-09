// import * as admin from 'firebase-admin';
// import { pubsub } from 'firebase-functions';
// import { EventContext } from 'firebase-functions/lib/v1/cloud-functions';
//
// const { onRun } = pubsub.schedule('every 24 hours');
//
//
// export const cleanupOldEmails = onRun(async (context: EventContext): Promise<void> => {
//   const cutoffDate = new Date();
//   cutoffDate.setDate(cutoffDate.getDate() - 30); // Set to 30 days ago
//
//   const oldEmailsQuery = admin.firestore()
//     .collection('mail')
//     .where('timestamp', '<=', cutoffDate)
//     .limit(500); // Process in batches to stay within limits
//
//   const snapshot = await oldEmailsQuery.get();
//
//   // Batch delete operation
//   const batch = admin.firestore().batch();
//   snapshot.docs.forEach((doc) => batch.delete(doc.ref));
//
//   return batch.commit()
//     .then(() => console.log('Successfully deleted old email entries'))
//     .catch((error) => console.error('Failed to delete old emails:', error));
// });
