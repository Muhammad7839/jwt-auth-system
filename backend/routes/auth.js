// Purpose: handle registration, login, and one protected route for JWT testing.

const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");

const authRouter = express.Router();
const protectedRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    // A salt round value of 10 is a common beginner-friendly bcrypt default.
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed." });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      token,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed." });
  }
});

protectedRouter.get("/", verifyToken, async (req, res) => {
  try {
    return res.status(200).json({
      message: `Welcome ${req.user.email}. You are viewing a protected route.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Protected route failed." });
  }
});

module.exports = {
  authRouter,
  protectedRouter,
};
