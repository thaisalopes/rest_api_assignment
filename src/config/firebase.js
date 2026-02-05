// Initializes the Firebase Admin SDK once and exports a shared database instance
// to be used across the application (controllers, routes, etc.)

const admin = require('firebase-admin');

// Prevents re-initializing the Firebase app when this file is imported multiple times
if (!admin.apps.length) {
  // Firebase credentials and database URL are provided via environment variables
  // (using applicationDefault credentials for local and deployed environments)
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.database();

module.exports = { admin, db };
