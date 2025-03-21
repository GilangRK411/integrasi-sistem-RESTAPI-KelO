import Food from "../../models/food.model.js";
import Order from "../../models/food.order.model.js";
import User from "../../models/user.model.js";

export async function buyFood(req, res) {
    try {
        console.log("Request body:", req.body); 

        const { foodId, userId, quantity } = req.body;

        // Cek apakah data kosong atau tidak valid
        if (!foodId || !quantity || quantity < 1) {
            return res.status(400).json({ message: "Invalid input data", data: req.body });
        }

        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        const totalPrice = food.price * quantity;
        const orderData = { food: foodId, quantity, totalPrice };

        // Jika userId diberikan, coba cari user, tetapi jika tidak ditemukan, lanjutkan tanpa user
        if (userId) {
            const user = await User.findById(userId);
            if (user) {
                orderData.user = userId;
            } 
            // Kalau user tidak ditemukan, lanjutkan tanpa mengembalikan error
        }

        const order = new Order(orderData);
        await order.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
