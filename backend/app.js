//Express app
import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
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
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/meetings", meetingRoutes);

export default app;
