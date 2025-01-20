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

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <!-- Google Sign Up Button -->
        <div>
          <button
            @click="handleGoogleSignUp"
            class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="isLoading"
          >
            <img
              class="h-5 w-5 mr-2"
              src="@/assets/google-icon.svg"
              alt="Google logo"
            />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
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

      // Initialize Google Sign-In
      onMounted(() => {
        // Load Google Sign-In API
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
          
          if (!clientId) {
            console.error('Google Client ID not found in environment variables');
            errorMessage.value = 'Google Sign-In is currently unavailable';
            return;
          }

          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse
          });
        };
      });

      const handleGoogleResponse = async (response) => {
        try {
          isLoading.value = true;
          errorMessage.value = '';

          const result = await apiClient.post('/accounts/google/', {
            access_token: response.credential
          });

          if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
            router.push('/auth/signin');
          }
        } catch (error) {
          console.error('Google sign-up error:', error);
          errorMessage.value = 'Failed to sign up with Google. Please try again.';
        } finally {
          isLoading.value = false;
        }
      };

      const handleGoogleSignUp = () => {
        window.google.accounts.id.prompt();
      };

      const signUp = async () => {
        try {
          errorMessage.value = '';
          isLoading.value = true;

          if (password.value !== password2.value) {
            errorMessage.value = 'Passwords do not match';
            return;
          }

          if (password.value.length < 8) {
            errorMessage.value = 'Password must be at least 8 characters long';
            return;
          }

          const payload = {
            email: email.value,
            username: username.value,
            password: password.value
          };

          const response = await apiClient.post('/accounts/register/', payload);

          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            router.push('/auth/signin');
          }
        } catch (error) {
          console.error('Signup error:', error);
          
          if (error.response?.data) {
            const errors = error.response.data;
            if (errors.email) {
              errorMessage.value = `Email: ${errors.email[0]}`;
            } else if (errors.username) {
              errorMessage.value = `Username: ${errors.username[0]}`;
            } else if (errors.password) {
              errorMessage.value = `Password: ${errors.password[0]}`;
            } else if (errors.error) {
              errorMessage.value = errors.error;
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
        signUp,
        handleGoogleSignUp
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
  
  
  