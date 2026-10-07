import MeetingParticipant from "../models/MeetingParticipant.js";

const meetingSocket = (io, socket) => {
  // Join room
  socket.on("join-room", async ({ roomId, userId, userName }) => {
    try {
      socket.join(roomId);

      // Remove old participant record for this user in this room
      await MeetingParticipant.deleteMany({
        roomId,
        userId,
      });

      const participant = await MeetingParticipant.create({
        roomId,
        userId,
        userName,
        socketId: socket.id,
      });

      socket.to(roomId).emit("user-joined", {
        participant: {
          id: participant._id,
          userId: participant.userId,
          name: participant.userName,
          socketId: participant.socketId,
        },
      });
    } catch (error) {
      console.error("❌ Failed to join meeting:", error);
    }
  });

  // Leave room
  socket.on("leave-room", async ({ roomId }) => {
    try {
      const participant = await MeetingParticipant.findOneAndDelete({
        roomId,
        socketId: socket.id,
      });
      socket.leave(roomId);

      if (participant) {
        console.log(`🔴 ${participant.userName} left room ${roomId}`);
      }

      socket.to(roomId).emit("user-left", {
        participant: {
          id: participant._id,
          userId: participant.userId,
          userName: participant.userName,
          socketId: participant.socketId,
        },
      });
    } catch (error) {
      console.error("❌ Failed to leave meeting:", error);
    }
  });
};

export default meetingSocket;
