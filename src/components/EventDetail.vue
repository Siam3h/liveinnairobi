<template>
    <section class="event-detail-container">
        <div v-if="loading" class="loading">Loading event details...</div>
        <div v-else-if="event" class="event-details">
            <h1 class="event-title">{{ event.title }}</h1>
            <img v-if="event.thumbnail_img" :src="event.thumbnail_img" alt="Event Image" class="event-image" />
            <p class="event-description">{{ event.description }}</p>
            <p><strong>Location:</strong> {{ event.location }}</p>
            <p><strong>Date:</strong> {{ event.date }}</p>
            <p><strong>Price:</strong> KES {{ event.price }}</p>
            <router-link :to="`/process-payment/${event.id}`" class="purchase-button">
                Buy Ticket
            </router-link>
        </div>
        <div v-else class="no-event">Event not found</div>
    </section>
</template>

<script>
    import api from '../api';

    export default {
        data() {
            return {
                event: null,
                loading: true
            };
        },
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        created() {
            this.fetchEvent();
        },
        methods: {
            async fetchEvent() {
                try {
                    const response = await api.getEvent(this.id);
                    this.event = response.data;
                } catch (error) {
                    console.error('Error fetching event:', error);
                } finally {
                    this.loading = false;
                }
            }
        }
    };
</script>

<style scoped>
    /* Scoped styles for the EventDetail.vue component */
    .event-detail-container {
        padding: 20px;
    }

    .loading, .no-event {
        text-align: center;
        font-size: 18px;
    }

    .event-title {
        font-size: 28px;
        font-weight: bold;
    }

    .event-image {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
    }

    .purchase-button {
        display: inline-block;
        background-color: #e63946;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
    }
</style>
