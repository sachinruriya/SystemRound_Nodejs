var express = require('express');
//  { register, login, logout } = require('../controllers/authController');
import { authenticate } from '../middlewares/authMiddleware';
import { register, login, logout } from '../controllers/authController';

var router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout); 
module.exports = router;
