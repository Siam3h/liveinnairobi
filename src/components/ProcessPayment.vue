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

        <div v-if="error" class="error-message">
            <p>{{ error }}</p>
        </div>

        <!-- Thank You Section -->
        <div v-if="!loading && !error && reference" class="reference-display">
            <h1>Thank You!</h1>
            <p>Your payment for the event "<strong>{{ event?.title }}</strong>" was successful.</p>
            <h3>Details:</h3>
            <p><strong>Email:</strong> {{ email }}</p>
            <p><strong>Payment Reference:</strong> {{ reference }}</p>
        </div>
    </section>
</template>

<script>
import api from '../api';

export default {
    props: {
        eventId: {
            type: String,
            default: null,
        },
        reference: {
            type: String,
            default: null,
        },
    },
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
            const urlParams = new URLSearchParams(window.location.search);
            const eventId = urlParams.get('eventId');
            const reference = urlParams.get('reference');

            // Handle missing parameters
            if (!eventId) throw new Error('Event ID is missing in the callback URL.');
            if (!reference) throw new Error('Payment reference is missing in the callback URL.');

            // Fetch event details
            const eventResponse = await api.getEvent(eventId);
            this.event = eventResponse.data;

            // Retrieve email from localStorage
            this.email = localStorage.getItem('userEmail') || '';

            // Verify payment
            this.reference = reference;
            this.loading = true;
            await this.verifyPayment(reference);
        } catch (err) {
            console.error('Error during payment verification:', err.message || err);
            this.error = 'Failed to load event details. Please contact support.';
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async initializePayment() {
            try {
                const paymentData = {
                    eventId: this.eventId || this.$route.params.eventId,
                    email: this.email,
                    phone: this.phone,
                    callback_url: `${window.location.origin}/verify_payment?eventId=${this.eventId}`,
                };
                localStorage.setItem('userEmail', this.email); // Save email for callback
                const response = await api.initializePayment(paymentData);
                window.location.href = response.data.authorization_url; // Redirect to Paystack
            } catch (err) {
                console.error('Error initializing payment:', err);
                this.error = 'Failed to initialize payment.';
            }
        },
        async verifyPayment(reference) {
            try {
                const response = await api.verifyPayment(reference);
                if (response.status === 200) {
                    this.success = true;

                    // Optionally, process the transaction further (e.g., show a thank-you page)
                } else {
                    this.error = 'Payment verification failed. Please contact support.';
                }
            } catch (err) {
                console.error('Error verifying payment:', err.message || err);
                this.error = 'Payment verification failed.';
            }
        },
    },
};
</script>
