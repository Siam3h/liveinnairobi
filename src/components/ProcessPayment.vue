<template>
    <section class="payment-processor">
        <div v-if="loading" class="loading">Processing your payment...</div>

        <div v-if="!loading && !success && event">
            <h2 class="title">Event Payment</h2>
            <p class="event-title">Paying for: {{ event.title }}</p>
            <form @submit.prevent="processPayment">
                <!-- Payment form fields go here -->
                <!-- Show the price in KES format, with fallback if undefined -->
                <button type="submit" class="pay-button">
                    Pay KES {{ event.price || 0 }}
                </button>
            </form>
        </div>

        <div v-if="success" class="success-message">
            <p>Payment successful! Thank you for your purchase.</p>
        </div>

        <div v-if="error" class="error-message">
            <p>An error occurred: {{ error }}</p>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            event: {
                type: Object,
                required: true, // Ensures that the event data must be passed
            }
        },
        data() {
            return {
                loading: false,
                success: false,
                error: null,
            };
        },
        methods: {
            async processPayment() {
                this.loading = true;
                this.success = false;
                this.error = null;

                try {
                    const paymentData = { eventId: this.event.event_id, amount: this.event.price };
                    // Replace with actual payment initialization API call
                    await this.$api.initializePayment(paymentData);
                    this.success = true; // Payment was successful
                } catch (error) {
                    this.error = 'Payment failed. Please try again.'; // Display error message
                    console.error('Payment error:', error);
                } finally {
                    this.loading = false; // Reset loading state
                }
            }
        }
    };
</script>

<style scoped>
    .loading {
        text-align: center;
        color: #555;
    }

    .pay-button {
        background-color: #e3342f;
        color: #fff;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        font-size: 16px;
    }

        .pay-button:hover {
            background-color: #cc1f1a;
        }

    .success-message, .error-message {
        text-align: center;
        color: #333;
    }
</style>
