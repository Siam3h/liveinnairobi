// EventsUpdate.vue
<template>
  <div>
    <h1>Update Event</h1>
    <form @submit.prevent="updateEvent">
      <input v-model="name" type="text" placeholder="Event Name" required />
      <input v-model="date" type="date" required />
      <textarea v-model="description" placeholder="Description" required></textarea>
      <button type="submit">Update Event</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  props: ['eventId'],
  data() {
    return {
      name: '',
      date: '',
      description: ''
    };
  },
  methods: {
    async updateEvent() {
      try {
        const response = await apiClient.put(`/events/${this.eventId}/`, { name: this.name, date: this.date, description: this.description });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>