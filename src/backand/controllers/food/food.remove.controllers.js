import Food from '../../models/food.model.js';

export async function removeFood(req, res) {
    try {
        const { id } = req.params;
        
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }
        
        await Food.findByIdAndDelete(id);
        
        return res.status(200).json({ message: "Food successfully removed" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}