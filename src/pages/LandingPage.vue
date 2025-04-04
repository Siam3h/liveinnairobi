<template>
  <section>
    <Navbar />
    <!-- Hero Section -->
    <div class="relative h-screen flex items-center justify-start text-left overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 bg-cover bg-center z-0" 
           style="background-image: url('https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')">
        <div class="absolute inset-0 bg-black/50"></div>
      </div>
      
     
<!-- Video Modal -->
<div 
  v-if="showVideo" 
  @click.self="showVideo = false" 
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">

  <div class="relative w-full max-w-4xl">
    <!-- ❌ Close Button -->
    <button 
      @click="showVideo = false" 
      class="absolute -top-10 right-0 text-white hover:text-yellow-400 transition-colors z-50">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-10 w-10" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Video iframe -->
    <div class="aspect-w-16 aspect-h-9">
      <iframe 
        class="w-full h-full" 
        src="https://www.youtube.com/embed/I4BUfnTkKz8?autoplay=1" 
        title="EventPlatform Introduction"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
</div>


      <!-- Text Content with Play Button -->
      <div class="relative z-10 w-full lg:w-2/3 px-8 sm:px-16 lg:px-24 py-20 md:py-32 lg:py-48">
        <h1 class="text-white text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Discover, Book, and Share Events Across Kenya
        </h1>
        <p class="text-white text-xl md:text-2xl lg:text-3xl mb-8">
          <span class="italic font-playwrite">Your Ultimate Guide to Nairobi's Hottest Events.</span> <br> Explore Events, Purchase Tickets, Post Your Own, and Read Exclusive Reviews!
        </p>
        <div class="flex space-x-4 items-center">
          <a 
            href="/auth/signup/" 
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
            Join Us
          </a>
          <a 
            href="/contact" 
            class="bg-white hover:bg-gray-100 text-blue-600 py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
            Reach Out
          </a>
          
         <!-- Animated Circular Play Button -->
         <button @click="showVideo = true" class="group flex items-center mt-4 sm:mt-0 sm:ml-4">
        <div class="relative">
          <div class="absolute inset-0 bg-yellow-400/30 animate-ping rounded-full"></div>
          <div
            class="relative w-14 h-14 sm:w-16 sm:h-16 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 rounded-full">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
            </svg>
          </div>
          <div
            class="absolute inset-0 bg-yellow-400/20 hover:bg-yellow-400/40 blur-sm transition-all duration-300 rounded-full">
          </div>
        </div>
        <span class="ml-3 text-white font-medium text-base sm:text-lg">Watch Video</span>
      </button>
      
        </div>
      </div>
    </div>

    <!-- Rest of your template remains exactly the same -->
    <!-- Trusted Partners Section -->
    <div class="bg-yellow-50 py-16">
      <div class="container mx-auto">
        <h2 class="text-center text-2xl font-semibold text-gray-800 mb-8">Trusted By Kenya's Leading Brands</h2>
        <LogoScroller />
      </div>
    </div>
  
    <!-- Events Section -->
    <div class="py-16 bg-gray-50">
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
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <img 
                v-if="event.thumbnail_img" 
                :src="event.thumbnail_img" 
                alt="Event Thumbnail" 
                class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="flex items-center text-indigo-600 mb-2">
                  <span class="text-xl font-bold">{{ new Date(event.created_at).toLocaleString('default', { month: 'short' }) }}</span>
                  <span class="text-3xl font-extrabold ml-2">{{ new Date(event.created_at).getDate() }}</span>
                </div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">
                  <router-link 
                    :to="{ name: 'event-detail', params: { id: event.id } }" 
                    class="hover:text-indigo-600 transition-colors duration-300">
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
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-lg font-bold shadow transition-all duration-300">
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
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105">
              View All Events
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl font-bold text-gray-800 text-center mb-12">
          What Our Users Say
        </h2>
        <div class="relative overflow-hidden">
          <div class="flex space-x-8 py-4 animate-scroll">
            <!-- Testimonial Card 1 -->
            <div class="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-6 shadow-md">
              <div class="flex items-center mb-4">
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="User" class="w-12 h-12 rounded-full object-cover">
                <div class="ml-4">
                  <h4 class="font-bold text-gray-900">Sarah K.</h4>
                  <div class="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">"EventPlatform made finding concerts in Nairobi so easy! Bought tickets to my favorite artist's show in minutes."</p>
            </div>
            
            <!-- Testimonial Card 2 -->
            <div class="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-6 shadow-md">
              <div class="flex items-center mb-4">
                <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" alt="User" class="w-12 h-12 rounded-full object-cover">
                <div class="ml-4">
                  <h4 class="font-bold text-gray-900">James M.</h4>
                  <div class="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">"As an event organizer, this platform has helped me reach more attendees than ever before. Highly recommended!"</p>
            </div>
            
            <!-- Testimonial Card 3 -->
            <div class="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-6 shadow-md">
              <div class="flex items-center mb-4">
                <img src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" alt="User" class="w-12 h-12 rounded-full object-cover">
                <div class="ml-4">
                  <h4 class="font-bold text-gray-900">Amina W.</h4>
                  <div class="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">"The blog section has great tips for first-time event-goers. Found some hidden gem events through this platform."</p>
            </div>
            
            <!-- Duplicate cards for infinite scroll effect -->
            <div class="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-6 shadow-md">
              <div class="flex items-center mb-4">
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="User" class="w-12 h-12 rounded-full object-cover">
                <div class="ml-4">
                  <h4 class="font-bold text-gray-900">Sarah K.</h4>
                  <div class="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-600">"EventPlatform made finding concerts in Nairobi so easy! Bought tickets to my favorite artist's show in minutes."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Blog Section -->
    <div class="py-16 bg-indigo-600">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-white text-4xl font-bold mb-6">
            Explore Insights and Stories
          </h2>
          <p class="text-white text-lg opacity-90">
            Discover the latest reviews, articles, and tips from Kenya's vibrant event scene. Stay informed and inspired.
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <h3 class="text-gray-900 text-2xl font-bold mb-4">Latest Articles</h3>
          <div v-if="loadingBlogs" class="text-gray-500">Loading blogs...</div>
          <div v-else>
            <div v-for="blog in blogs.slice(0, 3)" :key="blog.id" class="mb-4 pb-4 border-b border-gray-100 last:border-0">
              <h4 class="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                {{ blog.title }}
              </h4>
              <p class="text-gray-600 text-sm mt-1">{{ blog.meta }}</p>
              <router-link 
                :to="{ name: 'blog-detail', params: { slug: blog.slug } }" 
                class="text-indigo-600 hover:underline inline-block mt-2 font-medium">Read More →</router-link>
            </div>
            <div class="mt-8 flex justify-center">
              <router-link 
                to="/blogs" 
                class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105">
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
import apiClient from '../services/apiClient';
import LogoScroller from '../components/LogoScroller.vue';

export default {
  components: {
    Navbar,
    Footer,
    LogoScroller,
  },
  data() {
    return {
      showVideo: false,
      blogs: [],
      events: [],
      loadingBlogs: true,
      loadingEvents: true,
      logos: [
        { src: "https://www.pexels.com/photo/joyful-man-jumping-at-sydney-marathon-event-30061273/", alt: "Airbnb" },
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
/* Animation for the play button */
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 0.4; }
}

.animate-ping {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

/* Background image styling */
.bg-cover {
  background-size: cover;
}

.bg-center {
  background-position: center;
}

/* Testimonial scroll animation */
.animate-scroll {
  animation: scroll 30s linear infinite;
  width: calc(250px * 8);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 4));
  }
}

/* Card hover effects */
.hover\:-translate-y-2:hover {
  transform: translateY(-0.5rem);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>