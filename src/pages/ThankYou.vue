<template>
    <section class="thank-you-page">
        <h1>Thank You!</h1>
        <p>Your payment was successful.</p>
        <div v-if="transaction">
            <p><strong>Event:</strong> {{ transaction.eventTitle }}</p>
            <p><strong>Date:</strong> {{ transaction.eventDate }}</p>
            <p><strong>Location:</strong> {{ transaction.eventLocation }}</p>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        transactionId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            transaction: null,
        };
    },
    async mounted() {
        try {
            const response = await axios.get(`/api/v1/payments/thankyou/${this.transactionId}/`);
            this.transaction = response.data;
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }
    },
};
</script>

<style scoped>
.thank-you-page {
    text-align: center;
    padding: 20px;
}
</style>
