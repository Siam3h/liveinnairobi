<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h1 class="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign Up
        </h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link 
            to="/auth/signin" 
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign into an existing account.
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="signUp">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input 
              v-model="email" 
              id="email"
              type="email" 
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address" 
            />
          </div>
          <div>
            <label for="password1" class="sr-only">Password</label>
            <input 
              v-model="password" 
              id="password"
              type="password" 
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password" 
            />
          </div>
          <div>
            <label for="password2" class="sr-only">Confirm Password</label>
            <input 
              v-model="password2" 
              id="password2"
              type="password" 
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password" 
            />
          </div>
        </div>

        <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="text-sm text-red-700">
              {{ errorMessage }}
            </div>
          </div>
        </div>

        <div>
          <button 
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  data() {
    return {
      email: '',
      password1: '',
      password2: '',
      errorMessage: '',
    };
  },
  methods: {
    async signUp() {
  this.errorMessage = '';

  if (this.password !== this.password2) {
    this.errorMessage = 'Passwords do not match';
    return;
  }

  const payload = { email: this.email, password: this.password };
  
  console.log('Payload:', payload); 

  try {
    const response = await apiClient.authSignUp(payload);
    console.log('Signup successful:', response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    this.$router.push({ name: 'signin' });
  } catch (error) {
    console.error('Error during signup:', error.response?.data || error.message);

    if (error.response?.data) {
      const errors = error.response.data;
      if (errors.email) {
        this.errorMessage = `Email: ${errors.email[0]}`;
      } else if (errors.password) {
        this.errorMessage = `Password: ${errors.password[0]}`;
      } else {
        this.errorMessage = 'Signup failed. Please check your inputs and try again.';
      }
    } else {
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
    }
  }
}

  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>


