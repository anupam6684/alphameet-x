import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.accesstoken;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;
