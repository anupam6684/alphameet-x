import MeetingParticipant from "../models/MeetingParticipant.js";

import { StatusCodes } from "http-status-codes";

const getmeetingParticipant = async (req, res) => {
  try {
    const { roomId } = req.params;

    const participants = await MeetingParticipant.find({ roomId }).sort({
      joinedAt: 1,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      participants,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export { getmeetingParticipant };
