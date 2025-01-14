<template>
  <section>
    <div class="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm">
      <!-- Image Container -->
      <div class="relative h-48 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img
          :src="defaultImage"
          alt="Event Thumbnail"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span class="absolute top-4 left-4 z-20 px-3 py-1 bg-event-primary/80 text-white text-sm rounded-full">
          {{ event.country }}
        </span>
      </div>
      <!-- Content -->
      <div class="p-5">
        <h3 class="text-xl font-semibold text-event-dark mb-2 line-clamp-2">
          {{ event.title }}
        </h3>
        <div class="space-y-2 mb-4">
          <div class="flex items-center text-event-muted">
            <Calendar class="w-4 h-4 mr-2" />
            <span class="text-sm">{{ event.event_date }}</span>
          </div>
          <div class="flex items-center text-event-muted">
            <MapPin class="w-4 h-4 mr-2" />
            <span class="text-sm">{{ event.location }}, {{ event.town }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4">
          <button
            @click="redirectToPayment"
            class="pay-button"
          >
            KES {{ event.price || 0 }}
          </button>
          <button @click="redirectToEventDetail" class="flex items-center text-event-primary hover:text-purple-700 transition-colors">
            Read more
            <ArrowRight class="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import api from "../services/apiClient";

export default {
  name: "EventDetail",
  data() {
    return {
      event: null,
      defaultImage: "https://via.placeholder.com/150", // Placeholder image if none is provided
    };
  },
  async mounted() {
    const { eventId } = this.$route.params;
    try {
      const response = await api.getEvent(eventId);
      this.event = response.data;
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  },
  methods: {
    redirectToPayment() {
      this.$router.push({ name: "process-payment", params: { eventId: this.event.id } });
    },
    redirectToEventDetail() {
      this.$router.push({ name: "event-detail", params: { eventId: this.event.id } });
    },
  },
};
</script>

<style scoped>
.pay-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.pay-button:hover {
  background-color: #0056b3;
}
</style>
