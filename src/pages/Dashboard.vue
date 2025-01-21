<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- User Profile Section -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-900">Welcome, {{ user?.username }}</h1>
            <p class="text-gray-600">{{ user?.email }}</p>
          </div>
          <router-link 
            to="/profile"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Edit Profile
          </router-link>
        </div>
      </div>

      <!-- Content Tabs -->
      <div class="mb-6">
        <nav class="flex space-x-4">
          <button 
            @click="activeTab = 'blogs'"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium',
              activeTab === 'blogs' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            My Blogs
          </button>
          <button 
            @click="activeTab = 'events'"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium',
              activeTab === 'events' 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            My Events
          </button>
        </nav>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p class="mt-2 text-gray-600">Loading...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 p-4 rounded-md">
        <p class="text-red-700">{{ error }}</p>
      </div>

      <!-- Blogs Tab Content -->
      <div v-else-if="activeTab === 'blogs'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">My Blogs</h2>
          <router-link 
            to="/blogs/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Blog
          </router-link>
        </div>

        <div v-if="blogs.length === 0" class="text-center py-12 bg-white rounded-lg">
          <p class="text-gray-500">You haven't created any blogs yet.</p>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="blog in blogs" :key="blog.id" class="bg-white rounded-lg shadow">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">{{ blog.title }}</h3>
              <p class="mt-2 text-gray-600 line-clamp-3">{{ blog.content }}</p>
              <div class="mt-4 flex justify-end space-x-2">
                <router-link 
                  :to="`/blogs/${blog.slug}/edit`"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </router-link>
                <button 
                  @click="deleteBlog(blog.slug)"
                  class="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Events Tab Content -->
      <div v-else class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">My Events</h2>
          <router-link 
            to="/events/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Event
          </router-link>
        </div>

        <div v-if="events.length === 0" class="text-center py-12 bg-white rounded-lg">
          <p class="text-gray-500">You haven't created any events yet.</p>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow">
            <img 
              v-if="event.image_url" 
              :src="event.image_url" 
              :alt="event.title"
              class="w-full h-48 object-cover rounded-t-lg"
            >
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">{{ event.title }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ formatDate(event.date) }}</p>
              <p class="mt-2 text-gray-600 line-clamp-3">{{ event.description }}</p>
              <div class="mt-4 flex justify-end space-x-2">
                <router-link 
                  :to="`/events/${event.id}/edit`"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </router-link>
                <button 
                  @click="deleteEvent(event.id)"
                  class="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/apiClient';

export default {
  setup() {
    const user = ref(null);
    const blogs = ref([]);
    const events = ref([]);
    const activeTab = ref('blogs');
    const isLoading = ref(true);
    const error = ref(null);

    const loadDashboardData = async () => {
      try {
        isLoading.value = true;
        error.value = null;

        // Load user data
        const userData = JSON.parse(localStorage.getItem('user'));
        user.value = userData;

        // Load blogs and events in parallel
        const [blogsResponse, eventsResponse] = await Promise.all([
          apiClient.getBlogs(),
          apiClient.getEvents()
        ]);

        // Filter for user's content
        blogs.value = blogsResponse.data.results.filter(
          blog => blog.author === user.value.id
        );
        events.value = eventsResponse.data.results.filter(
          event => event.organizer === user.value.id
        );

      } catch (err) {
        console.error('Error loading dashboard data:', err);
        error.value = 'Failed to load dashboard data. Please try again later.';
      } finally {
        isLoading.value = false;
      }
    };

    const deleteBlog = async (slug) => {
      if (!confirm('Are you sure you want to delete this blog?')) return;
      
      try {
        await apiClient.deleteBlog(slug);
        blogs.value = blogs.value.filter(blog => blog.slug !== slug);
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog. Please try again.');
      }
    };

    const deleteEvent = async (id) => {
      if (!confirm('Are you sure you want to delete this event?')) return;
      
      try {
        await apiClient.deleteEvent(id);
        events.value = events.value.filter(event => event.id !== id);
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again.');
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    onMounted(loadDashboardData);

    return {
      user,
      blogs,
      events,
      activeTab,
      isLoading,
      error,
      deleteBlog,
      deleteEvent,
      formatDate
    };
  }
};
</script>

<style>

</style>