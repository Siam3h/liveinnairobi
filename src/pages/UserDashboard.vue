<template>
    <div class="dashboard-container">
      <div class="dashboard-card">
        <h2>Welcome</h2>
        <p>Email: {{ user.email }}</p>
        <h3>Your Events</h3>
        <ul>
          <li v-for="event in events" :key="event.title">
            <h4>{{ event.title }}</h4>
            <p>{{ event.description }}</p>
            <p><strong>Date:</strong> {{ event.date }}</p>
          </li>
        </ul>
        <h3>Your Blogs</h3>
        <ul>
          <li v-for="blog in blogs" :key="blog.title">
            <h4>{{ blog.title }}</h4>
            <p>{{ blog.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/apiClient'; 
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'UserDashboard',
    setup() {
      const user = ref({});
      const events = ref([]);
      const blogs = ref([]);
  
      onMounted(async () => {
        try {
          // Get the token from localStorage
          const token = localStorage.getItem('token');
          
          if (token) {
            // Add the token to the Authorization header for the API request
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
            // Fetch the user data, events, and blogs from the API
            const response = await apiClient.getDashboard('/users/dashboard/'); // Adjust the URL accordingly
            user.value = response.data.user;
            events.value = response.data.events;
            blogs.value = response.data.blogs;
          } else {
            console.error('No token found. Please log in.');
            // Redirect to login or show an error message
          }
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          alert('There was an error fetching the dashboard data.');
        }
      });
  
      return { user, events, blogs };
    },
  };
  </script>
  
  <style scoped>
    /* Your styles */
  </style>
  