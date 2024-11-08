<template>
    <Navbar />
        <div class="relative h-screen flex items-center justify-start bg-blue-600 text-left overflow-hidden">
            <!-- Background Image with Fading Effect to the Left -->
            <div class="absolute inset-0 bg-no-repeat bg-right bg-cover opacity-60"
                 style="background-image: url('src/assets/images/bg.jpg'); z-index: 1;">
            </div>

            <!-- Blue Overlay with Gradient Fade Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent" style="z-index: 2;"></div>


            <!-- Text Container on the Left with Dynamic Width for Large Screens -->
            <div class="relative z-10 w-full lg:w-3/4 mx-8 px-4 sm:px-6 lg:px-12 py-20 md:py-32 lg:py-48">
                <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight" style="font-family: 'Raleway', sans-serif;">
                    Discover, Book, and Share Events Across Kenya
                </h1>
                <p class="mt-4 text-white text-2xl md:text-3xl lg:text-4xl" style="font-family: 'Raleway', sans-serif;">
                    Your Ultimate Guide to Nairobi's Hottest Events. Explore Events, Purchase Tickets, Post Your Own, and Read Exclusive Reviews!
                </p>
            </div>
        </div>

        <!-- Logo Clouds Section with Animation and Responsive Margin -->
        <div class="w-full overflow-hidden bg-transparent py-5">
            <div class="animate-slide flex items-center space-x-4">
                <img v-for="logo in logos" :key="logo.src" :src="logo.src" :alt="logo.alt" class="h-6 w-auto filter invert" />
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column: Text Content -->
            <div class="text-left md:pr-8">
                <p class="mt-4 text-black text-2xl md:text-3xl lg:text-4xl mb-6" style="font-family: 'Raleway', sans-serif;">
                    Partnering with Leading Organizations, Agencies, and Individuals to Bring Events to Life. Join Us in Creating Unforgettable Experiences and Transforming Visions into Reality!
                </p>
            </div>

            <!-- Right Column: Buttons -->
            <div class="flex justify-center md:justify-end items-center mt-6 md:mt-0">
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <!-- Button 1: Learn More -->
                    <a href="/contact" class="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300">
                        Reach Out?
                    </a>

                    <!-- Button 2: Get Involved -->
                    <a href="/auth/register/" class="bg-yellow-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-600 transition duration-300">
                        Join Us?
                    </a>
                </div>
            </div>
        </div>

        <!-- Divider Section with Two Thin Lines -->
        <div class="flex justify-center items-center my-8">
            <div class="w-16 border-t-2 border-gray-800"></div>
            <div class="mx-2 w-16 border-t-2 border-gray-800"></div>
        </div>

        <div class="py-12">
            <h2 class="text-3xl font-extrabold text-gray-900 mb-6 text-center text-black" style="font-family: 'Raleway', sans-serif;">Upcoming Events</h2>
            <div v-if="loadingEvents" class="text-gray-500">Loading events...</div>
            <div v-else>
                <div v-if="events.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div v-for="event in events.slice(0, 3)" :key="event.id" class="bg-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <!-- Event Image -->
                            <img v-if="event.thumbnail_img" :src="event.thumbnail_img" alt="Event Thumbnail" class="w-full h-48 object-cover" />

                            <div class="p-6">
                                <!-- Date -->
                                <div class="flex items-center text-gray-500 mb-2">
                                    <span class="bg-red-500 text-white font-bold rounded-full py-1 px-3">{{ new Date(event.created_at).toLocaleString('default', { month: 'short' }) }}</span>
                                    <span class="text-4xl font-extrabold ml-2 text-gray-800">{{ new Date(event.created_at).getDate() }}</span>
                                </div>

                                <!-- Event Title -->
                                <h3 class="text-2xl font-semibold text-gray-900 mb-2">
                                    <router-link :to="{ name: 'event-detail', params: { id: event.id } }" class="hover:text-red-500 transition-colors">{{ event.title }}</router-link>
                                </h3>
                                <!-- Location -->
                                <div class="text-sm text-gray-500 mb-4">
                                    <span class="inline-flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-red-500 mr-1">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c.88 0 1.615-.707 1.725-1.573.098-.787.624-1.298 1.275-1.298h1.5c.874 0 1.5.707 1.5 1.573 0 1.31-.47 2.616-1.18 3.75M9 15c-.88 0-1.615-.707-1.725-1.573-.098-.787-.624-1.298-1.275-1.298H4.5c-.874 0-1.5.707-1.5 1.573 0 1.31.47 2.616 1.18 3.75M15 19v-6c0-.707-.447-1.258-1-1.5V11a1.5 1.5 0 00-3 0v.5c-.553.242-1 .793-1 1.5v6" />
                                        </svg>
                                        {{ event.location }}
                                    </span>
                                </div>

                                <!-- Price Button -->
                                <div class="mt-6 text-right">
                                    <router-link :to="{ name: 'process-payment', params: { id: event.id } }" class="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-red-600 transition duration-300 inline-flex items-center">
                                        KES {{ parseFloat(event.price).toFixed(2) }}
                                        
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 flex justify-center">
                        <router-link to="/events" class="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-blue-700 transition duration-300">
                            All Events
                        </router-link>
                    </div>
                </div>
                <div v-else>
                    <p class="text-3xl font-extrabold text-gray-900 mb-6 text-center text-black" style="font-family: 'Raleway', sans-serif;">No events available at the moment.</p>
                </div>
            </div>
        </div>


        <!-- Blog Accordion Section -->
        <div class="py-12 bg-blue-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Left Column: Introductory Text -->
                <div>
                    <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4" style="font-family: 'Raleway', sans-serif;">
                        Explore Insights, Event Reviews, and Stories from the Music and Entertainment Scene
                    </h1>
                </div>

                <!-- Right Column: Blog Accordion -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-gray-900 text-3xl font-bold mb-4">Latest Articles</h2>
                    <div class="space-y-2">
                        <div v-if="loading" class="text-gray-500">Loading blogs...</div>
                            <div v-else>
                                <div v-if="events.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div v-for="blog in blogs.slice(0, 3)" :key="blog.id">
                                        <button class="w-full text-left py-2 text-gray-700 font-semibold focus:outline-none flex justify-between items-center" @click="toggleAccordion(blog.id)">
                                            <span>{{ blog.title }}</span>
                                            <svg class="w-5 h-5 text-gray-500 transform transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div v-show="expandedBlog === blog.id" class="max-h-full overflow-hidden transition-all duration-300">
                                            <p class="p-4 text-gray-600">{{ blog.meta }}</p>
                                            <div class="mt-2 text-right">
                                                <router-link :to="{ name: 'blog-detail', params: { slug: blog.slug } }" class="text-blue-500 hover:text-blue-700">Read More</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <p class="text-3xl font-extrabold text-gray-900 mb-6 text-center text-black" style="font-family: 'Raleway', sans-serif;">No blogs available at the moment.</p>
                                </div>
                            </div>
                            <!-- "All Posts" Button Centered -->
                            <div class="mt-8 flex justify-center">
                                <router-link to="/blogs" class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-blue-700 transition duration-300">
                                    All Posts
                                </router-link>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
    <Footer />
</template>

<script>
    import api from '../api';
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';

    export default {
        components: {
        Navbar,
        Footer,
        },
        data() {
            return {
                blogs: [],
                events: [],
                loadingBlogs: true,
                loadingEvents: true,
                expandedBlog: null,
                logos: [
                    { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/airbnb.svg", alt: "Airbnb" },
                    { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-8.png", alt: "Client 8" },
                    { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-1.png", alt: "Client 1" },
                    { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-3.png", alt: "Client 3" },
                    { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-4.png", alt: "Client 4" },
                ],
            };
        },
        created() {
            this.fetchBlogs();
            this.fetchEvents();
        },
        methods: {
            async fetchBlogs() {
                try {
                    const response = await api.getBlogs();
                    this.blogs = response.data.results;
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                } finally {
                    this.loadingBlogs = false;
                }
            },
            async fetchEvents() {
                try {
                    const response = await api.getEvents();
                    this.events = response.data.results;
                } catch (error) {
                    console.error('Error fetching events:', error);
                } finally {
                    this.loadingEvents = false;
                }
            },
            toggleAccordion(blogId) {
                this.expandedBlog = this.expandedBlog === blogId ? null : blogId;
            },
        },
    };
</script>

<style scoped>
    /* Animation for the logo clouds */
    @keyframes slide {
        0% {
            transform: translateX(100%);
        }

        100% {
            transform: translateX(-100%);
        }
    }

    .animate-slide {
        animation: slide 30s linear infinite;
    }
</style>