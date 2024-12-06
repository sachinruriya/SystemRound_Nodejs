import { Request, Response, NextFunction } from "express";
var jwt =  require('jsonwebtoken');


export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token is missing or invalid." });
    return; // Exit function after sending a response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ error: "Token is invalid or expired." });
    return; // Exit function after sending a response
  }
};
