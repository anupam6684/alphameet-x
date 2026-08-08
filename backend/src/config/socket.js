import { Server } from "socket.io";
import cors from "cors";

let io;

export const connectToSocket = (server) => {
  io = new Server(
    server,
    //     {
    //     cors: {
    //       origin: process.env.CLIENT_URL,
    //       methods: ["GET", "POST"],
    //     },
    //   }
  );

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }

  return io;
};
