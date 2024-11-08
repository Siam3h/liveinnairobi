<template>
    <section class="payment-processor">
        <div v-if="loading" class="loading">Processing your payment...</div>

        <div v-if="!loading && !success">
            <h2 class="title">Event Payment</h2>
            <form @submit.prevent="processPayment">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" v-model="paymentData.name" required />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" v-model="paymentData.email" required />
                </div>

                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" v-model="paymentData.phone" required />
                </div>

                <button type="submit" class="pay-button">Pay KES {{ event.price }}</button>
            </form>
        </div>

        <div v-if="success" class="success-message">
            <h3>Payment Successful!</h3>
            <p>Your payment for {{ event.title }} has been processed.</p>
            <router-link :to="`/events/event/${event.id}`" class="back-link">Go back to event</router-link>
        </div>

        <div v-if="error" class="error-message">
            <p>Error processing payment: {{ error }}</p>
        </div>
    </section>
</template>

<script>
    import api from '../api';

    export default {
        data() {
            return {
                paymentData: {
                    name: '',
                    email: '',
                    phone: '',
                },
                loading: false,
                success: false,
                error: null,
            };
        },
        props: {
            event: {
                type: Object,
                required: true,
            }
        },
        methods: {
            async processPayment() {
                this.loading = true;
                this.error = null;
                try {
                    const paymentInfo = {
                        ...this.paymentData,
                        eventId: this.event.id,
                        amount: this.event.price,
                    };
                    await api.initializePayment(paymentInfo);
                    this.success = true;
                } catch (err) {
                    this.error = err.response?.data?.message || 'An error occurred during payment processing';
                } finally {
                    this.loading = false;
                }
            }
        }
    };
</script>

<style scoped>
    .payment-processor {
        max-width: 400px;
        margin: auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

    .pay-button {
        width: 100%;
        background-color: #e63946;
        color: #fff;
        padding: 10px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

        .pay-button:hover {
            background-color: #d62828;
        }

    .loading, .success-message, .error-message {
        text-align: center;
        font-size: 16px;
        color: #555;
    }

        .success-message h3 {
            color: #28a745;
        }

    .error-message {
        color: #dc3545;
    }

    .back-link {
        display: block;
        margin-top: 15px;
        color: #007bff;
        text-decoration: none;
    }

        .back-link:hover {
            text-decoration: underline;
        }
</style>
