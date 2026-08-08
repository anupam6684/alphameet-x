import { createServer } from "node:http";

import app from "./app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";
import { connectToSocket } from "./src/config/socket.js";

const start = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Create HTTP Server
    const server = createServer(app);

    // Initialize Socket.IO
    const io = connectToSocket(server);

    io.on("connection", (socket) => {
      console.log(`🟢 User Connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`🔴 User Disconnected: ${socket.id}`);
      });
    });

    // Start Server
    server.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

start();
