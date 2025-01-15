<template>
  <div class="signout">
    <button @click="signOut" class="btn btn-danger">Sign Out</button>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'SignOut',
  methods: {
    async signOut() {
      try {
        // Make a POST request to the logout endpoint
        await axios.post(
          'https://liveinnbo-backend.onrender.com/api/v1/users/auth/signout/',
          {},
          {
            withCredentials: true, // Ensure cookies are sent
            headers: {
              Authorization: `Token ${Cookies.get('token')}`, // Assuming token is stored as 'auth_token'
            },
          }
        );

        // Remove the token from cookies/localStorage
        Cookies.remove('token');

        // Redirect to login page
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error('Logout failed:', error.response || error.message);
        alert('Error during logout. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
