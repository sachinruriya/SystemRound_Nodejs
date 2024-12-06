import { Request, Response } from "express";
import { io } from "../config/socket"; 

export const broadcastMessage = (req: Request, res: Response): void => {
  const { room, message } = req.body;
//   (req as any).user = user;


  if (!room || !message) {
    res.status(400).json({ error: "Room and message are required." });
    return;
  }

   
  io.to(room).emit("roomMessage", { room, message });

  res.status(200).json({ success: true, message: `Broadcasted to room: ${room} with ${message}` });
};
