import { Router } from "express";

import { getMessages } from "../controllers/chat.controller.js";
const chatRoute = Router();

chatRoute.get("/:roomId", getMessages);

export default chatRoute;
