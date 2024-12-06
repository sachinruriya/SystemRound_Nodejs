
import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');
import User from '../models/User';
import {generateToken ,verifyToken}from '../auth/jwt';
var jwt = require('jsonwebtoken');
import { io } from '../config/socket';
export async function register(req: Request, res: Response, next: NextFunction) {

    // res.json({"data":req.body});
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    const saltRounds = 10; // Recommended salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ username, password: hashedPassword });

   
    return res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    next(error); 
  }
}


export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
      if (user.sessionToken) {
        // Emit a logout event to the previous session
        const previousSocketId = user.sessionToken;
        io.to(previousSocketId).emit('logout', { message: 'Logged out due to new login' });
      }
    const token = await generateToken(user.id);
    //  console.log()
    // res.json({"data":token})
    
    await user.update({ sessionToken: token });
  
    
 
    return res.cookie('jwt', token, { httpOnly: true }).json({ token:token,message: 'Login successful' });
  } catch (error) {
    next(error); 
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({ message: 'No active session found' });
    }

    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

   
    const user = await User.findByPk(decoded.id);

    if (user) {
     
      await user.update({ sessionToken: null });
    }

   
    return res.clearCookie('jwt').json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error); 
  }
}

// Exporting the functions using module.exports
// module.exports = { register, login, logout };
