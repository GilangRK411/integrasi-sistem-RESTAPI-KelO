import Food from "../../models/food.model.js";
import  "../../models/food.rating.model.js";

export async function showFood(req, res) {
    try {
        const foods = await Food.find().populate("ratings");
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}