<template>
  <div>
    <h1>Update Profile</h1>
    <form @submit.prevent="updateProfile">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="agencyName" type="text" placeholder="Agency Name" />
      <select v-model="role">
        <option value="event_organizer">Event Organizer</option>
        <option value="author">Author</option>
      </select>
      <input v-model="email" type="email" placeholder="Email" />
      <textarea v-model="bio" placeholder="Bio"></textarea>
      <input type="file" @change="handleFileChange" />
      <input v-model="password" type="password" placeholder="New Password (optional)" />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  data() {
    return {
      username: '',
      agencyName: '',
      role: 'event_organizer', // Default value
      email: '',
      bio: '',
      avatar: null,
      password: ''
    };
  },
  methods: {
    async updateProfile() {
  const formData = new FormData();
  formData.append('username', this.username);
  formData.append('agency_name', this.agencyName);
  formData.append('role', this.role);
  formData.append('email', this.email);
  formData.append('bio', this.bio);
  if (this.avatar) formData.append('avatar', this.avatar);
  if (this.password) formData.append('password', this.password);

  try {
    const response = await apiClient.put('/users/update_profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Necessary for file uploads
      },
    });

    // After the profile update, redirect to the updated profile page
    this.$router.push({ name: 'user-dashboard', params: { userId: response.data.id } });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
},

  }
};
</script>
