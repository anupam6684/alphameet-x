// src/socket/index.js

import chatSocket from "./chat.socket.js";
import meetingSocket from "./meeting.socket.js";

const registerSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User Connected: ${socket.id}`);

    // Send welcome message when client connects
    socket.emit("welcome", {
      success: true,
      message: "Welcome to AlphaMeet X 🚀",
      socketId: socket.id,
    });

    // Test event
    socket.on("ping", (data) => {
      console.log("📩 Ping from Client:", data);

      socket.emit("pong", {
        success: true,
        message: "Pong from Server 🏓",
        receivedData: data,
      });
    });

    // Register Meeting Events
    meetingSocket(io, socket);

    // Register Chat Events
    chatSocket(io, socket);

    // Handle Errors
    socket.on("error", (error) => {
      console.error(`❌ Socket Error (${socket.id}):`, error);
    });

    // Disconnect
    socket.on("disconnect", (reason) => {
      console.log(`🔴 User Disconnected: ${socket.id}`);
      console.log(`Reason: ${reason}`);
    });
  });
};

export default registerSocketEvents;
