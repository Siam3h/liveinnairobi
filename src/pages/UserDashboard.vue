<template>
    <div class="dashboard-container">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else class="dashboard-card">
        <h2>Welcome</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
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
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'UserDashboard',
    setup() {
      const user = ref({});
      const events = ref([]);
      const blogs = ref([]);
      const isLoading = ref(true);
      const error = ref(null);
  
      const apiClient = axios.create({
        baseURL: 'https://liveinnbo-backend.onrender.com/api/v1',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });
  
      onMounted(async () => {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('user_id');
          console.log('Local token:', token);
          console.log('Local user_id:', userId);
  
          if (token && userId) {
            const response = await apiClient.get(`/users/dashboard/`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              params: {
                user_id: userId, // Sending user_id as a query parameter
              },
            });
            console.log('Dashboard data:', response.data);
            user.value = response.data.user;
            events.value = response.data.events;
            blogs.value = response.data.blogs;
          } else {
            error.value = 'Token or user ID not found. Please log in.';
          }
        } catch (err) {
          error.value = 'Error fetching dashboard data.';
          console.error(err);
        } finally {
          isLoading.value = false;
        }
      });
  
      return { user, events, blogs, isLoading, error };
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    padding: 20px;
  }
  
  .dashboard-card {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #333;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 15px;
  }
  
  h4 {
    margin: 5px 0;
    font-size: 1.2em;
  }
  
  p {
    margin: 5px 0;
    font-size: 1em;
  }
  </style>
  