import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getMessages } from "../controllers/message.controller.js";
const router = express.Router();
router.get("/:id", protectRoute/*for verification of login */, getMessages);
router.post("/send/:id", protectRoute/*for verification of login */, sendMessage);

export default router;
