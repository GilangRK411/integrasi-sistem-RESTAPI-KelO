import express from 'express';
import { authenticate } from '../middleware/user.authenticate.js';

const router = express.Router();

router.get('/user', authenticate, (req, res) => {
    return res.status(200).json({
        message: 'User authenticated',
        user: req.user,  
    });
});

export default router;
