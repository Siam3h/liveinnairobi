<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center mb-8">Update Event</h1>

      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading event details...</p>
      </div>

      <form v-else @submit.prevent="updateEvent" class="space-y-6">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="eventData.title"
            type="text"
            id="title"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Event Title"
          />
        </div>

        <!-- Location Details -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              v-model="eventData.location"
              type="text"
              id="location"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Event Location"
            />
          </div>
          <div>
            <label for="town" class="block text-sm font-medium text-gray-700">Town</label>
            <input
              v-model="eventData.town"
              type="text"
              id="town"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Town"
            />
          </div>
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
            <input
              v-model="eventData.country"
              type="text"
              id="country"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Country"
            />
          </div>
        </div>

        <!-- Content -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            v-model="eventData.content"
            id="content"
            rows="4"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Event Description"
          ></textarea>
        </div>

        <!-- Date and Price -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="event_date" class="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              v-model="eventData.event_date"
              type="datetime-local"
              id="event_date"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price (KES)</label>
            <input
              v-model.number="eventData.price"
              type="number"
              id="price"
              min="0"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0"
            />
          </div>
        </div>

        <!-- Thumbnail Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Thumbnail Image</label>
          <div class="mt-1 flex items-center space-x-4">
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <div v-if="eventData.thumbnail_url || imagePreview" class="h-20 w-20">
              <img 
                :src="imagePreview || eventData.thumbnail_url" 
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

        <!-- Submit and Cancel Buttons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$router.back()"
            class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Updating...</span>
            <span v-else>Update Event</span>
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
    const isLoading = ref(false);
    const loading = ref(true);
    const errorMessage = ref('');
    const imagePreview = ref(null);

    const eventData = reactive({
      title: '',
      location: '',
      town: '',
      country: 'Kenya',
      content: '',
      event_date: '',
      price: 0,
      thumbnail_img: null,
      thumbnail_url: ''
    });

    const fetchEventDetails = async () => {
      try {
        const response = await apiClient.get(`/events/${route.params.id}/`);
        Object.assign(eventData, response.data);
        
        // Format the date for the input field
        if (eventData.event_date) {
          eventData.event_date = new Date(eventData.event_date).toISOString().slice(0, 16);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        errorMessage.value = 'Failed to load event details';
      } finally {
        loading.value = false;
      }
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        eventData.thumbnail_img = file;
        imagePreview.value = URL.createObjectURL(file);
      }
    };

    const updateEvent = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';

        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/signin');
          return;
        }

        const formData = new FormData();
        Object.keys(eventData).forEach(key => {
          if (key === 'thumbnail_img' && !eventData[key]) return;
          if (key !== 'thumbnail_url' || eventData[key]) {
            formData.append(key, eventData[key]);
          }
        });

        const response = await apiClient.patch(`/events/${route.params.id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`
          }
        });

        if (response.data) {
          router.push('/events');
        }
      } catch (error) {
        console.error('Event update error:', error);
        
        if (error.response?.data) {
          const errors = error.response.data;
          if (typeof errors === 'object') {
            const firstError = Object.values(errors)[0];
            errorMessage.value = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            errorMessage.value = 'Failed to update event. Please check your inputs.';
          }
        } else {
          errorMessage.value = 'An unexpected error occurred. Please try again later.';
        }
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchEventDetails();
    });

    return {
      eventData,
      isLoading,
      loading,
      errorMessage,
      imagePreview,
      handleImageUpload,
      updateEvent
    };
  }
};
</script>

<style scoped>
/* Add any additional styling here */
</style>