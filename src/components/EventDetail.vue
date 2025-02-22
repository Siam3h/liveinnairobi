<template>
    <div class="min-h-screen bg-gray-50 py-12">
        <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>

        <div v-else-if="event" class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <!-- Event Header -->
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="relative h-96">
                    <img :src="event.thumbnail_url || '/default-event.jpg'"
                         :alt="event.title"
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h1 class="text-4xl font-bold mb-2">{{ event.title }}</h1>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <div class="flex items-center">
                                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {{ formatDate(event.event_date) }}
                            </div>
                            <div class="flex items-center">
                                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {{ event.location }}, {{ event.town }}, {{ event.country }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Event Details -->
                <div class="p-6 lg:p-8">
                    <div class="lg:grid lg:grid-cols-3 lg:gap-8">
                        <!-- Main Content -->
                        <div class="lg:col-span-2">
                            <div class="prose max-w-none">
                                <h2 class="text-2xl font-bold mb-4">About This Event</h2>
                                <div class="whitespace-pre-wrap">{{ event.content }}</div>
                            </div>

                            <!-- Organizer Info -->
                            <div class="mt-8 border-t pt-8">
                                <h3 class="text-lg font-semibold mb-4">Event Organizer</h3>
                                <div class="flex items-center">
                                    <div class="bg-indigo-100 rounded-full p-3">
                                        <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-gray-900">{{ event.event_organizer?.email || 'Event Organizer' }}</p>
                                        <p class="text-sm text-gray-500">Organizer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="mt-8 lg:mt-0">
                            <div class="bg-gray-50 rounded-lg p-6">
                                <div class="mb-6">
                                    <h3 class="text-lg font-semibold mb-2">Price</h3>
                                    <p class="text-3xl font-bold text-indigo-600">
                                        KES {{ event.price }}
                                    </p>
                                </div>

                                <button @click="redirectToPayment"
                                        class="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                                    Get Tickets
                                </button>

                                <!-- Action Buttons for Event Organizer -->
                                <div v-if="canEditEvent" class="mt-4 space-y-2">
                                    <router-link :to="`/events/${event.id}/edit`"
                                                 class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Edit Event
                                    </router-link>
                                    <router-link :to="`/events/${event.id}/delete`"
                                                 class="w-full inline-flex justify-center items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Delete Event
                                    </router-link>
                                </div>

                                <!-- Event Details -->
                                <div class="mt-6 border-t pt-6">
                                    <h3 class="text-lg font-semibold mb-4">Event Details</h3>
                                    <div class="space-y-3">
                                        <div class="flex items-center text-sm">
                                            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Created on {{ formatDate(event.created_at) }}</span>
                                        </div>
                                        <div class="flex items-center text-sm">
                                            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            <span>{{ event.location }}, {{ event.town }}</span>
                                        </div>
                                        <div class="flex items-center text-sm">
                                            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                            </svg>
                                            <span>{{ event.country }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="mt-4 rounded-md bg-red-50 p-4">
                    <div class="flex">
                        <div class="text-sm text-red-700">{{ errorMessage }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, computed, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import apiClient from '@/services/apiClient';

    export default {
        setup() {
            const route = useRoute();
            const router = useRouter();
            const event = ref(null);
            const loading = ref(true);
            const errorMessage = ref('');

            // Determine if the current user can edit the event
            const canEditEvent = computed(() => {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                return event.value && (
                    user.id === event.value.event_organizer?.id ||
                    user.is_staff
                );
            });

            // Format date for display
            const formatDate = (dateString) => {
                return new Date(dateString).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            };

            // Fetch the event using the API client's getEvent method
            const fetchEvent = async () => {
                try {
                    loading.value = true;
                    const response = await apiClient.getEvent(route.params.id);
                    event.value = response.data;
                } catch (error) {
                    console.error('Error fetching event:', error);
                    errorMessage.value = 'Failed to load event details';
                } finally {
                    loading.value = false;
                }
            };

            // Redirect to the payment process route
            const redirectToPayment = () => {
                if (!event.value) return;
                router.push({
                    name: 'process-payment',
                    params: { eventId: event.value.id }
                });
            };

            onMounted(() => {
                fetchEvent();
            });

            return {
                event,
                loading,
                errorMessage,
                canEditEvent,
                formatDate,
                redirectToPayment
            };
        }
    };
</script>

<style scoped>
    .container {
        max-width: 1280px;
    }

    .prose {
        max-width: 65ch;
    }
</style>
