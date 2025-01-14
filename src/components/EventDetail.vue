<template>
    <section>
        <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
    
        <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-event-primary/80 text-white text-sm rounded-full">
          {{event.category}}
        </span>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-event-dark mb-2 line-clamp-2">
            {{ event.title }}
        </h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-event-muted">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{{ event.date }}</span>
          </div>
          <div className="flex items-center text-event-muted">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{{event.location}}, {{event.town}}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button @click="redirectToPayment" class="pay-button" className="px-4 py-2 bg-gradient-to-r from-event-primary to-purple-500 text-white rounded-md hover:opacity-90 transition-opacity">
            KES {{ event.price || 0 }}
          </button>
          <button className="flex items-center text-event-primary hover:text-purple-700 transition-colors">
            Read more
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
        <h1>{{ event.title }}</h1>
        <p>{{ event.description }}</p>
        <button @click="redirectToPayment" class="pay-button">
            Pay KES {{ event.price || 0 }}
        </button>
    </section>
</template>

<script>
import api from '../services/apiClient';

export default {
    name: 'EventDetail',
    data() {
        return {
            event: null,
        };
    },
    async mounted() {
        const { eventId } = this.$route.params;
        const response = await api.getEvent(eventId);
        this.event = response.data;
    },
    methods: {
        redirectToPayment() {
            this.$router.push({ name: 'process-payment', params: { eventId: this.event.id } });
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
}
</style>
