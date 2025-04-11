import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Create a trigger that creates/updates an email index entry when a user is created/updated
exports.onUserWrite = functions.firestore
  .document("users/{userId}")
  .onWrite(async (change, context) => {
    const userId = context.params.userId;

    // If the document was deleted, remove the email index
    if (!change.after.exists) {
      const beforeData = change.before.data();
      if (beforeData && beforeData.email) {
        await db.collection("users_by_email").doc(beforeData.email).delete();
      }
      return;
    }

    const afterData = change.after.data();

    // If there's no email, we can't create an index
    if (!afterData || !afterData.email) {
      return;
    }

    // Create/update the email index
    await db.collection("users_by_email").doc(afterData.email).set({
      userId: userId,
      email: afterData.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // If the email changed, delete the old index
    if (change.before.exists) {
      const beforeData = change.before.data();
      if (
        beforeData &&
        beforeData.email &&
        beforeData.email !== afterData.email
      ) {
        await db.collection("users_by_email").doc(beforeData.email).delete();
      }
    }
  });
