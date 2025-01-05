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

        <!-- Thank You Section -->
        <div v-if="success && reference" class="reference-display">
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
            console.log('Props:', this.eventId);
            console.log('Route Params:', this.$route.params);

            const eventId = this.eventId || this.$route.params.eventId;
            //if (!eventId) {
            //    this.error = 'Event ID is missing.';
            //    console.error('Event ID is missing.');
            //    return;
            //}

            console.log('Using event ID:', eventId);
            const response = await api.getEvent(eventId);
            this.event = response.data;
            console.log('Event response data:', this.event);

            const reference = this.reference || new URLSearchParams(window.location.search).get('reference');
            if (reference) {
                console.log('Found payment reference:', reference);
                this.loading = true;
                await this.verifyPayment(reference);
            }
        } catch (err) {
            console.error('Error fetching event details:', err.response || err);
            this.error = 'Failed to load event details.';
        }
    },
    methods: {
        async initializePayment() {
            try {
                const paymentData = {
                    eventId: this.eventId || this.$route.params.eventId,
                    email: this.email,
                    phone: this.phone,
                };
                const response = await api.initializePayment(paymentData);
                window.location.href = response.data.authorization_url;
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
                    const { transactionId } = response.data;

                    const thankYouResponse = await api.thankYou(transactionId);
                    if (thankYouResponse.status === 200) {
                        this.$router.push({ name: 'thank-you', params: { transactionId } });
                    } else {
                        this.error = 'Failed to fetch thank-you page details.';
                    }
                } else {
                    this.error = 'Payment verification failed. Please contact support.';
                }
            } catch (err) {
                console.error('Error verifying payment:', err.response || err);
                this.error = 'Payment verification failed.';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
