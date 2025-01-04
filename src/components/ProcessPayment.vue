<template>
    <section>
        <h2>Payment for {{ event?.title }}</h2>
        <form @submit.prevent="processPayment">
            <label for="email">Email:</label>
            <input type="email" v-model="email" required />

            <label for="phone">Phone:</label>
            <input type="tel" v-model="phone" required />

            <button type="submit" class="pay-button">Proceed to Payment</button>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>
    </section>
</template>

<script>
import api from '../api';

export default {
    props: ['eventId'],
    data() {
        return {
            email: '',
            phone: '',
            event: null,
            error: null,
        };
    },
    async mounted() {
        const response = await api.getEvent(this.eventId);
        this.event = response.data;
    },
    methods: {
        async processPayment() {
            try {
                const paymentData = {
                    eventId: this.eventId,
                    email: this.email,
                    phone: this.phone,
                };
                const response = await api.initializePayment(paymentData);
                window.location.href = response.data.authorization_url;
            } catch (error) {
                this.error = 'Payment initialization failed.';
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.error-message {
    color: red;
}
</style>
