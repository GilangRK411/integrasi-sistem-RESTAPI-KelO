<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-yellow-500 p-6">
    <div class="w-full max-w-4xl p-10 bg-white rounded-3xl shadow-2xl text-center transform hover:scale-105 transition duration-300">
      <h1 class="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">Our Delicious Menu</h1>
      <p class="text-xl text-gray-700 mb-6 italic">Discover a variety of mouth-watering dishes!</p>

      <div v-if="foods.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="food in foods" :key="food._id" class="p-4 bg-gray-100 rounded-xl shadow-md">
          <img :src="food.photo" :alt="food.name" class="w-full h-48 object-cover rounded-lg mb-4 border-4 border-red-500">
          <h2 class="text-2xl font-bold text-red-600">{{ food.name }}</h2>
          <p class="text-gray-700 mt-2">{{ food.description }}</p>
          <p class="text-lg font-semibold mt-2 text-green-700">Rp {{ food.price.toLocaleString() }}</p>
          
          <button @click="buyFood(food._id)" 
          class="mt-3 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
          Beli
          </button>

          <!-- Tampilkan Rating -->
          <div class="mt-3">
            <span v-for="star in 5" :key="star" 
                  @click="giveRating(food._id, star)" 
                  class="cursor-pointer text-2xl transition-transform transform hover:scale-125"
                  :class="{'text-yellow-500': star <= (userRatings[food._id] || food.averageRating || 0), 'text-gray-400': star > (userRatings[food._id] || food.averageRating || 0)}">
              ★
            </span>
          </div>

          <p class="text-gray-700 mt-1">
            Rata-rata rating: <span class="font-semibold">{{ food.averageRating ? food.averageRating.toFixed(1) : "Belum ada" }}</span>
          </p>
        </div>
      </div>

      <p v-else class="text-gray-700 mt-4">No food items available.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      foods: [],
      userRatings: {} 
    };
  },
  async created() {
    await this.fetchFoods();
  },
  methods: {
    async fetchFoods() {
      try {
        const foodResponse = await axios.get("http://localhost:5050/food/show");
        this.foods = foodResponse.data.data;

        // Ambil rata-rata rating untuk setiap makanan
        for (let food of this.foods) {
          const ratingResponse = await axios.get(`http://localhost:5050/food/ratings/${food._id}`);
          food.averageRating = ratingResponse.data.averageRating || 0;
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    },

    async giveRating(foodId, rating) {
      try {
        const response = await axios.post("http://localhost:5050/food/rating", {
          foodId,  // Sesuaikan dengan backend
          value: rating
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.status === 201) {
          this.$set(this.userRatings, foodId, rating);
          alert("Rating berhasil dikirim!");
          await this.fetchFoods(); // Refresh rating setelah submit
        }
      } catch (error) {
        console.error("Gagal mengirim rating:", error);
        alert("Terjadi kesalahan saat memberikan rating.");
      }
    },

    async buyFood(foodId) {
      try {
        const quantity = 1; // Bisa ubah ke input jumlah

        // Debug: Lihat data sebelum dikirim
        console.log("Mengirim data:", { foodId, userId: null, quantity });

        const response = await axios.post("http://localhost:5050/food/order", {
          foodId,
          userId: null, // Tidak perlu login
          quantity
        });

        console.log("Response:", response.data);

        if (response.status === 201) {
          alert("Pembelian berhasil!");
        }
      } catch (error) {
        console.error("Gagal membeli makanan:", error.response ? error.response.data : error);
        alert("Terjadi kesalahan saat membeli makanan.");
      }
    }
  }
};
</script>

<style scoped>
</style>
