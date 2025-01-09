// signup.vue
<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
    <input v-model="agency_name" type="agency_name" placeholder="Password" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
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
      password: ''
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await apiClient.authSignUp({ email: this.email, password: this.password });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>