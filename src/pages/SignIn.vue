// signin.vue
<template>
  <div>
    <h1>Sign In</h1>
    <form @submit.prevent="signIn">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
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
    async signIn() {
      try {
        const response = await apiClient.authSignIn({ email: this.email, password: this.password });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>