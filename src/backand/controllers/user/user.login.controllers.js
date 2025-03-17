import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';
import UserSession from '../../models/user.usersession.model.js';

dotenv.config();

export async function login(req, res) {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ message: 'Username/email and password are required' });
    }

    try {
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(404).json({ message: 'Username/email not found' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        let session = await UserSession.findOne({ user_id: user._id });
        if (session) {
            session.jwt_token = token;
            session.expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
            session.login_status = true;
        } else {
            session = new UserSession({
                user_id: user._id,
                jwt_token: token,
                expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
                login_status: true
            });
        }

        await session.save();

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            role: user.role 
        });

    } catch (error) {
        console.error('Database Query Error:', error);
        return res.status(500).json({ message: 'An error occurred on the server' });
    }
}