const chatSocket = (io, socket) => {
  socket.on("send-message", ({ roomId, message }) => {
    io.to(roomId).emit("receive-message", {
      sender: socket.id,
      message,
    });
  });
};

export default chatSocket;
