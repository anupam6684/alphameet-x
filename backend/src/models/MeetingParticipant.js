import mongoose from "mongoose";

const MeetingParticipantSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    socketId: {
      type: String,
      required: true,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const MeetingParticipant = mongoose.model(
  "MeetingParticipant",
  MeetingParticipantSchema,
);

export default MeetingParticipant;
