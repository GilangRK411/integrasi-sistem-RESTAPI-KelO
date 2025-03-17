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

          <!-- Tombol Edit dan Delete -->
          <div class="flex justify-between mt-4">
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

    <!-- Modal Edit -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold text-red-600 mb-4">Edit Food</h2>

        <label class="block text-left font-semibold">Name:</label>
        <input v-model="editFood.name" type="text" class="w-full border p-2 rounded mb-2" placeholder="Enter food name">

        <label class="block text-left font-semibold">Photo:</label>
        <input type="file" @change="convertToBase64" class="w-full border p-2 rounded mb-2">
        <img v-if="editFood.photo" :src="editFood.photo" alt="Preview" class="w-full h-32 object-cover mt-2 rounded">

        <label class="block text-left font-semibold">Description:</label>
        <textarea v-model="editFood.description" class="w-full border p-2 rounded mb-2" placeholder="Enter description"></textarea>

        <label class="block text-left font-semibold">Price:</label>
        <input v-model="editFood.price" type="number" class="w-full border p-2 rounded mb-2" placeholder="Enter price">

        <div class="flex justify-end space-x-2 mt-4">
          <button @click="showEditModal = false" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Cancel
          </button>
          <button @click="updateFood" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Save
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
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5050/food/show", {
          headers: { Authorization: `Bearer ${token}` }
        });
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
