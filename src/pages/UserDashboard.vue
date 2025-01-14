<template>
  <div class="dashboard-container">
    <div class="dashboard-card">
      <h2>Welcome, {{ user.username }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Full Name: {{ user.first_name }} {{ user.last_name }}</p>

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
import apiClient from '@/services/apiClient'; // Import the apiClient
import { ref, onMounted } from 'vue'; // For managing component state

export default {
  name: 'UserDashboard',
  setup() {
    // Define reactive variables to store dashboard data
    const user = ref({});
    const events = ref([]);
    const blogs = ref([]);

    // Fetch the dashboard data when the component is mounted
    onMounted(async () => {
      try {
        // Make sure the CSRF token is set before making the request
        const csrfToken = await apiClient.fetchCSRFToken();
        
        // Fetch dashboard data from the API
        const response = await apiClient.getDashboard(csrfToken);
        console.log("response:", response);
        user.value = response.data.user;  // Set user data
        events.value = response.data.events;  // Set events data
        blogs.value = response.data.blogs;  // Set blogs data
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        alert('There was an error fetching the dashboard data.');
      }
    });

    return {
      user,
      events,
      blogs
    };
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
}

.dashboard-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
}

.dashboard-card h2,
.dashboard-card h3 {
  color: #333;
}

.dashboard-card p {
  color: #666;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 15px;
}

h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
}
</style>
