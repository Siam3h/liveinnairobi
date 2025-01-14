<template>
  <div>
    <h1>Admin Dashboard</h1>
    <div>
      <h2>Welcome, {{ user.name }}</h2>
      <li><router-link to="/auth/signout">Sign Out</router-link></li>
    </div>

    <section>
      <h3>Your Blogs</h3>
      <ul>
        <li v-for="blog in blogs" :key="blog.id">
          <h4>{{ blog.title }}</h4>
          <button @click="editBlog(blog.id)">Edit</button>
          <button @click="deleteBlog(blog.id)">Delete</button>
        </li>
      </ul>
      <button @click="createBlog">Create New Blog</button>
    </section>

    <section>
      <h3>Your Events</h3>
      <ul>
        <li v-for="event in events" :key="event.id">
          <h4>{{ event.name }}</h4>
          <button @click="editEvent(event.id)">Edit</button>
          <button @click="deleteEvent(event.id)">Delete</button>
        </li>
      </ul>
      <button @click="createEvent">Create New Event</button>
    </section>

    <section>
      <h3>Ticket Sales</h3>
      <div>
        <apexchart 
          type="bar" 
          :options="chartOptions" 
          :series="chartSeries" 
        />
      </div>
    </section>

    <section>
      <h3>Profile Management</h3>
      <button @click="updateProfile">Update Profile</button>
      <button @click="deleteProfile">Delete Profile</button>
    </section>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      user: {},
      blogs: [],
      events: [],
      tickets: [],
      chartOptions: {
        chart: {
          id: 'ticket-sales-chart'
        },
        xaxis: {
          categories: []
        }
      },
      chartSeries: []
    };
  },
  methods: {
    async fetchDashboardData() {
      try {
        const [userResponse, blogsResponse, eventsResponse, ticketsResponse] = await Promise.all([
          apiClient.get('/users/me/'),
          apiClient.get('/blogs/'),
          apiClient.get('/events/'),
          apiClient.get('/tickets/sales/')
        ]);
        this.user = userResponse.data;
        this.blogs = blogsResponse.data;
        this.events = eventsResponse.data;
        this.tickets = ticketsResponse.data;
        
        // Set chart data
        const categories = this.tickets.map(ticket => ticket.eventName);
        const salesData = this.tickets.map(ticket => ticket.sales);
        this.chartOptions.xaxis.categories = categories;
        this.chartSeries = [{ name: "Sales", data: salesData }];
      } catch (error) {
        console.error(error);
      }
    },
  
    createBlog() {
      this.$router.push('/blogs/create');
    },
    editBlog(blogId) {
      this.$router.push(`/blogs/edit/${blogId}`);
    },
    deleteBlog(blogId) {
      apiClient.delete(`/blogs/${blogId}/`);
    },
    createEvent() {
      this.$router.push('/events/create');
    },
    editEvent(eventId) {
      this.$router.push(`/events/edit/${eventId}`);
    },
    deleteEvent(eventId) {
      apiClient.delete(`/events/${eventId}/`);
    },
    updateProfile() {
      this.$router.push('/profile/update');
    },
    deleteProfile() {
      apiClient.delete('/profile/');
    }
  },
  mounted() {
    this.fetchDashboardData();
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
