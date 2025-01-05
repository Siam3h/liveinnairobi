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
    props: ['reference'],
    data() {
      return {
        loading: true,
        message: '',
      };
    },
    async created() {
      try {
        const response = await apiClient.verifyPayment(`/payments/verify_payment?reference=${this.reference}`);
        this.message = response.data.message;
        console.log(this.message)
  
        // Redirect to Thank You page after 1 second
        setTimeout(() => {
          this.$router.push(`/thank-you/${response.data.transaction_id}`);
        }, 1000);
      } catch (error) {
        console.error(error);
        this.message = 'Payment verification failed. Please try again.';
      }
    }
  };
  </script>
  