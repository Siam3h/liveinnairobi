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
      errorMessage: '',
    };
  },
  methods: {
    async signUp() {
      this.errorMessage = '';

      if (this.password1 !== this.password2) {
        this.errorMessage = 'Passwords do not match';
        return;
      }


      try {
        
        const response = await apiClient.authSignUp({ email: this.email, password: this.password1 });

        console.log('Signup successful:', response.data);

        // Store the token if provided
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Redirect to the dashboard or another page after successful signup
        this.$router.push({ name: 'user-dashboard' });
      } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);

        // Display error message based on API response
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


