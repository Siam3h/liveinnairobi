<template>
    <div>
        <!-- Only render PaymentProcessor when event data is fully loaded -->
        <PaymentProcessor v-if="event" :event="event" />
        <div v-else>Loading event details...</div>
    </div>
</template>

<script>
    import PaymentProcessor from 'components/PaymentProcessor.vue';
    import api from '../api';

    export default {
        components: { PaymentProcessor },
        data() {
            return {
                event: null, // Initialize event as null
            };
        },
        async created() {
            try {
                // Fetch the event details using the event ID from the route params
                const response = await api.getEvent(this.$route.params.eventId);
                this.event = response.data; // Ensure event data is populated correctly
            } catch (error) {
                console.error("Failed to load event:", error);
            }
        }
    };
</script>
