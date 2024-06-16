const express = require("express");
const { createUser, findUser } = require("../dbservice");
const { generateToken } = require("../utils/token");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser(email, password);
  console.log(user);
  if (user) {
    const token = generateToken({ email });
    console.log(token);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = await createUser(email, password);
  if (user) {
    const token = generateToken({ email });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
