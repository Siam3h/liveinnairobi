<template>
    <section class="thank-you-page">
        <h1>Thank You!</h1>
        <p>Your payment was successful.</p>
        <div v-if="transaction">
            <p><strong>Event:</strong> {{ transaction.event.title }}</p>
            <p><strong>Date:</strong> {{ formatDate(transaction.event.date) }}</p>
            <p><strong>Location:</strong> {{ transaction.event.location }}</p>
        </div>
        <div v-else-if="error" class="error-message">
            <p>{{ error }}</p>
        </div>
    </section>
</template>

<script>
import api from "../api";

export default {
    data() {
        return {
            transaction: null,
            error: null,
        };
    },
    async created() {
        try {
            const response = await api.thankYou(this.$route.params.transactionId);
            this.transaction = response.data;
        } catch (err) {
            console.error(err);
            this.error = "Failed to fetch transaction details.";
        }
    },
    methods: {
        formatDate(date) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(date).toLocaleDateString(undefined, options);
        },
    },
};
</script>

<style scoped>
.thank-you-page {
    text-align: center;
    padding: 2rem;
}

.error-message {
    color: red;
    font-weight: bold;
}
</style>
