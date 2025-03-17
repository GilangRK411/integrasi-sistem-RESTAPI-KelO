// database.js
import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/integrasisistem');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

connectToDatabase();

export default mongoose;
