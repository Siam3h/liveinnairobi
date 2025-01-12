// signup.vue
<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="password" type="password" placeholder="Password" required />
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
      password: '',
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await apiClient.authSignUp({  password: this.password, email: this.email });
        console.log('Signup successful:', response.data.message);
        this.$router.push({ name: 'user-dashboard' });
      } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
      }
    },
  },
};
</script>