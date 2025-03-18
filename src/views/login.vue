<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-red-600 mb-6">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="usernameOrEmail" class="block text-sm font-semibold text-gray-700">Username or Email:</label>
          <input
            type="text"
            id="usernameOrEmail"
            v-model="usernameOrEmail"
            placeholder="Enter username or email"
            required
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
          />
        </div>
        
        <div class="mb-6">
          <label for="password" class="block text-sm font-semibold text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter password"
            required
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full p-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Login</span>
        </button>
      </form>

      <p v-if="errorMessage" class="mt-4 text-center text-red-500 text-sm">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usernameOrEmail: '',
      password: '',
      isLoading: false,
      errorMessage: '',
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await axios.post('http://localhost:5050/api/login', {
          usernameOrEmail: this.usernameOrEmail,
          password: this.password,
        });

        if (response.data && response.data.token) {
          const { token, role } = response.data; 
        
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          if (role === 'admin') {
            this.$router.push('/dashboard');
          } else {
            this.$router.push('/menupage');
          }
          
          setTimeout(() => {
            window.location.reload();
          }, 400);
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* No extra styles needed, as Tailwind CSS handles the design */
</style>
