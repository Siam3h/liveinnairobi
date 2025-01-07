<template>
  <section>
    <Navbar />
    <!-- Hero Section -->
    <div class="relative h-screen flex items-center justify-start bg-gradient-to-br from-blue-600 to-red-500 text-left overflow-hidden">
      <!-- Background Image with Gradient -->
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-50"
        style="background-image: url('src/assets/images/bg.jpg');">
      </div>
  
      <!-- Text Content -->
      <div class="relative z-10 w-full lg:w-2/3 px-8 sm:px-16 lg:px-24 py-20 md:py-32 lg:py-48">
        <h1 class="text-white text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Discover, Book, and Share Events Across Kenya
        </h1>
        <p class="text-white text-xl md:text-2xl lg:text-3xl mb-8">
          Your Ultimate Guide to Nairobi's Hottest Events. Explore Events, Purchase Tickets, Post Your Own, and Read Exclusive Reviews!
        </p>
        <div class="flex space-x-4">
          <a 
            href="/auth/register/" 
            class="bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-500 transition">
            Join Us
          </a>
          <a 
            href="/contact" 
            class="bg-white text-blue-600 py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition">
            Reach Out
          </a>
        </div>
      </div>
    </div>
  
    <!-- Trusted Partners Section -->
    <div class="bg-yellow-400 py-8">
      <div class="container mx-auto flex justify-center space-x-8">
        <img v-for="logo in logos" :key="logo.src" :src="logo.src" :alt="logo.alt" class="h-12 w-auto" />
      </div>
    </div>
  
    <!-- Events Section -->
    <div class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-8">
          Upcoming Events
        </h2>
        <div v-if="loadingEvents" class="text-gray-500 text-center">Loading events...</div>
        <div v-else>
          <div v-if="events.length > 0" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div 
              v-for="event in events.slice(0, 3)" 
              :key="event.id" 
              class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img 
                v-if="event.thumbnail_img" 
                :src="event.thumbnail_img" 
                alt="Event Thumbnail" 
                class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="flex items-center text-red-500 mb-2">
                  <span class="text-xl font-bold">{{ new Date(event.created_at).toLocaleString('default', { month: 'short' }) }}</span>
                  <span class="text-3xl font-extrabold ml-2">{{ new Date(event.created_at).getDate() }}</span>
                </div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">
                  <router-link 
                    :to="{ name: 'event-detail', params: { id: event.id } }" 
                    class="hover:text-red-500 transition">
                    {{ event.title }}
                  </router-link>
                </h3>
                <div class="text-sm text-gray-500 mb-6">
                  <span class="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c.88 0 1.615-.707 1.725-1.573.098-.787.624-1.298 1.275-1.298h1.5c.874 0 1.5.707 1.5 1.573 0 1.31-.47 2.616-1.18 3.75M9 15c-.88 0-1.615-.707-1.725-1.573-.098-.787-.624-1.298-1.275-1.298H4.5c-.874 0-1.5.707-1.5 1.573 0 1.31.47 2.616 1.18 3.75M15 19v-6c0-.707-.447-1.258-1-1.5V11a1.5 1.5 0 00-3 0v.5c-.553.242-1 .793-1 1.5v6" />
                    </svg>
                    {{ event.location }}
                  </span>
                </div>
                <router-link 
                  :to="{ name: 'process-payment', params: { id: event.id } }" 
                  class="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-bold shadow hover:bg-red-600 transition">
                  KES {{ parseFloat(event.price).toFixed(2) }}
                </router-link>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-center text-gray-500 text-lg">No events available at the moment.</p>
          </div>
          <div class="mt-12 flex justify-center">
            <router-link 
              to="/events" 
              class="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-blue-700 transition">
              View All Events
            </router-link>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Blog Section -->
    <div class="py-16 bg-blue-600">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-white text-4xl font-bold mb-6">
            Explore Insights and Stories
          </h2>
          <p class="text-white text-lg">
            Discover the latest reviews, articles, and tips from Kenya's vibrant event scene. Stay informed and inspired.
          </p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-gray-900 text-2xl font-bold mb-4">Latest Articles</h3>
          <div v-if="loadingBlogs" class="text-gray-500">Loading blogs...</div>
          <div v-else>
            <div v-for="blog in blogs.slice(0, 3)" :key="blog.id" class="mb-4">
              <h4 class="text-lg font-semibold text-gray-800">
                {{ blog.title }}
              </h4>
              <p class="text-gray-600 text-sm">{{ blog.meta }}</p>
              <router-link 
                :to="{ name: 'blog-detail', params: { slug: blog.slug } }" 
                class="text-blue-600 hover:underline">Read More</router-link>
            </div>
            <div class="mt-8 flex justify-center">
              <router-link 
                to="/blogs" 
                class="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-bold shadow-lg hover:bg-yellow-500 transition">
                View All Blogs
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </section>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';
  import apiClient from '@/services/apiClient';
  
  export default {
    components: {
      Navbar,
      Footer
    },
    data() {
      return {
        blogs: [],
        events: [],
        loadingBlogs: true,
        loadingEvents: true,
        logos: [
          { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/airbnb.svg", alt: "Airbnb" },
          { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-8.png", alt: "Client 8" },
          { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-1.png", alt: "Client 1" },
          { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-3.png", alt: "Client 3" },
          { src: "https://tailus.io/sources/blocks/company-site/preview/images/clients/client-4.png", alt: "Client 4" }
        ]
      };
    },
    created() {
      this.fetchBlogs();
      this.fetchEvents();
    },
    methods: {
      async fetchBlogs() {
        try {
          const response = await apiClient.getBlogs();
          this.blogs = response.data.results;
        } catch (error) {
          console.error('Error fetching blogs:', error);
        } finally {
          this.loadingBlogs = false;
        }
      },
      async fetchEvents() {
        try {
          const response = await apiClient.getEvents();
          this.events = response.data.results;
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          this.loadingEvents = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .bg-gradient-to-br {
    background: linear-gradient(to bottom right, var(--tw-gradient-stops));
  }
  </style>
  