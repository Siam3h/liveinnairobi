<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password1" type="password" placeholder="Password" required />
      <input v-model="password2" type="password" placeholder="Confirm Password" required />
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <button type="submit">Sign Up</button>
    </form>
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
      errorMessage: ''
    };
  },
  methods: {
    async signUp() {
      // Clear any previous error messages
      this.errorMessage = '';

      // Check if passwords match
      if (this.password1 !== this.password2) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        const response = await apiClient.authSignUp({
          email: this.email,
          password: this.password1,  // Send the first password
        });

        console.log('Signup successful:', response.data);
        // Store the token if needed
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        this.$router.push({ name: 'user-dashboard' });
      } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
        this.errorMessage = error.response?.data?.password?.[0] || 
                           'An error occurred during signup. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>