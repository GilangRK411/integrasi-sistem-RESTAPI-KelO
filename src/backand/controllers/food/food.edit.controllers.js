import Food from '../../models/food.model.js';

export async function updateFood(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Update the food item
        const updatedFood = await Food.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!updatedFood) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(500).json({ message: 'Error updating food item', error: error.message });
    }
}
