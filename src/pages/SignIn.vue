<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h1 class="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign In
        </h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link 
            to="/auth/signup" 
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            create a new account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="signIn">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Email Input -->
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address" 
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="sr-only">Password</label>
            <div class="relative">
              <input 
                id="password"
                v-model="password" 
                :type="showPassword ? 'text' : 'password'"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password" 
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              >
                <span class="text-sm">{{ showPassword ? 'Hide' : 'Show' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div 
          v-if="errorMessage" 
          class="rounded-md bg-red-50 p-4 animate-fade-in"
        >
          <div class="flex">
            <div class="text-sm text-red-700">
              {{ errorMessage }}
            </div>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember-me"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button 
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Lock Icon -->
              <svg 
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path fill-rule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M4 8V6a6 6 0 1112 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8a2 2 0 012-2h1zm2-2a4 4 0 118 0v2H6V6z" />
              </svg>
            </span>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
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
      password: '',
      errorMessage: '',
      showPassword: false,
      rememberMe: false,
      isLoading: false
    };
  },
  methods: {
    async signIn() {
      this.errorMessage = '';
      this.isLoading = true;

      try {
        const credentials = {
          email: this.email,
          password: this.password
        };

        const response = await apiClient.authSignIn(credentials);
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('response_id',response.data.user.id );
          //console.log('response:', response.data)
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
          }
        }
        //redirect
        this.$router.push({ name: 'user-dashboard' });
      } catch (error) {
        console.error('Error during sign in:', error);
        
        if (error.response?.data) {
          if (error.response.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else if (error.response.data.detail) {
            this.errorMessage = error.response.data.detail;
          } else {
            this.errorMessage = 'Sign in failed. Please check your credentials.';
          }
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    // Restore remembered email if it exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }
};
</script>