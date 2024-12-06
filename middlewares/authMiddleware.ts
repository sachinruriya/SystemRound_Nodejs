import { Request, Response, NextFunction } from 'express';
var jwt =  require('jsonwebtoken');
import User from '../models/User';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    if (typeof decoded !== 'object' || !decoded.id) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    
    const user = await User.findByPk(decoded.id);
    if (!user || user.sessionToken !== token) {
      return res.status(401).json({ message: 'Unauthorized: Invalid session' });
    }

    
    (req as any).user = user;

    next();
  } catch (error:any) {
    console.error('Authentication Error:', error.message);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
