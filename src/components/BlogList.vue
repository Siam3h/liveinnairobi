<template>
    <div class="container mx-auto px-6 py-16">
            <h1 class="text-4xl font-poppins text-brandBlue mb-6">Blogs</h1>
            <div v-if="loading" class="text-gray-500">Loading blogs...</div>
            <div v-else>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="blog in blogs" :key="blog.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <!-- Blog Image -->
                        <img v-if="blog.thumbnail_img" :src="blog.thumbnail_img" alt="Blog Post Thumbnail" class="w-full h-auto mb-4">
                        <div class="p-6">
                            <h2 class="text-2xl font-bold text-gray-900 mb-1" style="font-family: 'Raleway', sans-serif;">
                                <router-link :to="{ name: 'blog-detail', params: { slug: blog.slug } }" class="hover:text-blue-600 transition-colors">{{ blog.title }}</router-link>
                            </h2>
                            <p>
                                {{ blog.category }}
                            </p>
                            <!-- Blog Meta Description -->
                            <p class="text-gray-700 text-base mb-4" style="font-family: 'Raleway', sans-serif;">
                                {{ blog.meta }}...
                            </p>

                            <!-- Blog Author and Date -->
                            <div class="text-sm text-gray-500" style="font-family: 'Raleway', sans-serif;">
                                <span class="font-medium text-gray-900">{{ blog.author }}</span> |
                                <span>{{ blog.time }}</span>
                            </div>

                            <!-- Read More Button -->
                            <div class="mt-4">
                                <router-link :to="{ name: 'blog-detail', params: { slug: blog.slug } }" class="bg-red-500 text-white py-2 px-6 rounded-full text-sm font-bold shadow-lg hover:bg-red-600 transition duration-300"
                                             style="font-family: 'Raleway', sans-serif;">Read More</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      blogs: [],
      loading: true,
    };
  },
  created() {
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      try {
        const response = await api.getBlogs();
          this.blogs = response.data.results;
          console.log(this.blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
