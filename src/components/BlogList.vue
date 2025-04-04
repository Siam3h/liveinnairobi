<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
        <p class="text-lg text-gray-600">Discover insights, stories, and updates</p>
        
        <div v-if="isAuthor" class="mt-6">
          <router-link 
            to="/blog/create"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            Create New Blog Post
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="error" class="rounded-md bg-red-50 p-4 mb-8">
        <div class="flex">
          <div class="text-sm text-red-700">{{ error }}</div>
        </div>
      </div>

      <div v-else>
        <!-- Most Recent Blog (Featured) -->
        <div v-if="mostRecentBlog" class="mb-16">
          <h2 class="text-2xl font-bold text-gray-900 mb-8">Featured Post</h2>
          <div class="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div class="md:flex">
              <div class="md:flex-shrink-0 md:w-1/2">
                <img 
                  :src="mostRecentBlog.thumbnail_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'" 
                  :alt="mostRecentBlog.title"
                  class="w-full h-64 md:h-full object-cover"
                >
              </div>
              <div class="p-8 md:w-1/2">
                <div class="inline-block px-3 py-1 mb-4 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  {{ mostRecentBlog.category }}
                </div>
                <router-link 
                  :to="`/blog/${mostRecentBlog.slug}`"
                  class="block mt-1 text-3xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-300"
                >
                  {{ mostRecentBlog.title }}
                </router-link>
                <p class="mt-4 text-gray-600">{{ mostRecentBlog.meta || truncateText(mostRecentBlog.content, 200) }}</p>
                <div class="mt-8 flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">{{ mostRecentBlog.author }}</p>
                      <p class="text-sm text-gray-500">{{ formatDate(mostRecentBlog.created_at) }}</p>
                    </div>
                  </div>
                  <router-link 
                    :to="`/blog/${mostRecentBlog.slug}`"
                    class="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-600 rounded-full transition-colors duration-300"
                  >
                    Read More →
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Popular Blog Posts Section -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold text-gray-900 mb-8">Popular Reads</h2>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <!-- Blog Card 1 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/5904932/pexels-photo-5904932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Tech Trends"
                class="w-full h-48 object-cover"
              >
              <div class="p-6">
                <div class="inline-block px-3 py-1 mb-3 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  Technology
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  <router-link to="/blog/tech-trends-2023" class="hover:text-indigo-600 transition-colors duration-300">
                    Emerging Tech Trends in 2023
                  </router-link>
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">
                  Discover the most exciting technological advancements that will shape our future this year and beyond.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Sarah Johnson</span>
                  <router-link 
                    to="/blog/tech-trends-2023"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                  >
                    Read More →
                  </router-link>
                </div>
              </div>
            </article>

            <!-- Blog Card 2 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Remote Work"
                class="w-full h-48 object-cover"
              >
              <div class="p-6">
                <div class="inline-block px-3 py-1 mb-3 text-xs font-semibold text-green-600 bg-green-100 rounded-full">
                  Business
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  <router-link to="/blog/remote-work-strategies" class="hover:text-green-600 transition-colors duration-300">
                    Mastering Remote Work Strategies
                  </router-link>
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">
                  Essential tips and tools to boost productivity and maintain work-life balance in remote settings.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Michael Chen</span>
                  <router-link 
                    to="/blog/remote-work-strategies"
                    class="text-sm font-medium text-green-600 hover:text-green-500 transition-colors duration-300"
                  >
                    Read More →
                  </router-link>
                </div>
              </div>
            </article>

            <!-- Blog Card 3 -->
            <article class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Health Tips"
                class="w-full h-48 object-cover"
              >
              <div class="p-6">
                <div class="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                  Health
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  <router-link to="/blog/mental-health-tips" class="hover:text-blue-600 transition-colors duration-300">
                    Mental Health Tips for Professionals
                  </router-link>
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">
                  Practical advice to manage stress and maintain mental wellbeing in high-pressure work environments.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Dr. Emily Wilson</span>
                  <router-link 
                    to="/blog/mental-health-tips"
                    class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                  >
                    Read More →
                  </router-link>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Categorized Blogs -->
        <div v-for="category in categories" :key="category" class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900">{{ category }}</h2>
            <router-link 
              :to="{ path: '/blog', query: { category }}"
              class="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors duration-300"
            >
              View all
            </router-link>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <article 
              v-for="blog in getBlogsByCategory(category)" 
              :key="blog.id"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img 
                :src="blog.thumbnail_url || getDefaultImage(blog.category)" 
                :alt="blog.title"
                class="w-full h-48 object-cover"
              >
              <div class="p-6">
                <div class="inline-block px-3 py-1 mb-3 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  {{ blog.category }}
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  <router-link 
                    :to="`/blog/${blog.slug}`"
                    class="hover:text-indigo-600 transition-colors duration-300"
                  >
                    {{ blog.title }}
                  </router-link>
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">
                  {{ blog.meta || truncateText(blog.content, 150) }}
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="h-4 w-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span class="text-sm text-gray-500">{{ blog.author }}</span>
                  </div>
                  <router-link 
                    :to="`/blog/${blog.slug}`"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                  >
                    Read More →
                  </router-link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import apiClient from '@/services/apiClient';

export default {
  setup() {
    const blogs = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const isAuthor = computed(() => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.is_author || user.is_staff;
    });

    const mostRecentBlog = computed(() => {
      return blogs.value[0];
    });

    const categories = computed(() => {
      if (!blogs.value.length) return [];
      return [...new Set(blogs.value.map(blog => blog.category))];
    });

    const getBlogsByCategory = (category) => {
      return blogs.value
        .filter(blog => blog.category === category && blog.id !== mostRecentBlog.value?.id)
        .slice(0, 3); // Show only 3 blogs per category
    };

    const getDefaultImage = (category) => {
      const images = {
        'Technology': 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
        'Business': 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
        'Health': 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
        'Lifestyle': 'https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg'
      };
      return images[category] || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg';
    };

    const fetchBlogs = async () => {
      try {
        loading.value = true;
        const response = await apiClient.get('/blog/');
        // Sort blogs by created_at date
        blogs.value = response.data.results.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
      } catch (err) {
        console.error('Error fetching blogs:', err);
        error.value = 'Failed to load blog posts';
      } finally {
        loading.value = false;
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const truncateText = (text, length) => {
      if (!text) return '';
      return text.length > length ? text.substring(0, length) + '...' : text;
    };

    onMounted(() => {
      fetchBlogs();
    });

    return {
      blogs,
      loading,
      error,
      categories,
      mostRecentBlog,
      isAuthor,
      getBlogsByCategory,
      getDefaultImage,
      formatDate,
      truncateText
    };
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article:hover {
  transform: translateY(-5px);
}
</style>