<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center p-4">
    <div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
      <div class="sm:flex sm:items-start">
        <!-- Warning Icon -->
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <!-- Content -->
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Delete Event
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete this event? This action cannot be undone.
              All data associated with this event will be permanently removed.
            </p>
            <div v-if="event" class="mt-3 p-3 bg-gray-50 rounded-md">
              <p class="font-medium text-gray-900">{{ event.title }}</p>
              <p class="text-sm text-gray-500">Date: {{ formatDate(event.event_date) }}</p>
              <p class="text-sm text-gray-500">Location: {{ event.location }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mt-3">
        <div class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="text-sm text-red-700">{{ errorMessage }}</div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          @click="confirmDelete"
          :disabled="isLoading"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
        >
          <span v-if="isLoading">Deleting...</span>
          <span v-else>Delete</span>
        </button>
        <button
          type="button"
          @click="cancel"
          :disabled="isLoading"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/services/apiClient';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref(false);
    const errorMessage = ref('');
    const event = ref(null);

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const fetchEventDetails = async () => {
      try {
        const response = await apiClient.get(`/events/${route.params.id}/`);
        event.value = response.data;
      } catch (error) {
        console.error('Error fetching event:', error);
        errorMessage.value = 'Failed to load event details';
      }
    };

    const confirmDelete = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';

        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/signin');
          return;
        }

        await apiClient.delete(`/events/${route.params.id}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        router.push('/events');
      } catch (error) {
        console.error('Event deletion error:', error);
        
        if (error.response?.status === 403) {
          errorMessage.value = 'You do not have permission to delete this event.';
        } else if (error.response?.data?.error) {
          errorMessage.value = error.response.data.error;
        } else {
          errorMessage.value = 'Failed to delete the event. Please try again.';
        }
      } finally {
        isLoading.value = false;
      }
    };

    const cancel = () => {
      router.back();
    };

    onMounted(() => {
      fetchEventDetails();
    });

    return {
      event,
      isLoading,
      errorMessage,
      confirmDelete,
      cancel,
      formatDate
    };
  }
};
</script>

<style scoped>
.fixed {
  z-index: 50;
}
</style>