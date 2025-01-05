<template>
    <section class="bg-gray-100 py-16">
        <div class="container mx-auto px-6 lg:px-8">
            <!-- Page Title and Category Buttons -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-extrabold text-gray-900 mb-6" style="font-family: 'Raleway', sans-serif;">Explore Our Events</h1>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="text-gray-500">Loading events...</div>

            <div v-else>
                <div v-if="events && events.length > 0">
                    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div v-for="event in events" :key="event.id" class="bg-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img v-if="event.thumbnail_img" :src="event.thumbnail_img" alt="Event Thumbnail" class="w-full h-48 object-cover">
                            <h3 class="text-2xl font-semibold text-gray-900 m-2">
                                <router-link :to="`/events/event/${event.id}`"
                                             class="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-red-600 transition duration-300 inline-flex items-center">
                                    {{ event.title }}
                                </router-link>
                            </h3>

                            <!-- Location -->
                            <div class="text-sm text-gray-500 m-4">
                                <span class="inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-red-500 mr-1">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c.88 0 1.615-.707 1.725-1.573.098-.787.624-1.298 1.275-1.298h1.5c.874 0 1.5.707 1.5 1.573 0 1.31-.47 2.616-1.18 3.75M9 15c-.88 0-1.615-.707-1.725-1.573-.098-.787-.624-1.298-1.275-1.298H4.5c-.874 0-1.5.707-1.5 1.573 0 1.31.47 2.616 1.18 3.75M15 19v-6c0-.707-.447-1.258-1-1.5V11a1.5 1.5 0 00-3 0v.5c-.553.242-1 .793-1 1.5v6" />
                                    </svg>
                                    {{ event.location }}
                                </span>
                            </div>

                            <!-- Price Button -->
                            <div class="m-6 text-right">
                                <router-link :to="`/process-payment/${event.id}`"
                                             class="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-red-600 transition duration-300 inline-flex items-center">
                                    <!-- Format Price in Kenyan Shillings (KES) -->
                                    KES {{ event.price }}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 ml-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No events available message -->
            <div v-if="events && events.length < 1">
                <p class="text-gray-500">No events available at the moment.</p>
            </div>
        </div>
    </section>
</template>

<script>
    import api from '../services/apiClient';

    export default {
        data() {
            return {
                events: [], // Initialize the events array properly
                loading: true, // Initialize loading as true to show the loading state
            };
        },
        created() {
            this.fetchEvents();
        },
        methods: {
            async fetchEvents() {
                try {
                    const response = await api.getEvents();
                    this.events = response.data.results; // Update events with the `results` key from paginated API response
                } catch (error) {
                    console.error('Error fetching events:', error);
                } finally {
                    this.loading = false; // Set loading to false after fetching
                }
            }
        }
    };
</script>

<style scoped>
    /* Add any styles you need for your component */
</style>
