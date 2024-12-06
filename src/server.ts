// import express from 'express';
var express = require("express");
const bodyParser = require('body-parser');
import http from 'http';

import { Server } from 'socket.io';
const  dotenv = require('dotenv');
dotenv.config(); 
const cookieParser = require('cookie-parser');
var sequelize = require('../config/db');
const authRoutes = require('../routes/authRoutes');
import broadcastRoutes from "../routes/broadcastRoutes";
// Import the io instance

const server =express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


server.use(express.json());
server.use(cookieParser());
const chatserver = http.createServer(server);


// Use the broadcast routes
server.use("/api", broadcastRoutes);

// Setup Socket.IO


const PORT = 3000;
server.use('/api/auth', authRoutes);





sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err:any) => console.error('Error connecting to the database:', err));
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/auth/login`);
});



// import { initializeWebSocket } from './controllers/chatController';

// import { Server } from 'socket.io';


// const io = new Server(httpServer);



// Routes


// WebSocket
// initializeWebSocket(io);

// Database connection



