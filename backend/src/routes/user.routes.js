import { Router } from "express";
import userAuth from "../middleware/auth.middleware.js";
import { profile } from "../controllers/user.controller.js";
const userRoute = Router();

userRoute.get("/profile", userAuth, profile);

export default userRoute;
