<template>
    <Navbar />
    <main class="bg-gray-100">
        <div class="container mx-auto px-4 pt-12 pb-12">
            <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">

                <!-- Cover Image -->
                <div class="h-80 bg-cover bg-center" style="background-image: url('{{ event.thumbnail_img.url }}');">
                    <div class="bg-gradient-to-t from-black/50 to-transparent w-full h-full flex justify-center items-center">
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center p-4" style="font-family: 'Raleway', sans-serif;">
                            {{ event.title }}
                        </h1>
                    </div>
                </div>
                <div class="p-6">
                    <div class="text-sm text-gray-500 mb-4">
                        <p>
                            {{ event.category }}
                        </p>
                        <p class="text-sm text-gray-500" style="font-family: 'Raleway', sans-serif;">
                            By <span class="text-blue-600 font-semibold">{{ event.price }}</span> |
                            Published on  <!-- Updated to use blog.id -->
                        </p>
                    </div>
                    <p class="text-gray-700 text-base leading-relaxed mb-4" v-html="blog.content"></p>

                    <!-- Divider -->
                    <div class="border-t border-gray-300 my-12"></div>

                    <!-- Social Sharing Section -->
                    <div class="text-center">
                        <h3 class="text-2xl font-semibold text-gray-800 mb-4" style="font-family: 'Raleway', sans-serif;">
                            Enjoyed this article? Share it with your friends!
                        </h3>
                        <div class="flex justify-center space-x-4">
                            <a href="https://www.facebook.com/sharer/sharer.php?u={{ request.build_absolute_uri }}" target="_blank"
                               class="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-blue-700 transition duration-300">
                                Facebook
                            </a>

                            <a href="https://x.com/intent/tweet?text={{ event.title }}&url={{ request.build_absolute_uri }}" target="_blank"
                               class="flex items-center justify-center bg-black text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-blue-500 transition duration-300">
                                X
                            </a>

                            <a href="https://api.whatsapp.com/send?text={{ event.title }}%0A{{ request.build_absolute_uri }}" target="_blank"
                               class="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-green-600 transition duration-300">
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    <div class="my-8"></div>

                    <router-link to="/events" class="text-blue-600 hover:text-blue-800 font-semibold">
                        &larr; Back to Events
                    </router-link>

                </div>
            </div>
        </div>
    </main>
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
                event: {},
                loading: true,
            };
        },
        created() {
            this.fetchEventDetails();
        },
        methods: {
            async fetchEventDetails() {
                const slug = this.$route.params.eventId;
                try {
                    const response = await api.getEvent(eventId);
                    this.event = response.data;
                } catch (error) {
                    console.error('Error fetching blog details:', error);
                } finally {
                    this.loading = false;
                }
            },
        }
    };
</script>

<style scoped>
    h1 {
        font-family: 'Raleway', sans-serif;
    }
</style>
