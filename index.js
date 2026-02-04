require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT

app.get("/", (req, res) => {
  res.send("Welcome to my REST API");
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
