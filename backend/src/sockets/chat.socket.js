import ChatMessage from "../models/Message.js";

const chatSocket = (io, socket) => {
  socket.on(
    "chat-message",
    async ({ roomId, message, senderId, senderName }) => {
      try {
        // Save message to MongoDB
        const chatMessage = await ChatMessage.create({
          roomId,
          senderId,
          senderName,
          message,
        });

        // Send saved message to everyone in the room
        io.to(roomId).emit("receive-message", {
          id: chatMessage._id,
          senderId: chatMessage.senderId,
          senderName: chatMessage.senderName,
          message: chatMessage.message,
          createdAt: chatMessage.createdAt,
        });
      } catch (error) {
        console.error("❌ Failed to save chat message:", error);

        socket.emit("chat-error", {
          message: "Failed to send message",
        });
      }
    },
  );
};

export default chatSocket;
