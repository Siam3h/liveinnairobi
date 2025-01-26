<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center mb-8">Create New Blog Post</h1>

      <form @submit.prevent="createBlog" class="space-y-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="blogData.title"
            type="text"
            id="title"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter blog title"
          />
        </div>

        <!-- Meta Description -->
        <div>
          <label for="meta" class="block text-sm font-medium text-gray-700">
            Meta Description
            <span class="text-gray-500 text-xs">(Optional)</span>
          </label>
          <input
            v-model="blogData.meta"
            type="text"
            id="meta"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter meta description for SEO"
          />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select
            v-model="blogData.category"
            id="category"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Content -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <div class="mt-1">
            <textarea
              v-model="blogData.content"
              id="content"
              rows="12"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>
        </div>

        <!-- Thumbnail Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Thumbnail Image
            <span class="text-gray-500 text-xs">(Optional)</span>
          </label>
          <div class="mt-1 flex items-center space-x-4">
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <div v-if="imagePreview" class="h-20 w-20">
              <img 
                :src="imagePreview" 
                alt="Thumbnail preview" 
                class="h-full w-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="text-sm text-red-700">{{ errorMessage }}</div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Creating...</span>
            <span v-else>Create Blog Post</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/services/apiClient';

export default {
  setup() {
    const router = useRouter();
    const isLoading = ref(false);
    const errorMessage = ref('');
    const imagePreview = ref(null);

    const categories = [
      'Live In Nairobi',
      'Technology',
      'Lifestyle',
      'Travel',
      'Food',
      'Culture',
      'Business',
      'Entertainment'
    ];

    const blogData = reactive({
      title: '',
      meta: '',
      content: '',
      category: 'Live In Nairobi',
      thumbnail_img: null,
      thumbnail_url: ''
    });

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        blogData.thumbnail_img = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };

    const createBlog = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';

        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/signin');
          return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('content', blogData.content);
        formData.append('category', blogData.category);
        if (blogData.meta) {
          formData.append('meta', blogData.meta);
        }
        if (blogData.thumbnail_img) {
          formData.append('thumbnail_img', blogData.thumbnail_img);
        }

        // Send request to create blog
        const response = await apiClient.createBlog('/blog/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          }
        });

        if (response.data) {
          // Redirect to the blog detail page or blog list
          router.push(`/blog/${response.data.slug}`);
        }
      } catch (error) {
        console.error('Blog creation error:', error);

        if (error.response?.data) {
          const errors = error.response.data;
          if (typeof errors === 'object') {
            const firstError = Object.values(errors)[0];
            errorMessage.value = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            errorMessage.value = 'Failed to create blog post. Please check your inputs.';
          }
        } else {
          errorMessage.value = 'An unexpected error occurred. Please try again later.';
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      blogData,
      categories,
      isLoading,
      errorMessage,
      imagePreview,
      handleImageUpload,
      createBlog
    };
  }
};
</script>

<style scoped>
/* Add any additional styling here */
</style>