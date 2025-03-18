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
          
          <button @click="openPopup(food)" 
            class="mt-3 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            Beli
          </button>

          <!-- Rating -->
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

    <!-- Popup -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Konfirmasi Pembelian</h2>
        <p class="text-lg text-black text-black-700">{{ selectedFood.name }}</p>
        <p class="text-md text-black text-black-500 mb-4">Harga per item: Rp {{ selectedFood.price.toLocaleString() }}</p>

        <label for="quantity" class="block text-md font-medium text-black text-black-700">Jumlah:</label>
        <input  type="number" id="quantity" v-model="selectedQuantity" min="1"
          class="w-full mt-2 px-3 py-2 border rounded-md text-center text-black focus:ring focus:ring-green-500">

        <p class="text-lg font-semibold text-green-700 mt-3">Total: Rp {{ totalPrice.toLocaleString() }}</p>

        <div class="flex justify-between mt-4">
          <button @click="closePopup"
            class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-black-500">
            Batal
          </button>
          <button @click="confirmPurchase"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Konfirmasi
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      foods: [],
      userRatings: {},
      showPopup: false,
      selectedFood: null,
      selectedQuantity: 1,
    };
  },
  computed: {
    totalPrice() {
      return this.selectedFood ? this.selectedFood.price * this.selectedQuantity : 0;
    }
  },
  async created() {
    await this.fetchFoods();
  },
  methods: {
    async fetchFoods() {
      try {
        const foodResponse = await axios.get("http://localhost:5050/food/show");
        this.foods = foodResponse.data.data;

        for (let food of this.foods) {
          const ratingResponse = await axios.get(`http://localhost:5050/food/ratings/${food._id}`);
          food.averageRating = ratingResponse.data.averageRating || 0;
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    },

    openPopup(food) {
      this.selectedFood = food;
      this.selectedQuantity = 1;
      this.showPopup = true;
    },

    closePopup() {
      this.showPopup = false;
    },

    async confirmPurchase() {
      try {
        const response = await axios.post("http://localhost:5050/food/order", {
          foodId: this.selectedFood._id,
          userId: null, 
          quantity: this.selectedQuantity
        });

        if (response.status === 201) {
          alert("Pembelian berhasil!");
          this.closePopup();
        }
      } catch (error) {
        console.error("Gagal membeli makanan:", error.response ? error.response.data : error);
        alert("Terjadi kesalahan saat membeli makanan.");
      }
    },

    async giveRating(foodId, rating) {
      try {
        const response = await axios.post("http://localhost:5050/food/rating", {
          foodId,
          value: rating
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.status === 201) {
          this.$set(this.userRatings, foodId, rating);
          alert("Rating berhasil dikirim!");
          await this.fetchFoods();
        }
      } catch (error) {
        console.error("Gagal mengirim rating:", error);
        alert("Terjadi kesalahan saat memberikan rating.");
      }
    }
  }
};
</script>

<style scoped>
</style>
