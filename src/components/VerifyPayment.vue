<template>
    <div>
      <h2>Process Payment</h2>
      <form @submit.prevent="processPayment">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="phone" type="tel" placeholder="Phone Number" required />
        <button :disabled="loading" type="submit">Proceed to Payment</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p> <!-- Display error message -->
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/apiClient'; // Correct import path for apiClient
  
  export default {
    name: 'ProcessPayment',
    props: ['eventId'], // Accept eventId as a prop
    data() {
      return {
        email: '',
        phone: '',
        loading: false,
        eventId: null, // Initialize eventId as null
        error: '', // Add error message handling
      };
    },
    async mounted() {
      try {
        // Attempt to fetch eventId from localStorage or route params
        const storedEventId = localStorage.getItem('eventId');
        const routeEventId = this.$route.params.eventId;
  
        // Use storedEventId first, fallback to routeEventId
        this.eventId = storedEventId || routeEventId;
  
        if (!this.eventId) {
          this.error = 'Event ID is missing. Please try again.';
          console.error('Event ID is missing.');
          return;
        }
  
        console.log('Successfully loaded Event ID:', this.eventId);
      } catch (err) {
        console.error('Error fetching Event ID:', err);
        this.error = 'Failed to retrieve Event ID.';
      }
    },
    methods: {
      async processPayment() {
        this.loading = true;
  
        try {
          if (!this.eventId) {
            this.error = 'Event ID is missing. Cannot proceed with payment.';
            console.error('Event ID is missing.');
            return;
          }
  
          console.log('Processing payment for Event ID:', this.eventId);
  
          const response = await apiClient.initializePayment({
            email: this.email,
            phone: this.phone,
            eventId: this.eventId, // Pass the correct eventId
          });
  
          if (response.data.authorization_url) {
            window.location.href = response.data.authorization_url; // Redirect to Paystack
          }
        } catch (error) {
          console.error('Payment processing error:', error);
          this.error = 'Payment processing failed. Please try again.';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  