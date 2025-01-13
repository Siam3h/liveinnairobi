<template>
  <div class="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Create Event</h1>
    <form class="space-y-6" @submit.prevent="createEvent">
      <input
        v-model="title"
        type="text"
        placeholder="Event Title"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        v-model="location"
        type="text"
        placeholder="Location"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="town"
        type="text"
        placeholder="Town"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="country"
        type="text"
        placeholder="Country"
        value="Kenya"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-model="content"
        placeholder="Content"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        required
      ></textarea>
      <label class="block text-gray-600 text-sm font-medium">Upload Thumbnail Image</label>
      <input
        type="file"
        @change="handleFileUpload"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-600 file:bg-gray-50 hover:file:bg-gray-100"
      />
      <input
        v-model="thumbnail_url"
        type="url"
        placeholder="Thumbnail URL"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="event_date"
        type="date"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        v-model.number="price"
        type="number"
        placeholder="Price"
        min="0"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="event_organizer"
        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled value="">Select Organizer</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.username }}
        </option>
      </select>
      <button
        type="submit"
        class="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Create Event
      </button>
    </form>
  </div>
</template>

<script>
import apiClient from "@/services/apiClient";

export default {
  data() {
    return {
      title: "",
      location: "N/A",
      town: "N/A",
      country: "Kenya",
      content: "",
      thumbnail_img: null,
      thumbnail_url: "",
      event_date: "2025-01-01",
      price: 0,
      event_organizer: "",
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiClient.get("/users/");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    handleFileUpload(event) {
      this.thumbnail_img = event.target.files[0];
    },
    async createEvent() {
      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("location", this.location);
        formData.append("town", this.town);
        formData.append("country", this.country);
        formData.append("content", this.content);
        if (this.thumbnail_img) {
          formData.append("thumbnail_img", this.thumbnail_img);
        }
        formData.append("thumbnail_url", this.thumbnail_url);
        formData.append("event_date", this.event_date);
        formData.append("price", this.price);
        formData.append("event_organizer", this.event_organizer);

        const response = await apiClient.post("/events/", formData);
        console.log("Event created:", response.data);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Optional: Adjust file input for consistent styling across browsers */
input[type="file"]::-webkit-file-upload-button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

input[type="file"]::-webkit-file-upload-button:hover {
  background-color: #f3f4f6;
}
</style>
