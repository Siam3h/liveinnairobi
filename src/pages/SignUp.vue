// signup.vue
<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
    <input v-model="agency_name" type="agency_name" placeholder="agency_name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="phone" placeholder="Phone Number" required />
      <input v-model="password" type="username" placeholder="username" required />
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
        const response = await apiClient.authSignUp({ email: this.email, password: this.password });
        console.log('Signup successful:', response.data);
        this.$router.push({ name: 'user-dashboard' });
      } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
      }
    },
    redirectToPayment() {
      this.$router.push({ name: 'process-payment', params: { eventId: this.event.id } });
    },
  },
};
</script>