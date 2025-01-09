// EventsCreate.vue
<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      <input v-model="name" type="text" placeholder="Event Name" required />
      <input v-model="date" type="date" required />
      <textarea v-model="description" placeholder="Description" required></textarea>
      <button type="submit">Create Event</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  data() {
    return {
      name: '',
      date: '',
      description: ''
    };
  },
  methods: {
    async createEvent() {
      try {
        const response = await apiClient.post('/events/', { name: this.name, date: this.date, description: this.description });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>