<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-yellow-500 p-6">
    <div class="w-full max-w-4xl p-10 bg-white rounded-3xl shadow-2xl text-center transform hover:scale-105 transition duration-300">
      <h1 class="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">Our Delicious Menu</h1>
      <p class="text-xl text-gray-700 mb-6 italic">Discover a variety of mouth-watering dishes!</p>

      <!-- Daftar makanan -->
      <div v-if="foods.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="food in foods" :key="food._id" class="p-4 bg-gray-100 rounded-xl shadow-md">
          <img :src="food.photo" :alt="food.name" class="w-full h-48 object-cover rounded-lg mb-4 border-4 border-red-500">
          <h2 class="text-2xl font-bold text-red-600">{{ food.name }}</h2>
          <p class="text-gray-700 mt-2">{{ food.description }}</p>
          <p class="text-lg font-semibold mt-2 text-green-700">Rp {{ food.price.toLocaleString() }}</p>

          <!-- Tombol Edit dan Delete di tengah -->
          <div class="flex justify-center gap-4 mt-4">
            <button 
              @click="openEditModal(food)" 
              class="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition">
              Edit
            </button>

            <button 
              @click="confirmDelete(food._id)" 
              class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Pesan jika tidak ada makanan -->
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
      showEditModal: false,
      editFood: {
        _id: "",
        name: "",
        photo: "",
        description: "",
        price: ""
      }
    };
  },
  async created() {
    this.fetchFoods();
  },
  methods: {
    async fetchFoods() {
      try {
        const response = await axios.get("http://localhost:5050/food/show");
        this.foods = response.data.data;
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    },

    openEditModal(food) {
      this.editFood = { ...food };
      this.showEditModal = true;
    },

    async updateFood() {
      try {
        const token = localStorage.getItem("token");

        // Hanya kirim data yang diubah
        const updateData = {};
        if (this.editFood.name) updateData.name = this.editFood.name;
        if (this.editFood.photo) updateData.photo = this.editFood.photo;
        if (this.editFood.description) updateData.description = this.editFood.description;
        if (this.editFood.price) updateData.price = this.editFood.price;

        await axios.put(`http://localhost:5050/food/update/${this.editFood._id}`, updateData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.showEditModal = false;
        this.fetchFoods(); 
      } catch (error) {
        console.error("Error updating food:", error);
      }
    },

    async deleteFood(foodId) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5050/food/remove/${foodId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.fetchFoods(); // Refresh daftar makanan setelah dihapus
      } catch (error) {
        console.error("Error deleting food:", error);
      }
    },

    confirmDelete(foodId) {
      if (confirm("Are you sure you want to delete this food?")) {
        this.deleteFood(foodId);
      }
    },

    convertToBase64(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.editFood.photo = reader.result;
        };
        reader.onerror = (error) => {
          console.error("Error converting image:", error);
        };
      }
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
