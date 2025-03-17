<template>
  <nav class="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-bold text-white">Restoran Gaul</h1>
      <ul class="flex space-x-8">
        <li v-if="!isLoggedIn">
          <router-link to="/rules" class="text-white hover:text-blue-200 transition duration-300">Kontak Kami</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/facility" class="text-white hover:text-blue-200 transition duration-300">Fasilitas</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/menupage" class="text-white hover:text-blue-200 transition duration-300">Menu</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/login" class="text-white hover:text-blue-200 transition duration-300">Login</router-link>
        </li>

        <li v-if="isLoggedIn" class="relative">
          <button class="text-white flex items-center space-x-2 hover:text-blue-200 transition duration-300" @click="toggleDropdown">
            <span>Logged in as: <strong>{{ user.username }}</strong></span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-if="dropdownVisible" class="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 py-2">
            <router-link to="/user" class="block px-4 py-2 hover:bg-gray-200">User Profile</router-link>
            <router-link to="/laporan/penghuni" class="block px-4 py-2 hover:bg-gray-200">Laporan Penghuni</router-link>
            <router-link to="/laporan/fasilitas" class="block px-4 py-2 hover:bg-gray-200">Laporan Fasilitas</router-link>
            <button @click="logout" class="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-200">Logout</button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      isLoggedIn: !!localStorage.getItem('token'),
      dropdownVisible: false,
    };
  },
  methods: {
    async fetchUserSession() {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const response = await axios.get('http://localhost:5050/api/session', {
            headers: { token },
          });
          
          this.user = { username: response.data.username };
          this.isLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(this.user)); 
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        this.isLoggedIn = false;
      }
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible; 
    },
    logout() {
      localStorage.clear(); 
      document.cookie = 'token=; Max-Age=0';
      document.cookie = 'unique_id=; Max-Age=0'; 
      
      this.user = {};
      this.isLoggedIn = false;
      this.dropdownVisible = false;

      window.location.reload(); 

      this.$router.push('/'); 
    },
  },
  mounted() {
    this.fetchUserSession();
  },
};
</script>

<style scoped>
body {
  margin-top: 80px; 
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>