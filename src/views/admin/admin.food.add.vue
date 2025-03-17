<template>
    <div class="food-dashboard">
      <h2>Tambah Makanan</h2>
  
      <div v-if="message" class="success">{{ message }}</div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  
      <form @submit.prevent="addFood">
        <label>Nama:</label>
        <input v-model="food.name" type="text" placeholder="Nama makanan" required />
  
        <label>Foto:</label>
        <input type="file" accept="image/*" @change="handleFileUpload" required />
        <div v-if="food.photo">
          <img :src="food.photo" alt="Preview" class="preview" />
        </div>
  
        <label>Deskripsi:</label>
        <textarea v-model="food.description" placeholder="Deskripsi makanan" required></textarea>
  
        <label>Harga:</label>
        <input v-model="food.price" placeholder="Harga makanan" required></input>
  
        <button type="submit">Tambah</button>
      </form>
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
  
      const response = await axios.post("http://localhost:5050/food/add", food.value);
  
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
  