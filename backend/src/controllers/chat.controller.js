import ChatMessage from "../models/Message.js";
import { StatusCodes } from "http-status-codes";

const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await ChatMessage.find({ roomId }).sort({ createdAt: 1 });

    return res.status(StatusCodes.OK).json({
      success: true,
      messages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export { getMessages };
