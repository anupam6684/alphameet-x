import { Server, Socket } from "socket.io";
import cors from "cors";
import registerSocketEvents from "../sockets/index.js";

let io;

export const connectToSocket = (server) => {
  io = new Server(server);
  registerSocketEvents(io);

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }

  return io;
};
