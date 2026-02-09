// Routes: maps HTTP endpoints to controller functions
// Keeps routing logic separate from business logic
const express = require('express');
const router = express.Router();
const {
  getAllIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} = require('../controllers/incomes.controller');

// Mounts route handlers for each endpoint
router.get('/', getAllIncomes);
router.post('/', createIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

module.exports = router;
