// BlogsCreate.vue
<template>
  <div>
    <h1>Create Blog</h1>
    <form @submit.prevent="createBlog">
      <input v-model="title" type="text" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">Create Blog</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    async createBlog() {
      try {
        const response = await apiClient.post('/blogs/', { title: this.title, content: this.content });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
