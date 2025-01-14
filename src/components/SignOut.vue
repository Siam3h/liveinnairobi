<template>
  <div class="signout-container">
    <div class="signout-card">
      <h2>Are you sure you want to sign out?</h2>
      <p>You can always sign back in to continue where you left off.</p>
      <div class="button-group">
        <button @click="signOut" class="btn btn-danger" :disabled="loading">
          <i class="fas fa-sign-out-alt"></i>
          {{ loading ? 'Signing Out...' : 'Sign Out' }}
        </button>
        <button @click="cancelSignOut" class="btn btn-secondary" :disabled="loading">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';
import Cookies from 'js-cookie';

export default {
  name: 'SignOut',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async signOut() {
      if (this.loading) return;
      this.loading = true;

      try {
        // First ensure we have a fresh CSRF token
        const csrfToken = await this.fetchCSRFToken();
        
        // Attempt to sign out
        await this.authSignOut(csrfToken);
        
        // Clear cookies only after successful sign out
        this.clearAuthCookies();
        
        // Redirect to landing page or login
        this.$router.push({ name: 'signin' });
      } catch (error) {
        console.error('Logout failed:', error);
        this.$toast?.error('Error during logout. Please try again.') || 
          alert('Error during logout. Please try again.');
      } finally {
        this.loading = false;
      }
    },

    async fetchCSRFToken() {
      try {
        const response = await apiClient.get('/users/csrf/'); 
        const csrfToken = response.data.csrfToken;
        
        if (!csrfToken) {
          throw new Error('No CSRF token received');
        }

        Cookies.set('csrftoken', csrfToken, {
          secure: true,
          sameSite: 'Lax', 
        });

        return csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw new Error('Failed to fetch CSRF token');
      }
    },

    async authSignOut(csrfToken) {
      try {
        await apiClient.post('/users/auth/signout/', null, {
          headers: {
            'X-CSRFToken': csrfToken
          }
        });
      } catch (error) {
        console.error('Sign out request failed:', error.response?.data || error.message);
        throw new Error('Failed to sign out');
      }
    },

    clearAuthCookies() {
      // Clear auth-related cookies
      Cookies.remove('auth_token');
      Cookies.remove('csrftoken');
    },

    cancelSignOut() {
      if (!this.loading) {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>
/* Styling as before */
</style>
