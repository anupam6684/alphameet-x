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
