<template>
    <section>
        <h2 v-if="loading">Verifying your payment...</h2>

        <div v-if="!loading && !success && !error">
            <h2>Payment for {{ event?.title }}</h2>
            <form @submit.prevent="initializePayment">
                <label for="email">Email:</label>
                <input type="email" v-model="email" required />

                <label for="phone">Phone:</label>
                <input type="tel" v-model="phone" required />

                <button type="submit" class="pay-button">Proceed to Payment</button>
            </form>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>
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
            loading: false,
            success: false,
            error: null,
        };
    },
    async mounted() {
        try {
            const { eventId } = this.$route.params;
            const response = await api.getEvent(eventId);
            this.event = response.data;

            // Check if we have a reference in the query params for verification
            const reference = new URLSearchParams(window.location.search).get('reference');
            if (reference) {
                this.loading = true;
                await this.verifyPayment(reference);
            }
        } catch (err) {
            console.error(err);
            this.error = 'Failed to load event details.';
        }
    },
    methods: {
        async initializePayment() {
            try {
                const paymentData = {
                    eventId: this.eventId,
                    email: this.email,
                    phone: this.phone,
                };
                const response = await api.initializePayment(paymentData);
                window.location.href = response.data.authorization_url;
            } catch (err) {
                console.error(err);
                this.error = 'Failed to initialize payment.';
            }
        },
        async verifyPayment(reference) {
            try {
                const response = await api.verifyPayment(reference);
                if (response.status === 200) {
                    this.success = true;
                    this.$router.push({ name:'thank-you'});
                } else {
                    this.error = 'Payment verification failed. Please contact support.';
                }
            } catch (err) {
                console.error(err);
                this.error = 'Payment verification failed.';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.error-message {
    color: red;
}
.pay-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}
</style>
