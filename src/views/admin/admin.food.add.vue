<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-red-600 mb-6">Tambah Makanan</h2>

      <div v-if="message" class="text-green-600 text-center font-semibold mb-4">{{ message }}</div>
      <div v-if="errorMessage" class="text-red-500 text-center font-semibold mb-4">{{ errorMessage }}</div>

      <form @submit.prevent="addFood" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-black-700">Nama:</label>
          <input 
            v-model="food.name" 
            type="text" 
            placeholder="Nama makanan" 
            required 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-black-700">Foto:</label>
          <input 
            type="file" 
            accept="image/*" 
            @change="handleFileUpload" 
            required 
            class="w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-gray-50"
          />
          <div v-if="food.photo" class="mt-3 flex justify-center">
            <img :src="food.photo" alt="Preview" class="w-32 h-32 object-cover rounded-md border border-gray-300 shadow-sm" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-black-700">Deskripsi:</label>
          <textarea 
            v-model="food.description" 
            placeholder="Deskripsi makanan" 
            required 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-black-700">Harga:</label>
          <input 
            v-model="food.price" 
            type="number" 
            placeholder="Harga makanan" 
            required 
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>

        <button 
          type="submit" 
          class="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Tambah
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const food = ref({
  name: "",
  photo: "",
  description: "",
  price: "",
});

const message = ref("");
const errorMessage = ref("");

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      food.value.photo = reader.result; // Convert ke Base64
    };
    reader.onerror = () => {
      errorMessage.value = "Gagal membaca file!";
    };
  }
};

const addFood = async () => {
  try {
    if (!food.value.name || !food.value.photo || !food.value.description || !food.value.price) {
      errorMessage.value = "Semua bidang harus diisi!";
      return;
    }

    const token = localStorage.getItem("token");
    
    const response = await axios.post(
      "http://localhost:5050/food/add",
      food.value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    message.value = response.data.message;
    errorMessage.value = "";

    food.value = { name: "", photo: "", description: "", price: "" };
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Terjadi kesalahan server";
  }
};
</script>

<style scoped>
.food-dashboard {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}
label {
  display: block;
  margin-top: 10px;
}
input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 15px;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #218838;
}
.success {
  color: green;
  margin-bottom: 10px;
}
.error {
  color: red;
  margin-bottom: 10px;
}
.preview {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>