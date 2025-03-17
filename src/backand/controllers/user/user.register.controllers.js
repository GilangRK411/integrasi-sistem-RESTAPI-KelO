import User from '../../models/user.model.js';

export async function register(req, res) {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    try {
        const existingUser = await User.findOne({ username }); 
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const existingEmail = await User.findOne({ email }); 
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const newUser = new User({
            username,
            email,
            password,  
            role: 'user'
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
