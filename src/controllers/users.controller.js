const asyncHandler = require('express-async-handler');
const { db } = require('../config/firebase');
const { ok, fail } = require('../utils/controllerUtils');
const {
  getAll,
  create,
  getById,
  updateById,
  removeById,
} = require('../services/firebaseCrud');
const usersRef = () => db.ref('users');

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAll(usersRef());
  return ok(res, users);
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body || {};
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';

  // Validate required fields before writing to the database
  if (!trimmedName || !trimmedEmail) {
    return fail(res, 422, 'name and email are required');
  }

  // Creates a user object with the provided name and email, trimming any extra whitespace,
  // and adds a createdAt timestamp before saving it to the database
  const user = {
    name: trimmedName,
    email: trimmedEmail,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const created = await create(usersRef(), user);
  
  // If the user is successfully created, it sends a 201 Created response with a success message
  // and the created user data back to the client
  return ok(
    res,
    {
      message: 'User created successfully',
      user: created,
    },
    201
  );
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body || {};
  const existing = await getById(usersRef(), id);
  if (!existing) {
    return fail(res, 404, 'User not found');
  }

  // Whitelist fields that can be updated (createdAt is immutable)
  const allowedFields = ['name', 'email'];

  // Ensures at least one of the allowed fields is present in the request body
  const hasAny = allowedFields.some((f) => body[f] !== undefined);
  if (!hasAny) {
    return fail(
      res,
      422,
      `At least one of the following fields is required: ${allowedFields.join(', ')}`
    );
  }
  const updates = {};

  // Validates and processes each allowed field if it is present in the request body,
  // trimming whitespace and ensuring fields are not empty
  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      const value = String(body[field]).trim();
      if (value === '') {
        return fail(res, 422, `${field} cannot be empty`);
      }
      updates[field] = value;
    }
  });

  //Adds timestamp for update
  updates.updatedAt = Date.now();
  const updated = await updateById(usersRef(), id, updates);
  return ok(res, {
    message: 'User updated successfully',
    user: updated,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await removeById(usersRef(), id);
  if (!deleted) {
    return fail(res, 404, 'User not found');
  }
  return ok(res, { message: 'User deleted' });
});
