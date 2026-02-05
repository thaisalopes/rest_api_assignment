const express = require('express');
const app = express();
const usersRoutes = require('./routes/users.routes');

// Parses incoming JSON request bodies
app.use(express.json());

// Internal health check – verifies Firebase Realtime Database connectivity
// Writes and reads a small value to confirm database access
// Used for testing purposes and commented out
// app.get('/health/firebase', async (req, res) => {
//  try {
//    await db.ref('healthcheck').set({ ok: true, time: Date.now() });
//    const snap = await db.ref('healthcheck').get();
//    res.json({ success: true, data: snap.val() });
//  } catch (err) {
//    res.status(500).json({ success: false, error: err.message });
//  }
//});

//ROOT Route
app.get('/', (req, res) => {
  res.json({
    message: 'REST API is running',
    endpoints: {
      users: '/users',
      expenses: '/expenses',
      income: '/income',
    },
  });
});

// Mounts user-related routes under /users
app.use('/users', usersRoutes);

// Global error handler middleware
// Preserves existing HTTP error status codes (if already set and not 200)
// and defaults to 500 for unexpected server errors, returning consistent JSON responses
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500).json({
      success: false,
      error: err.message || 'Server error',
    });
});

module.exports = app;
