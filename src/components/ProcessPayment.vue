<template>
    <div>
      <h2>Proceed to Payment</h2>
      <form @submit.prevent="processPayment">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
  
        <label for="phone">Phone:</label>
        <input type="text" v-model="phone" required />
  
        <button type="submit" :disabled="loading">Proceed to Payment</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/apiClient';
  
  export default {
    props: ['eventId'],
    data() {
      return {
        email: '',
        phone: '',
        loading: false,
      };
    },
    methods: {
      async processPayment() {
        this.loading = true;
        try {
          const response = await apiClient.initializePayment(`/payments/process/${this.eventId}/`, {
            email: this.email,
            phone: this.phone,
          });
          if (response.data.authorization_url) {
            window.location.href = response.data.authorization_url; 
          }
        } catch (error) {
          console.error(error);
          this.loading = false;
          alert("Payment processing failed!");
        }
      }
    }
  };
  </script>
  