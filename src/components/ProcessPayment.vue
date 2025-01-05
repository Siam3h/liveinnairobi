<template>
    <section>
        <h2 v-if="loading">Verifying your payment...</h2>

        <div v-if="!loading && !success && !error">
            <h2>Payment for {{ event?.title || 'Unknown Event' }}</h2>
            <p v-if="!event">Event details could not be loaded.</p>
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
            <p>Your payment for the event "<strong>{{ event?.title || 'Unknown Event' }}</strong>" was successful.</p>
            <h3>Details:</h3>
            <p><strong>Email:</strong> {{ email || 'Not Provided' }}</p>
            <p><strong>Payment Reference:</strong> {{ reference }}</p>
        </div>
    </section>
</template>

<script>
import api from "../api";

export default {
    data() {
        return {
            email: "",
            phone: "",
            event: null,
            loading: false,
            success: false,
            error: null,
        };
    },
    async mounted() {
        try {
            // Get event ID
            const eventId = this.eventId || this.$route.params.eventId;
            if (!eventId) {
                throw new Error("Event ID is missing. Unable to fetch event details.");
            }

            // Fetch event details
            const response = await api.getEvent(eventId);
            this.event = response.data;
            console.log("Event response data Id:", this.event);

            // Get reference from props or URL
            const reference = this.reference || new URLSearchParams(window.location.search).get("reference");
            if (reference) {
                this.reference = reference; // Store reference for display
                this.loading = true;
                await this.verifyPayment(reference);
            }
        } catch (err) {
            console.error("Error fetching event details:", err.message || err);
            this.error = "Failed to load event details.";
        }
    },
    methods: {
        async initializePayment() {
            try {
                // Validate input
                if (!this.email || !this.phone) {
                    throw new Error("Email and phone number are required.");
                }

                // Prepare payment data
                const paymentData = {
                    eventId: this.eventId || this.$route.params.eventId,
                    email: this.email,
                    phone: this.phone,
                };

                // Call API to initialize payment
                const response = await api.initializePayment(paymentData);
                window.location.href = response.data.authorization_url;
            } catch (err) {
                console.error("Error initializing payment:", err.message || err);
                this.error = "Failed to initialize payment.";
            }
        },
        async verifyPayment(reference) {
            try {
                // Call API to verify payment
                const response = await api.verifyPayment(reference);
                if (response.status === 200) {
                    this.success = true;
                    this.reference = reference; // Ensure reference is stored

                    // Optional: Redirect to thank-you page with transaction ID
                    const { transactionId } = response.data;
                    const thankYouResponse = await api.thankYou(transactionId);
                    if (thankYouResponse.status === 200) {
                        this.$router.push({ name: "thank-you", params: { transactionId } });
                    } else {
                        console.warn("Unable to fetch thank-you page details.");
                    }
                } else {
                    throw new Error("Payment verification failed. Please contact support.");
                }
            } catch (err) {
                console.error("Error verifying payment:", err.message || err);
                this.error = "Payment verification failed.";
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
