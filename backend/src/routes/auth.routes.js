import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller.js";
const authRoute = Router();

authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);
authRoute.post("/register", registerUser);
authRoute.post("/refresh", refreshAccessToken);

export default authRoute;
