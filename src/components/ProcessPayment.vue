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
        resolvedEventId: null, // Final resolved event ID
        error: '', // Add error message handling
      };
    },
    mounted() {
      try {
        // Prioritize route parameter
        const routeEventId = this.$route.params.eventId;
        const storedEventId = localStorage.getItem('eventId');
  
        // Use route param if available, otherwise fallback to localStorage
        this.resolvedEventId = routeEventId || storedEventId;
  
        if (!this.resolvedEventId) {
          this.error = 'Event ID is missing. Please try again.';
          console.error('Event ID is missing.');
          return;
        }
  
        console.log('Resolved Event ID:', this.resolvedEventId);
      } catch (err) {
        console.error('Error fetching Event ID:', err);
        this.error = 'Failed to retrieve Event ID.';
      }
    },
    methods: {
      async processPayment() {
        this.loading = true;
  
        try {
          if (!this.resolvedEventId) {
            this.error = 'Event ID is missing. Cannot proceed with payment.';
            console.error('Event ID is missing.');
            return;
          }
  
          console.log('Processing payment for Event ID:', this.resolvedEventId);
  
          const response = await apiClient.initializePayment({
            email: this.email,
            phone: this.phone,
            eventId: this.resolvedEventId, // Use resolvedEventId
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
  