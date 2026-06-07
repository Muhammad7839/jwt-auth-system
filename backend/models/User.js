// Purpose: define the MongoDB user document shape used for authentication.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Email is unique so one account cannot be registered twice.
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  // This stores only the bcrypt hash, never the plain-text password.
  password: {
    type: String,
    required: true,
  },
  // createdAt records when the account was created.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

