// BlogsUpdate.vue
<template>
  <div>
    <h1>Update Blog</h1>
    <form @submit.prevent="updateBlog">
      <input v-model="title" type="text" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">Update Blog</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/apiClient';

export default {
  props: ['blogId'],
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    async updateBlog() {
      try {
        const response = await apiClient.put(`/blogs/${this.blogId}/`, { title: this.title, content: this.content });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>