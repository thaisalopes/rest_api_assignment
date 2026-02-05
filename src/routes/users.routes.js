// Routes: maps HTTP endpoints to controller functions
// Keeps routing logic separate from business logic
const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
