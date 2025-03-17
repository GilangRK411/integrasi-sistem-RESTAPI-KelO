import Rating from '../../models/food.rating.model.js';
import Food from '../../models/food.model.js';

export async function addRating(req, res) {
    try {
        const { foodId, value } = req.body; // Masih ambil dari req.body

        if (!foodId) {
            return res.status(400).json({ message: 'Food ID harus disertakan' });
        }

        if (value < 1 || value > 5) {
            return res.status(400).json({ message: 'Rating harus antara 1 hingga 5' });
        }

        // Cari makanan berdasarkan _id, bukan foodId
        const food = await Food.findById(foodId); // foodId harus berisi _id dari database
        if (!food) {
            return res.status(404).json({ message: 'Makanan tidak ditemukan' });
        }

        // Simpan rating ke database
        const rating = new Rating({ user: req.user._id, food: food._id, value }); // Pastikan food._id dipakai
        await rating.save();

        // Tambahkan rating ke makanan
        food.ratings.push(rating._id);
        await food.save();

        res.status(201).json({ message: 'Rating berhasil ditambahkan', rating });
    } catch (error) {
        console.error("Error saat menambahkan rating:", error);
        res.status(500).json({ message: 'Terjadi kesalahan', error });
    }
}


// Menghitung Rata-Rata Rating
export async function getFoodRatings(req, res) {
    try {
        const { foodId } = req.params;

        const food = await Food.findById(foodId).populate('ratings');
        if (!food) {
            return res.status(404).json({ message: 'Makanan tidak ditemukan' });
        }

        const ratings = food.ratings.map(r => r.value);
        const averageRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

        res.json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil rating', error });
    }
}
