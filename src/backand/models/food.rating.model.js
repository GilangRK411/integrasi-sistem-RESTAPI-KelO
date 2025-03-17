import mongoose from '../database/database.js';

const { Schema, model } = mongoose;

const ratingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
}, { timestamps: true });

const Rating = model("Rating", ratingSchema);

export default Rating;
