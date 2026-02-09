// Load environment variables from .env file into process.env
require('dotenv').config();
const app = require('./app');

// Uses the port provided by the environment (or defaults to 3000 for local development)
const PORT = process.env.PORT || 3000;

// Starts the HTTP server and listens for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
