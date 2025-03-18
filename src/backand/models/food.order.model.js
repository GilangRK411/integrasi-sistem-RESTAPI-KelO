import mongoose from '../database/database.js';

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = model("Order", orderSchema);

export default Order;
