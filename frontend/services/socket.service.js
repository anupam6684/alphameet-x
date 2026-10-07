"use client";

import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("🟢 Socket Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Socket Disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket Error:", error.message);
});

export default socket;
