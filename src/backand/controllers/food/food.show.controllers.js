import Food from "../../models/food.model.js";
import Rating from "../../models/food.rating.model.js"; // Pastikan model Rating diimport

export async function showFood(req, res) {
    try {
        const foods = await Food.find()
            .populate("ratings") // Ambil semua rating terkait
            .lean(); // Mengubah hasil query menjadi objek JSON biasa

        // Pastikan setiap makanan memiliki `_id`
        const formattedFoods = foods.map(food => ({
            _id: food._id, // Pastikan ID tersedia
            name: food.name,
            photo: food.photo,
            description: food.description,
            price: food.price,
            ratings: food.ratings,
            averageRating: food.ratings.length > 0 
                ? Number((food.ratings.reduce((sum, r) => sum + r.value, 0) / food.ratings.length).toFixed(1))
                : 0
        }));

        res.status(200).json({ success: true, data: formattedFoods });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}
