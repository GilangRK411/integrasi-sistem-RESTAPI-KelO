import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserSession from '../models/user.usersession.model.js';

dotenv.config();

export async function authenticate(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No token provided or invalid format' });
    }

    const token = authorizationHeader.split(' ')[1]?.trim();
    if (!token) {
        return res.status(403).json({ message: 'Invalid token format' });
    }

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined in environment variables');
        return res.status(500).json({ message: 'Internal server error' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const session = await UserSession.findOne({
            user_id: decoded.id,
            jwt_token: token,
            login_status: true,
        });

        if (!session) {
            return res.status(401).json({ message: 'Invalid token or session expired' });
        }

        if (new Date(session.expires_at).getTime() < Date.now()) {
            return res.status(401).json({ message: 'Token has expired' });
        }

        req.user = decoded; 
        next(); 
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
