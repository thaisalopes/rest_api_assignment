const express = require('express');
const app = express();
const usersRoutes = require('./routes/users.routes');
const expensesRoutes = require('./routes/expenses.routes');
const incomesRoutes = require('./routes/incomes.routes');
const errorHandler = require('./middleware/errorHandler');

// Parses incoming JSON request bodies
app.use(express.json());

//ROOT Route
app.get('/', (_req, res) => {
  res.json({
    message: 'REST API is running',
    endpoints: {
      users: '/users',
      expenses: '/expenses',
      income: '/income',
    },
  });
});

// Mounts routes for users, expenses and income
app.use('/users', usersRoutes);
app.use('/expenses', expensesRoutes);
app.use('/income', incomesRoutes);

// Global error handler middleware
app.use(errorHandler);
module.exports = app;
