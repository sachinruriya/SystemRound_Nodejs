import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});




// config/socket.ts
// import { Server } from 'socket.io';
import User from '../models/User';

// export const io = new Server(3000, { /* socket.io options */ });

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

 
  socket.on('setSession', (userId: number) => {
    
    User.update({ sessionToken: socket.id }, { where: { id: userId } });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  
    User.update({ sessionToken: null }, { where: { sessionToken: socket.id } });
  });
});
export { io, server };