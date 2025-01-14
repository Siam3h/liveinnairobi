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
          console.log('Local token:', token);
          // Retrieve the response from localStorage and ensure it's valid JSON
    const responseData = localStorage.getItem('response_id');
    let res = null;

    if (responseData) {
      try {
        res = JSON.parse(responseData); // Try parsing the stringified object
        console.log('response data:', res); // Check if the object is valid
      } catch (error) {
        console.error('Error parsing stored response data:', error);
      }
    } else {
      console.log('No response data found in localStorage');
    }
          if (token) {
            // Add the token to the Authorization header for this request
            const response = await apiClient.get('/users/dashboard/', {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
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
  