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
      foods: []
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5050/food/show");
      this.foods = response.data.data;
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  }
};
</script>

<style scoped>
</style>