import { Router } from "express";

import { getmeetingParticipant } from "../controllers/meeting.controller.js";
const meetingRoute = Router();

meetingRoute.get("/participants/:roomId", getmeetingParticipant);

export default meetingRoute;
