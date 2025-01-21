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
              <label for="username" class="sr-only">Username</label>
              <input 
                v-model="username" 
                id="username"
                type="text"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username" 
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
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
              :disabled="isLoading"
            >
              <span v-if="isLoading">Signing up...</span>
              <span v-else>Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import apiClient from '@/services/apiClient';
  
  export default {
    setup() {
      const router = useRouter();
      const email = ref('');
      const username = ref('');
      const password = ref('');
      const password2 = ref('');
      const errorMessage = ref('');
      const isLoading = ref(false);

      const signUp = async () => {
        try {
          errorMessage.value = '';
          isLoading.value = true;

          if (!email.value || !username.value || !password.value || !password2.value) {
            errorMessage.value = 'All fields are required';
            return;
          }

          if (password.value !== password2.value) {
            errorMessage.value = 'Passwords do not match';
            return;
          }

          if (password.value.length < 8) {
            errorMessage.value = 'Password must be at least 8 characters long';
            return;
          }

          const registrationData = {
            email: email.value,
            username: username.value,
            password: password.value,
            password2: password2.value
          };

          console.log('Sending registration data:', registrationData);

          const response = await apiClient.authSignUp(registrationData);

          console.log('Registration response:', response.data);

          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.router.push('/auth/signin');
          }
        } catch (error) {
          console.error('Signup error:', error.response?.data || error);
          
          if (error.response?.data) {
            const errors = error.response.data;
            if (errors.email) {
              errorMessage.value = `Email: ${errors.email[0]}`;
            } else if (errors.username) {
              errorMessage.value = `Username: ${errors.username[0]}`;
            } else if (errors.password) {
              errorMessage.value = `Password: ${errors.password[0]}`;
            } else if (errors.password2) {
              errorMessage.value = `Confirm Password: ${errors.password2[0]}`;
            } else if (errors.error) {
              errorMessage.value = errors.error;
            } else if (typeof errors === 'string') {
              errorMessage.value = errors;
            } else {
              errorMessage.value = 'Registration failed. Please check your inputs and try again.';
            }
          } else {
            errorMessage.value = 'An unexpected error occurred. Please try again later.';
          }
        } finally {
          isLoading.value = false;
        }
      };

      return {
        email,
        username,
        password,
        password2,
        errorMessage,
        isLoading,
        signUp
      };
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  
  
  