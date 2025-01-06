<template>
    <section>
        <h1>{{ event.title }}</h1>
        <p>{{ event.description }}</p>
        <button @click="redirectToPayment" class="pay-button">
            Pay KES {{ event.price || 0 }}
        </button>
    </section>
</template>

<script>
import api from '../services/apiClient';

export default {
    name: 'EventDetail',
    data() {
        return {
            event: null,
        };
    },
    async mounted() {
        const { eventId } = this.$route.params;
        const response = await api.getEvent(eventId);
        this.event = response.data;
    },
    methods: {
        redirectToPayment() {
            this.$router.push({ name: 'process-payment', params: { eventId: this.event.id } });
        },
    },
};
</script>

<style scoped>
.pay-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}
</style>
