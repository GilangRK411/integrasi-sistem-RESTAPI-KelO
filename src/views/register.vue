<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="username" class="block text-sm font-semibold text-gray-700">Username:</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" required
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black" />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold text-gray-700">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black" />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-semibold text-gray-700">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black" />
        </div>

        <button type="submit" :disabled="isSubmitting"
          class="w-full p-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
          Register
        </button>
      </form>

      <p v-if="errorMessage" class="mt-4 text-center text-red-500 text-sm">{{ errorMessage }}</p>
      <p v-if="successMessage" class="mt-4 text-center text-green-500 text-sm">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      isSubmitting: false
    };
  },
  methods: {
    async handleRegister() {
      this.errorMessage = '';
      this.successMessage = '';
      this.isSubmitting = true;

      try {
        const response = await axios.post('http://localhost:5050/api/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });

        this.successMessage = response.data.message;
        this.username = '';
        this.email = '';
        this.password = '';
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'An error occurred';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
