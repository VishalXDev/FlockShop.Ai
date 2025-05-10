// server/routes/auth.js
const express = require("express");
const router = express.Router();
const verifyFirebase = require("../middleware/firebaseAuth");

// Firebase handles actual login/signup on frontend
router.post("/login", (req, res) => {
  res.json({ message: "Mock login success (Firebase used on frontend)" });
});

// Optional: token verification endpoint
router.get("/verify", verifyFirebase, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
