import { Router } from "express";
const userRoute = Router();

userRoute.post("/login");
userRoute.post("/register");

export default userRoute;
