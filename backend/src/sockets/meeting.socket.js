const meetingSocket = (io, socket) => {
  // create room socket
  socket.on("join-room", ({ roomId }) => {
    //create room 
    socket.join(roomId);

    console.log(`${socket.id} joined ${roomId}`);

    // Sends to everyone(only this RoomId) except the sender. 
    socket.to(roomId).emit("user-joined", {
      userId: socket.id,
    });
  });

  // leave room socket
  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);

    // Sends to everyone(only this RoomId) except the sender. 
    socket.to(roomId).emit("user-left", {
      userId: socket.id,
    });
  });
};

export default meetingSocket;
