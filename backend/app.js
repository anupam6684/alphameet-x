// Express app
import express from "express";
import cors from "cors";
import authRoute from "./src/routes/auth.routes.js";

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 AlphaMeet X Backend is running...",
  });
});

// API Routes
app.use("/api/v1/auth", authRoute);

export default app;
