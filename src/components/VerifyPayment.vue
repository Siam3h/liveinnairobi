<template>
    <div v-if="loading">
      <p>Verifying payment...</p>
    </div>
    <div v-else>
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/apiClient';
  
  export default {
    props: ['reference'], // Ensure 'reference' is passed as a prop
    data() {
      return {
        loading: true,
        message: '',
      };
    },
    async created() {
      try {
        console.log('Reference:', this.reference); // Debugging log
        if (!this.reference) {
          throw new Error('Payment reference is missing.');
        }
  
        // API call with reference
        const response = await apiClient.verifyPayment(this.reference);
        this.message = response.data.message;
        console.log('Verification Message:', this.message);
  
        // Redirect to Thank You page
        setTimeout(() => {
          this.$router.push(`/thank-you/${response.data.transaction_id}`);
        }, 1000);
      } catch (error) {
        console.error('Verification Error:', error);
        this.message = 'Payment verification failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  