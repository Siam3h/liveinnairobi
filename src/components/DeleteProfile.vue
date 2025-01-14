// deleteProfile.vue
<template>
  <div>
    <h1>Delete Profile</h1>
    <button @click="deleteProfile">Delete My Profile</button>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  methods: {
    async deleteProfile() {
      try {
        const response = await apiClient.deleteProfile();
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>