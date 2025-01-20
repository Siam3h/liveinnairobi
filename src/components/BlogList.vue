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
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
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
          <h2 class="text-2xl font-bold text-gray-900 mb-8">Latest Post</h2>
          <div class="bg-white rounded-lg shadow-xl overflow-hidden">
            <div class="md:flex">
              <div class="md:flex-shrink-0">
                <img 
                  :src="mostRecentBlog.thumbnail_url || '/default-blog.jpg'" 
                  :alt="mostRecentBlog.title"
                  class="h-64 w-full object-cover md:w-96"
                >
              </div>
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                  {{ mostRecentBlog.category }}
                </div>
                <router-link 
                  :to="`/blog/${mostRecentBlog.slug}`"
                  class="block mt-1 text-2xl font-semibold text-gray-900 hover:text-indigo-600"
                >
                  {{ mostRecentBlog.title }}
                </router-link>
                <p class="mt-2 text-gray-500">{{ mostRecentBlog.meta || truncateText(mostRecentBlog.content, 200) }}</p>
                <div class="mt-4 flex items-center">
                  <div class="flex items-center">
                    <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span class="text-gray-600">{{ mostRecentBlog.author }}</span>
                  </div>
                  <span class="mx-2 text-gray-500">•</span>
                  <time class="text-gray-500">{{ formatDate(mostRecentBlog.created_at) }}</time>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Categorized Blogs -->
        <div v-for="category in categories" :key="category" class="mb-16">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900">{{ category }}</h2>
            <router-link 
              :to="{ path: '/blog', query: { category }}"
              class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              View all
            </router-link>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <article 
              v-for="blog in getBlogsByCategory(category)" 
              :key="blog.id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div class="aspect-w-16 aspect-h-9">
                <img 
                  :src="blog.thumbnail_url || '/default-blog.jpg'" 
                  :alt="blog.title"
                  class="w-full h-48 object-cover"
                >
              </div>
              <div class="p-6">
                <div class="text-sm font-medium text-indigo-600 mb-2">
                  {{ blog.category }}
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  <router-link 
                    :to="`/blog/${blog.slug}`"
                    class="hover:text-indigo-600 transition-colors"
                  >
                    {{ blog.title }}
                  </router-link>
                </h3>
                <p class="text-gray-600 mb-4 line-clamp-2">
                  {{ blog.meta || truncateText(blog.content, 150) }}
                </p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <span>{{ blog.author }}</span>
                  <time>{{ formatDate(blog.created_at) }}</time>
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
</style>
