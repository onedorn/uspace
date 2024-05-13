import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export const cleanupMailCollection = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 7); // Set the cutoff date to 7 days ago

  functions.logger.info('Running cleanup for emails older than:', { cutoffDate: cutoffDate.toISOString() });

  const oldEmailsQuery = admin.firestore()
    .collection('mail')
    .where('timestamp', '<=', cutoffDate)
    .limit(500); // Query up to 500 documents to prevent timeout and manage batch size

  try {
    const snapshot = await oldEmailsQuery.get();
    if (snapshot.empty) {
      functions.logger.info('No old emails found to delete.');
      return;
    }

    // Initialize batch operation
    const batch = admin.firestore().batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      functions.logger.info(`Scheduled deletion for document: ${doc.id}`); // Log each document being deleted
    });

    // Commit the batch operation
    await batch.commit();
    functions.logger.info(`Successfully deleted ${snapshot.docs.length} old email entries.`);
  } catch (error) {
    functions.logger.error('Failed to delete old emails:', error);
    throw new functions.https.HttpsError('internal', 'Failed to clean up old emails', error);
  }
});
