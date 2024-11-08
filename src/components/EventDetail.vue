<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <p>{{ event.description }}</p>
        <p>Price: KES {{ event.price }}</p>
        <p>Location: {{ event.location }}</p>
        <p>Date: {{ event.date }}</p>

        <button @click="initiatePayment">Purchase Ticket</button>
    </div>
    <div v-else>
        <p>Loading event...</p>
    </div>
</template>

<script>
    import api from '../api';

    export default {
        data() {
            return {
                event: null
            };
        },
        created() {
            const eventId = this.$route.params.id;
            this.fetchEvent(eventId);
        },
        methods: {
            async fetchEvent(eventId) {
                try {
                    const response = await api.getEvent(eventId);
                    this.event = response.data;
                } catch (error) {
                    console.error('Error fetching event:', error);
                }
            },
            async initiatePayment() {
                const paymentData = {
                    email: "user@example.com",
                    phone: "123456789",
                };

                try {
                    const response = await api.initializePayment(paymentData);
                    window.location.href = response.data.authorization_url;
                } catch (error) {
                    console.error('Payment initiation failed:', error);
                }
            }
        }
    };
</script>
