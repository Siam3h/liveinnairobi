<template>
  <div>

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
    // Log the transactionId to check if it's being passed correctly
    console.log("Transaction ID:", this.transactionId);

    // Check if the transactionId is provided
    if (!this.transactionId) {
      alert("Thank You for Your Purchase!");
      this.$router.push('/'); 
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
      alert("Thank You for Your Purchase!");
      this.$router.push('/'); 
      return; 
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
