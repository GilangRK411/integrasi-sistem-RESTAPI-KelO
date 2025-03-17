import express from 'express';
import { login } from '../controllers/user/user.login.controllers.js'; 
import { register } from '../controllers/user/user.register.controllers.js'; 
import { getUserSession } from '../controllers/user/user.session.controllers.js';
const router = express.Router();

// LOGIN REGISET
router.post('/login', login);
router.post('/register', register);

// SESSION
router.get('/session', getUserSession);

export default router;
