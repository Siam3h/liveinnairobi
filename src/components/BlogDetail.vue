<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <main v-else-if="blog" class="pt-8 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <!-- Blog Header -->
          <div class="mb-8">
            <nav class="flex mb-4" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-2">
                <li>
                  <router-link to="/blog" class="text-gray-500 hover:text-gray-700">
                    All Blogs
                  </router-link>
                </li>
                <li>
                  <span class="text-gray-500">/</span>
                </li>
                <li>
                  <span class="text-gray-900">{{ blog.category }}</span>
                </li>
              </ol>
            </nav>

            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ blog.title }}</h1>
            
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <div class="flex items-center">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>{{ blog.author }}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{{ formatDate(blog.created_at) }}</span>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                <span>{{ blog.category }}</span>
              </div>
            </div>
          </div>

          <!-- Featured Image -->
          <div v-if="blog.thumbnail_url" class="mb-8 rounded-lg overflow-hidden">
            <img 
              :src="blog.thumbnail_url" 
              :alt="blog.title"
              class="w-full h-auto object-cover"
            >
          </div>

          <!-- Blog Content -->
          <article class="prose prose-lg max-w-none">
            <div v-html="blog.content"></div>
          </article>

          <!-- Admin Actions -->
          <div v-if="canEditBlog" class="mt-8 flex space-x-4">
            <router-link 
              :to="`/blog/${blog.slug}/edit`"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Edit Blog
            </router-link>
            <router-link 
              :to="`/blog/${blog.slug}/delete`"
              class="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            >
              Delete Blog
            </router-link>
          </div>

          <!-- Share Section -->
          <div class="mt-12 border-t border-gray-200 pt-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Share this article</h2>
            <div class="flex space-x-4">
              <a 
                :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`"
                target="_blank"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Share on Twitter
              </a>
              <a 
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`"
                target="_blank"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Share on Facebook
              </a>
              <a 
                :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`"
                target="_blank"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="max-w-4xl mx-auto px-4 py-12">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="text-sm text-red-700">{{ errorMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '@/services/apiClient';

export default {
  setup() {
    const route = useRoute();
    const blog = ref(null);
    const loading = ref(true);
    const errorMessage = ref('');

    // Check if user can edit blog
    const canEditBlog = computed(() => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return blog.value && (
        user.id === blog.value.author_id || 
        user.is_staff
      );
    });

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const fetchBlog = async () => {
      try {
        loading.value = true;
        const response = await apiClient.get(`/blog/${route.params.slug}/`);
        blog.value = response.data;
      } catch (error) {
        console.error('Error fetching blog:', error);
        errorMessage.value = 'Failed to load blog post';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchBlog();
    });

    return {
      blog,
      loading,
      errorMessage,
      canEditBlog,
      formatDate
    };
  }
};
</script>

<style>
.prose img {
  border-radius: 0.5rem;
}

.prose {
  max-width: 65ch;
}

/* Add responsive typography */
@media (max-width: 640px) {
  .prose {
    font-size: 1rem;
  }
}
</style>
