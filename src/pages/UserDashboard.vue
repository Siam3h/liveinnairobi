<template>
  <div class="dashboard-container p-8 bg-gray-50">
    <!-- Loading and Error States -->
    <div v-if="isLoading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>

    <!-- Dashboard Card -->
    <div v-else class="dashboard-card bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto">
      <div class="flex items-center mb-6">
        <img :src="user.avatar ? user.avatar : '/media/avatars/default_avatar.png'" 
             alt="User Avatar" 
             class="w-24 h-24 rounded-full border-4 border-gray-300 mr-6" />
        <div>
          <h2 class="text-3xl font-semibold text-gray-800">Welcome, {{ user.username }}</h2>
          <p class="text-lg text-gray-600">{{ user.role }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-4 mb-6">
        <router-link to="/auth/signout" class="inline-block px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none">
          Sign Out
        </router-link>
        <router-link to="/user/update-profile" class="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
          Update Profile
        </router-link>
      </div>

      <!-- User Information -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2 text-gray-700">Email</h3>
          <p class="text-gray-600">{{ user.email }}</p>
        </div>
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2 text-gray-700">Agency Name</h3>
          <p class="text-gray-600">{{ user.agency_name }}</p>
        </div>
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2 text-gray-700">Bio</h3>
          <p class="text-gray-600">{{ user.bio }}</p>
        </div>
      </div>

      <!-- Events Section -->
      <h3 class="text-2xl font-semibold mb-4 text-gray-700">Your Events</h3>
      <ul v-if="events.length > 0" class="space-y-4">
        <li v-for="event in events" :key="event.title" class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 class="font-medium text-gray-800 text-xl">{{ event.title }}</h4>
          <p class="text-gray-600 mt-2">{{ event.description }}</p>
          <p class="text-gray-500 mt-2"><strong>Date:</strong> {{ event.date }}</p>
        </li>
      </ul>
      <p v-else class="text-gray-500 italic mb-6">No events available at this time.</p>

      <!-- Blogs Section -->
      <h3 class="text-2xl font-semibold mb-4 text-gray-700">Your Blogs</h3>
      <ul v-if="blogs.length > 0" class="space-y-4">
        <li v-for="blog in blogs" :key="blog.title" class="bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 class="font-medium text-gray-800 text-xl">{{ blog.title }}</h4>
          <p class="text-gray-600 mt-2">{{ blog.content }}</p>
        </li>
      </ul>
      <p v-else class="text-gray-500 italic mb-6">No blogs available at this time.</p>

      <!-- Transactions Section -->
      <h3 class="text-2xl font-semibold mb-4 text-gray-700">Your Transactions</h3>
      <div v-if="transactions.length > 0">
        <!-- Transaction Table -->
        <table class="w-full border-collapse border border-gray-300 mb-8 rounded-lg">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-4 text-left">Event</th>
              <th class="border border-gray-300 p-4 text-left">Name</th>
              <th class="border border-gray-300 p-4 text-left">Email</th>
              <th class="border border-gray-300 p-4 text-left">Phone</th>
              <th class="border border-gray-300 p-4 text-left">Amount</th>
              <th class="border border-gray-300 p-4 text-left">Reference</th>
              <th class="border border-gray-300 p-4 text-left">Verified</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="text-gray-700">
              <td class="border border-gray-300 p-4">{{ transaction.event.title }}</td>
              <td class="border border-gray-300 p-4">{{ transaction.name }}</td>
              <td class="border border-gray-300 p-4">{{ transaction.email }}</td>
              <td class="border border-gray-300 p-4">{{ transaction.phone }}</td>
              <td class="border border-gray-300 p-4">{{ transaction.amount }}</td>
              <td class="border border-gray-300 p-4">{{ transaction.ref }}</td>
              <td class="border border-gray-300 p-4">{{ transaction.is_verified ? 'Yes' : 'No' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Charts Section -->
        <div class="charts flex flex-wrap gap-6">
          <!-- Total Amount Chart -->
          <div class="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h4 class="text-lg font-semibold mb-2">Total Amount by Event</h4>
            <canvas id="amountChart"></canvas>
          </div>
          <!-- Transactions by Verification Status -->
          <div class="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h4 class="text-lg font-semibold mb-2">Transactions by Verification</h4>
            <canvas id="verificationChart"></canvas>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 italic mb-6">No transactions available at this time.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, nextTick } from "vue";  // Import nextTick from vue
import Chart from "chart.js/auto";

export default {
  name: "UserDashboard",
  setup() {
    const user = ref({});
    const events = ref([]);
    const blogs = ref([]);
    const transactions = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    const apiClient = axios.create({
      baseURL: "https://liveinnbo-backend.onrender.com/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const createCharts = () => {
      nextTick(() => {
        const amountChartEl = document.getElementById("amountChart");
        const verificationChartEl = document.getElementById("verificationChart");

        if (!amountChartEl || !verificationChartEl) {
          console.error("Canvas elements for charts not found.");
          return;
        }

        const eventLabels = transactions.value.map((t) => t.event.title);
        const eventAmounts = transactions.value.map((t) => t.amount);
        const verificationCounts = transactions.value.reduce(
          (acc, t) => {
            acc[t.is_verified ? "verified" : "unverified"]++;
            return acc;
          },
          { verified: 0, unverified: 0 }
        );

        // Total Amount by Event Chart
        new Chart(amountChartEl, {
          type: "bar",
          data: {
            labels: eventLabels,
            datasets: [
              {
                label: "Total Amount",
                data: eventAmounts,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });

        // Transactions by Verification Chart
        new Chart(verificationChartEl, {
          type: "pie",
          data: {
            labels: ["Verified", "Unverified"],
            datasets: [
              {
                data: [verificationCounts.verified, verificationCounts.unverified],
                backgroundColor: ["#4CAF50", "#F44336"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      });
    };

    onMounted(async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        if (token && userId) {
          const response = await apiClient.get(`/users/dashboard/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              user_id: userId,
            },
          });

          user.value = response.data.user;
          events.value = response.data.events;
          blogs.value = response.data.blogs;
          transactions.value = response.data.transactions;

          createCharts();
        } else {
          error.value = "Token or user ID not found. Please log in.";
        }
      } catch (err) {
        error.value = "Error fetching dashboard data.";
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    });

    return { user, events, blogs, transactions, isLoading, error };
  },
};
</script>
