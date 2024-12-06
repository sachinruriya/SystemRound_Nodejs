import express from "express";
import { broadcastMessage } from "../controllers/broadcastController";
import { authenticateJWT } from "../middlewares/authenticateJWT"; 

const router = express.Router();


router.post("/broadcast", authenticateJWT, broadcastMessage);

export default router;
