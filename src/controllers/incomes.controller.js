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
const incomesRef = () => db.ref('incomes');

exports.getAllIncomes = asyncHandler(async (req, res) => {
  const incomes = await getAll(incomesRef());
  return ok(res, incomes);
});

exports.createIncome = asyncHandler(async (req, res) => {
  const body = req.body || {};
  // Ensures at least one field is present in the request body
  if (Object.keys(body).length === 0) {
    return fail(res, 422, 'At least one income field is required');
  }
  const income = body;

  // Adds timestamp for creation
  income.createdAt = Date.now();
  income.updatedAt = Date.now();
  const created = await create(incomesRef(), income);
  return ok(res, { message: 'Income created successfully', income: created }, 201);
});

exports.updateIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body || {};

  // Ensures at least one field is present in the request body
  if (Object.keys(body).length === 0) {
    return fail(res, 422, 'At least one income field is required');
  }
  const existing = await getById(incomesRef(), id);
  if (!existing) {
    return fail(res, 404, 'Income not found');
  }
  delete body.createdAt; // Prevents updates to createdAt
  const updates = body;
  
  //Adds timestamp for update
  updates.updatedAt = Date.now();
  const updated = await updateById(incomesRef(), id, updates);
  return ok(res, { message: 'Income updated successfully', income: updated });
});

exports.deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await removeById(incomesRef(), id);
  if (!deleted) {
    return fail(res, 404, 'Income not found');
  }
  return ok(res, { message: 'Income deleted' });
});
