import Food from '../../models/food.model.js';

export async function addFood(req, res) {
    try {
        const { name, photo, description, price } = req.body;

        if (!name || !photo || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newFood = new Food({
            name,
            photo,
            description,
            price,
            ratings: [] 
        });

        await newFood.save();

        res.status(201).json({ message: "Food added successfully", food: newFood });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}