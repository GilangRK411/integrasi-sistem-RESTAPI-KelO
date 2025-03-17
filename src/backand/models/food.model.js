import mongoose from '../database/database.js';

const { Schema, model } = mongoose;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: "Rating"
    }]
});

const Food = model("Food", foodSchema);

export default Food;
