import UserSession from '../../models/user.usersession.model.js';

export const getUserSession = async (req, res) => {
  try {
    const { token } = req.headers; 

    const session = await UserSession.findOne({ jwt_token: token }).populate('user_id', 'username');

    if (!session) {
      return res.status(404).json({ message: 'Session not found or expired' });
    }

    return res.status(200).json({
      userId: session.user_id._id, 
      username: session.user_id.username,
      login_status: session.login_status,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

