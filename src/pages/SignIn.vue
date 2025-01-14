<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';
import { ref } from 'vue';

export default {
  name: 'SignIn',
  setup(_, { emit }) {
    const email = ref('');
    const password = ref('');
    const error = ref('');

    const handleLogin = async () => {
      try {
        // Call the new sign-in dashboard API
        const dashboardData = await apiClient.authSignIn({ email: email.value, password: password.value });

        // Store user data and navigate to dashboard
        localStorage.setItem('user', JSON.stringify(dashboardData.user));
        emit('login-success', dashboardData); // Notify parent or redirect
      } catch (err) {
        error.value = 'Invalid credentials or server error.';
      }
    };

    return { email, password, error, handleLogin };
  },
};
</script>

<style>
/* Add your styles here */
</style>
