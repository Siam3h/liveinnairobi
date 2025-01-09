// updateProfile.vue
<template>
  <div>
    <h1>Update Profile</h1>
    <form @submit.prevent="updateProfile">
      <input v-model="name" type="text" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  data() {
    return {
      name: '',
      email: ''
    };
  },
  methods: {
    async updateProfile() {
      try {
        const response = await apiClient.updateProfile({ name: this.name, email: this.email });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>