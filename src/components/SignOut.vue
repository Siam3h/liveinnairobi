<template>
  <div class="signout-container">
    <div class="signout-card">
      <h2>Are you sure you want to sign out?</h2>
      <p>You can always sign back in to continue where you left off.</p>
      <div class="button-group">
        <button @click="signOut" class="btn btn-danger">
          <i class="fas fa-sign-out-alt"></i> Sign Out
        </button>
        <button @click="cancelSignOut" class="btn btn-secondary">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient'; // Import the configured apiClient
import Cookies from 'js-cookie'; // For managing cookies

export default {
  name: 'SignOut',
  methods: {
    async signOut() {
      try {
        // Call the authSignOut method
        await this.authSignOut();

        // Clear the auth token (if stored in cookies or local storage)
        Cookies.remove('token'); // Optional, based on your implementation

        // Redirect the user to the login page
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error('Logout failed:', error.message || error);
        alert('Error during logout. Please try again.');
      }
    },
    async authSignOut() {
      try {
        // Send POST request to sign out using apiClient
        await apiClient.post('/users/auth/signout/');
      } catch (error) {
        throw new Error('Failed to sign out.');
      }
    },
    cancelSignOut() {
      this.$router.go(-1); // Navigate back to the previous page
    },
  },
};
</script>

<style scoped>
.signout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.signout-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.signout-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.signout-card p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn i {
  margin-right: 5px;
}
</style>
