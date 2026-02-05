const { db } = require('../config/firebase');

// imports async handler middleware
// asyncHandler wraps async route handlers so thrown errors
// are automatically passed to Express's global error handler
const asyncHandler = require('express-async-handler');

const ok = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });
const fail = (res, status, message) =>
  res.status(status).json({ success: false, error: message });
exports.getAllUsers = asyncHandler(async (req, res) => {
  // Fetches all users from Firebase Realtime Database
  const snapshot = await db.ref('users').get();

  // Firebase returns an object keyed by ID, not an array
  const usersObj = snapshot.val() || {};

  // Converts object into array for easier consumption by clients
  const users = Object.entries(usersObj).map(([id, user]) => ({
    id,
    ...user,
  }));
  return ok(res, users);
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // Validates required fields before writing to the database
  if (!name || !email) {
    res.status(400);
    throw new Error('name and email are required');
  }
  // creates a new child with a unique ID
  const newRef = db.ref('users').push();
  const user = {
    name: string(name).trim(),
    email: string(email).trim(),
    createdAt: Date.now(),
  };
  await newRef.set(user);
  return ok(res, { id: newRef.key, ...user }, 201);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return fail(res, 422, 'No update fields provided');
  }

  const ref = db.ref(`users/${id}`);
  const snapshot = await ref.get();

  if (!snapshot.exists()) {
    return fail(res, 404, 'User not found');
  }

  // Whitelists fields that can be updated, keeping createdAt field immutable
  const allowedUpdates = {};
  if (updates.name !== undefined) {
    allowedUpdates.name = updates.name;
  }
  if (updates.email !== undefined) {
    allowedUpdates.email = updates.email;
  }
  if (Object.keys(allowedUpdates).length === 0) {
    return fail(res, 422, 'No valid fields provided for update');
  }
  await ref.update(allowedUpdates);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ref = db.ref(`users/${id}`);
  const snapshot = await ref.get();
  if (!snapshot.exists()) {
    return fail(res, 404, 'User not found');
  }
  await ref.remove();
  return ok(res, { message: 'User deleted' });
});
