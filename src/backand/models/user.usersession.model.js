import mongoose from '../database/database.js';

const { Schema, model } = mongoose;  

const userSessionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jwt_token: { type: String, required: true },
    issued_at: { type: Date, default: Date.now },
    expires_at: { type: Date, required: true },
    login_status: { type: Boolean, default: true }
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

export default UserSession;
