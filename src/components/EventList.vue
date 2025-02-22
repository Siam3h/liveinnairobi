<template>
    <section class="bg-gray-50 py-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Page Header -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Explore Events</h1>
                <p class="text-lg text-gray-600">Discover amazing events happening around you</p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>

            <div v-else>
                <!-- Featured/Recent Event -->
                <div v-if="mostRecentEvent" class="mb-12">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Event</h2>
                    <div class="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div class="md:flex">
                            <div class="md:flex-shrink-0">
                                <img :src="mostRecentEvent.thumbnail_url || '/default-event.jpg'"
                                     :alt="mostRecentEvent.title"
                                     class="h-48 w-full object-cover md:w-64">
                            </div>
                            <div class="p-8">
                                <div class="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                                    {{ formatDate(mostRecentEvent.event_date) }}
                                </div>
                                <router-link :to="`/events/${mostRecentEvent.id}`"
                                             class="block mt-1 text-2xl font-semibold text-gray-900 hover:text-indigo-600">
                                    {{ mostRecentEvent.title }}
                                </router-link>
                                <p class="mt-2 text-gray-600">{{ truncateText(mostRecentEvent.content, 150) }}</p>
                                <div class="mt-4 flex items-center">
                                    <span class="text-gray-500">
                                        <svg class="h-5 w-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {{ mostRecentEvent.location }}
                                    </span>
                                    <span class="ml-4 text-indigo-600 font-semibold">
                                        KES {{ mostRecentEvent.price }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category Filters -->
                <div class="mb-8 flex flex-wrap gap-2">
                    <button @click="selectedCategory = null"
                            :class="[
                            'px-4 py-2 rounded-full text-sm font-medium',
                            !selectedCategory
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        ]">
                        All Events
                    </button>
                    <button v-for="category in categories"
                            :key="category"
                            @click="selectedCategory = category"
                            :class="[
                            'px-4 py-2 rounded-full text-sm font-medium',
                            selectedCategory === category
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        ]">
                        {{ category }}
                    </button>
                </div>

                <!-- Events Grid -->
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 slide-in">
                    <div v-for="event in filteredEvents"
                         :key="event.id"
                         class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img :src="event.thumbnail_url || '/default-event.jpg'"
                             :alt="event.title"
                             class="w-full h-48 object-cover">
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="text-xl font-semibold text-gray-900">
                                    <router-link :to="`/events/${event.id}`"
                                                 class="hover:text-indigo-600">
                                        {{ event.title }}
                                    </router-link>
                                </h3>
                                <span class="text-indigo-600 font-semibold">
                                    KES {{ event.price }}
                                </span>
                            </div>
                            <p class="text-gray-600 mb-4">{{ truncateText(event.content, 100) }}</p>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-gray-500">
                                    <svg class="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {{ formatDate(event.event_date) }}
                                </span>
                                <span class="text-gray-500">
                                    <svg class="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {{ event.location }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- No Events Message -->
                <div v-if="filteredEvents.length === 0" class="text-center py-12">
                    <p class="text-gray-600">No events found in this category.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { ref, computed, onMounted } from 'vue';
    import apiClient from '@/services/apiClient';

    export default {
        setup() {
            const events = ref([]);
            const loading = ref(true);
            const selectedCategory = ref(null);
            const error = ref(null);

            // Compute most recent event
            const mostRecentEvent = computed(() => {
                if (!events.value.length) return null;
                return events.value[0]; // Assumes the first event is the most recent
            });

            // Compute unique categories from events (using 'town' field)
            const categories = computed(() => {
                if (!events.value.length) return [];
                const uniqueLocations = new Set(events.value.map(event => event.town));
                return Array.from(uniqueLocations);
            });

            // Filter events based on selected category (exclude featured event)
            const filteredEvents = computed(() => {
                if (!selectedCategory.value) {
                    return events.value.slice(1);
                }
                return events.value.filter(event => event.town === selectedCategory.value);
            });

            // Fetch events from API using the apiClient's getEvents method
            const fetchEvents = async () => {
                try {
                    loading.value = true;
                    const response = await apiClient.getEvents();
                    events.value = response.data.results || response.data || [];
                } catch (err) {
                    console.error('Error fetching events:', err);
                    error.value = 'Failed to load events';
                } finally {
                    loading.value = false;
                }
            };

            // Helper function to format dates
            const formatDate = (dateString) => {
                return new Date(dateString).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            };

            // Helper function to truncate text
            const truncateText = (text, length) => {
                if (!text) return '';
                return text.length > length ? text.substring(0, length) + '...' : text;
            };

            onMounted(() => {
                fetchEvents();
            });

            return {
                events,
                loading,
                error,
                selectedCategory,
                categories,
                mostRecentEvent,
                filteredEvents,
                formatDate,
                truncateText
            };
        }
    };
</script>

<style scoped>
    .container {
        max-width: 1280px;
    }

    /* Slide-in animation for events grid */
    .slide-in {
        animation: slideIn 1s ease-out forwards;
        opacity: 0;
        transform: translateX(100%);
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>
