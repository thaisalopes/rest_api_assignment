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

const expensesRef = () => db.ref('expenses');

exports.getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await getAll(expensesRef());
  return ok(res, expenses);
});

exports.createExpense = asyncHandler(async (req, res) => {
  const body = req.body || {};

  // Ensures at least one field is present in the request body
  if (Object.keys(body).length === 0) {
    return fail(res, 422, 'At least one expense field is required');
  }
  const expense = body;

  // Adds timestamp for creation
  expense.createdAt = Date.now();
  expense.updatedAt = Date.now();
  const created = await create(expensesRef(), expense);
  return ok(
    res,
    { message: 'Expense created successfully', expense: created },
    201
  );
});

exports.updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body || {};

  // Ensures at least one field is present in the request body
  if (Object.keys(body).length === 0) {
    return fail(res, 422, 'At least one expense field is required');
  }
  const existing = await getById(expensesRef(), id);
  if (!existing) {
    return fail(res, 404, 'Expense not found');
  }
  delete body.createdAt; // Prevents updates to createdAt
  const updates = body;

  //Adds timestamp for update
  updates.updatedAt = Date.now();
  const updated = await updateById(expensesRef(), id, updates);
  return ok(res, { message: 'Expense updated successfully', expense: updated });
});

exports.deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await removeById(expensesRef(), id);
  if (!deleted) {
    return fail(res, 404, 'Expense not found');
  }
  return ok(res, { message: 'Expense deleted' });
});
