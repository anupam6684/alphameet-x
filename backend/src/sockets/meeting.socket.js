const meetingSocket = (io, socket) => {
  // Join room
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);

    console.log(`${socket.id} joined ${roomId}`);

    socket.to(roomId).emit("user-joined", {
      userId: socket.id,
    });
  });

  // Leave room
  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);

    console.log(`${socket.id} left ${roomId}`);

    socket.to(roomId).emit("user-left", {
      userId: socket.id,
    });
  });
};

export default meetingSocket;
