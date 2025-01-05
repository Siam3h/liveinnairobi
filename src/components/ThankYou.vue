<template>
    <div>
      <h2>Thank You for Your Purchase!</h2>
      <p>Event: {{ eventTitle }}</p>
      <p>Date: {{ eventDate }}</p>
      <p>Location: {{ eventLocation }}</p>
    </div>
  </template>
  
  <script>
  import { apiClient } from '@/services/apiClient';
  
  export default {
    props: ['transactionId'],
    data() {
      return {
        eventTitle: '',
        eventDate: '',
        eventLocation: '',
      };
    },
    async created() {
      try {
        const response = await apiClient.get(`/payments/thankyou/${this.transactionId}/`);
        this.eventTitle = response.data.event_title;
        this.eventDate = response.data.event_date;
        this.eventLocation = response.data.event_location;
      } catch (error) {
        console.error(error);
        alert("Failed to load thank you details.");
      }
    }
  };
  </script>
  