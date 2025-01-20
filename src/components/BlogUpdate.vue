<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center mb-8">Update Blog Post</h1>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <form v-else @submit.prevent="updateBlog" class="space-y-6">
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

        <!-- Current Image Preview -->
        <div v-if="currentImage" class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Current Image</label>
          <img 
            :src="currentImage" 
            alt="Current thumbnail" 
            class="h-32 w-auto object-cover rounded-md"
          />
        </div>

        <!-- New Thumbnail Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Update Thumbnail Image
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
                alt="New thumbnail preview" 
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

        <!-- Submit Buttons -->
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
            <span v-if="isLoading">Updating...</span>
            <span v-else>Update Blog Post</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/apiClient';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loading = ref(true);
    const isLoading = ref(false);
    const errorMessage = ref('');
    const imagePreview = ref(null);
    const currentImage = ref(null);

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
      category: '',
      thumbnail_img: null
    });

    const fetchBlog = async () => {
      try {
        loading.value = true;
        const response = await apiClient.get(`/blog/${route.params.slug}/`);
        const blog = response.data;
        
        // Populate form data
        blogData.title = blog.title;
        blogData.meta = blog.meta || '';
        blogData.content = blog.content;
        blogData.category = blog.category;
        currentImage.value = blog.thumbnail_url;
      } catch (error) {
        console.error('Error fetching blog:', error);
        errorMessage.value = 'Failed to load blog details';
      } finally {
        loading.value = false;
      }
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        blogData.thumbnail_img = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };

    const updateBlog = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';

        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/signin');
          return;
        }

        // Create FormData object
        const formData = new FormData();
        Object.keys(blogData).forEach(key => {
          if (blogData[key] !== null && (key !== 'thumbnail_img' || blogData[key] instanceof File)) {
            formData.append(key, blogData[key]);
          }
        });

        // Send update request
        const response = await apiClient.patch(`/blog/${route.params.slug}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          }
        });

        if (response.data) {
          router.push(`/blog/${response.data.slug}`);
        }
      } catch (error) {
        console.error('Blog update error:', error);
        
        if (error.response?.status === 403) {
          errorMessage.value = 'You do not have permission to update this blog post.';
        } else if (error.response?.data) {
          const errors = error.response.data;
          if (typeof errors === 'object') {
            const firstError = Object.values(errors)[0];
            errorMessage.value = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            errorMessage.value = 'Failed to update blog post. Please check your inputs.';
          }
        } else {
          errorMessage.value = 'An unexpected error occurred. Please try again later.';
        }
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchBlog();
    });

    return {
      blogData,
      categories,
      loading,
      isLoading,
      errorMessage,
      imagePreview,
      currentImage,
      handleImageUpload,
      updateBlog
    };
  }
};
</script>
