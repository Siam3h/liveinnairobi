<template>
    <div>
        <!-- Only render PaymentProcessor when event data is fully loaded -->
        <PaymentProcessor v-if="event" :event="event" />
        <div v-else>Loading Event Details...</div>
    </div>
</template>

<script>
    import PaymentProcessor from '@/components/ProcessPayment.vue';
    import api from '../api';

    export default {
        components: { PaymentProcessor },
        data() {
            return {
                event: null, // Initialize event as null
            };
        },
        created() {
            this.fetchEventDetails();
        },
        methods: {
            async fetchEventDetails() {
                const eventId = this.$route.params.eventId

                try {
                    // Fetch the event details using the event ID from the route params
                    const response = await api.getEvent(eventId);
                    this.event = response.data;
                    console.log(this.event)// Ensure event data is populated correctly
                } catch (error) {
                    console.error("Failed to load event:", error);
                }
            },
        }
    };
</script>
