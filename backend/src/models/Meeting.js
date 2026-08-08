import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Meeting title is required"],
      trim: true,
      maxlength: 100,
    },

    roomId: {
      type: String,
      required: [true, "Room ID is required"],
      unique: true,
      trim: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Meeting host is required"],
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    meetingType: {
      type: String,
      enum: ["instant", "scheduled"],
      default: "instant",
    },

    status: {
      type: String,
      enum: ["waiting", "live", "ended", "cancelled"],
      default: "waiting",
    },

    scheduledFor: {
      type: Date,
      default: null,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    endedAt: {
      type: Date,
      default: null,
    },

    isPrivate: {
      type: Boolean,
      default: true,
    },

    meetingPassword: {
      type: String,
      default: null,
      select: false,
    },

    maxParticipants: {
      type: Number,
      default: 100,
      min: 2,
      max: 1000,
    },
  },
  {
    timestamps: true,
  },
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
