<template>
  <div class="dashboard">
    <h1>Welcome, {{ user.email }}</h1>
    <h2>Your Events</h2>
    <ul>
      <li v-for="event in events" :key="event.id">{{ event.title }}</li>
    </ul>
    <h2>Your Blogs</h2>
    <ul>
      <li v-for="blog in blogs" :key="blog.id">{{ blog.title }}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UserDashboard',
  setup() {
    const user = ref(JSON.parse(localStorage.getItem('user')));
    const events = ref(user.value?.dashboard?.events || []);
    const blogs = ref(user.value?.dashboard?.blogs || []);

    return { user, events, blogs };
  },
};
</script>
