<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-yellow-500 p-6">
    <div class="w-full max-w-4xl p-10 bg-white rounded-3xl shadow-2xl text-center transform hover:scale-105 transition duration-300">
      <h1 class="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">Welcome to Delicious Bites</h1>
      <p class="text-xl text-gray-700 mb-6 italic">Experience the taste of perfection with our exquisite dishes made from the freshest ingredients.</p>
      <img src="https://source.unsplash.com/800x400/?restaurant,food" alt="Restaurant Food" class="w-full rounded-2xl shadow-lg mb-6 border-4 border-red-500">
      
      <!-- Restaurant Facilities Section -->
      <div class="space-y-6">
        <div class="facility-item bg-gray-100 p-6 rounded-lg shadow-lg text-black">
          <h3 class="text-2xl font-semibold mb-4">Cozy Ambiance</h3>
          <p>Enjoy your meals in a warm and inviting atmosphere.</p>
        </div>

        <div class="facility-item bg-gray-100 p-6 rounded-lg shadow-lg text-black">
          <h3 class="text-2xl font-semibold mb-4">Free WiFi</h3>
          <p>Stay connected while enjoying your favorite dishes.</p>
        </div>

        <div class="facility-item bg-gray-100 p-6 rounded-lg shadow-lg text-black">
          <h3 class="text-2xl font-semibold mb-4">Spacious Parking</h3>
          <p>Ample parking space available for all our guests.</p>
        </div>
      </div>

      <div class="flex justify-center space-x-6 mt-6">
        <button class="px-8 py-3 bg-red-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-red-700 transform hover:scale-110 transition duration-300">View Menu</button>
        <button class="px-8 py-3 bg-yellow-400 text-gray-800 font-semibold text-lg rounded-full shadow-lg hover:bg-yellow-500 transform hover:scale-110 transition duration-300">Reserve a Table</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.facility-item {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.facility-item h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.facility-item p {
  font-size: 16px;
  color: #555;
}
</style>
