<template>
  <div>
    <h2>Thank You for Your Purchase!</h2>
    <p>Event: {{ eventTitle }}</p>
    <p>Date: {{ eventDate }}</p>
    <p>Location: {{ eventLocation }}</p>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  props: ['transactionId'],  // Ensure 'transactionId' is passed as a prop
  data() {
    return {
      eventTitle: '',
      eventDate: '',
      eventLocation: '',
    };
  },
  async created() {
    // Check if the transactionId is provided
    if (!this.transactionId) {
      console.error("Transaction ID is missing or undefined.");
      alert("Transaction ID is missing.");
      return;
    }

    // Construct the correct URL
    const url = `/payments/thankyou/${this.transactionId}/`;

    // Log the URL for debugging purposes
    console.log("Requesting URL:", url);

    try {
      // Make the API request to get the thank you details
      const response = await apiClient.thankYou(this.transactionId);

      // Log the response to verify its structure
      console.log("API Response:", response);

      // Update the component data with the event details
      this.eventTitle = response.data.event_title;
      this.eventDate = response.data.event_date;
      this.eventLocation = response.data.event_location;
    } catch (error) {
      console.error("Failed to load thank you details:", error);
      alert("Failed to load thank you details.");
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
