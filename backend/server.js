// Purpose: start the Express API server, connect to MongoDB, and register routes.

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const { authRouter, protectedRouter } = require("./routes/auth");

// Load environment variables before reading database or JWT settings.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const allowedOrigins = [
  "http://localhost:5173",
  "https://muhammad7839.github.io",
];

// Allow the local Vite frontend and deployed GitHub Pages app to call this API.
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Parse incoming JSON request bodies so route handlers can read req.body.
app.use(express.json());

// Register authentication routes and the protected demo route.
app.use("/api/auth", authRouter);
app.use("/api/protected", protectedRouter);

// A small health route helps confirm the server is running before testing auth.
app.get("/", (req, res) => {
  res.json({ message: "JWT authentication API is running." });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from environment variables.");
    }

    // Connect once at startup so route handlers can use Mongoose models safely.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
