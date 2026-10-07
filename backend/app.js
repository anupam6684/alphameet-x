// Express app
import express from "express";
import cors from "cors";
import authRoute from "./src/routes/auth.routes.js";
import userRoute from "./src/routes/user.routes.js";
import chatRoute from "./src/routes/chat.routes.js";
import meetingRoute from "./src/routes/meeting.routes.js";

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
// user
app.use("/api/v1/user", userRoute);

// chat message
app.use("/api/v1/chat", chatRoute);

// meeeting
app.use("/api/v1/meeting", meetingRoute);
export default app;
