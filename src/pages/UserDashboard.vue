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
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'UserDashboard',
    setup() {
      const user = ref({});
      const events = ref([]);
      const blogs = ref([]);
  
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
          const userId = localStorage.getItem('user_id'); // Retrieve user ID from localStorage
  
          console.log('Local token:', token);
          console.log('User ID:', userId);
  
          if (token && userId) {
            // Fetch user details using the ID
            const userResponse = await apiClient.get(`/users/${userId}/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            user.value = userResponse.data;
  
            // Fetch dashboard data
            const dashboardResponse = await apiClient.get('/users/dashboard/', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            events.value = dashboardResponse.data.events;
            blogs.value = dashboardResponse.data.blogs;
          } else {
            console.error('Token or User ID not found. Please log in.');
            // Handle redirection to login or error display
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
  