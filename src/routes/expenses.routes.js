// Routes: maps HTTP endpoints to controller functions
// Keeps routing logic separate from business logic
const express = require('express');
const router = express.Router();
const {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenses.controller');

// Mounts route handlers for each endpoint
router.get('/', getAllExpenses);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
