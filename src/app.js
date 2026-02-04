//imports express
const express = require("express");
const app = express();

app.use(express.json());

// Internal health check – verifies Firebase connectivity
app.get("/health/firebase", async (req, res) => {
  const { db } = require("./config/firebase");

  try {
    await db.ref("healthcheck").set({ ok: true, time: Date.now() });
    const snap = await db.ref("healthcheck").get();
    res.json({ success: true, data: snap.val() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Adds root route
app.get("/", (req, res) => {
  res.json({
    message: "REST API is running",
    endpoints: {
      users: "/users",
      expenses: "/expenses",
      income: "/income",
    },
  });
});


module.exports = app;
