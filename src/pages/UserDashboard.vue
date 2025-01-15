<template>
  <div class="dashboard-container p-6 bg-gray-50">
    <div v-if="isLoading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="dashboard-card bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Welcome</h2>
      <p class="mb-2"><strong>Email:</strong> {{ user.email }}</p>
      <p class="mb-2"><strong>Name:</strong> {{ user.name }}</p>
      <p class="mb-4"><strong>Role:</strong> {{ user.role }}</p>

      <h3 class="text-xl font-semibold mb-2 text-gray-700">Your Events</h3>
      <ul v-if="events.length > 0" class="mb-4">
        <li v-for="event in events" :key="event.title" class="mb-2 border-b pb-2">
          <h4 class="font-medium text-gray-800">{{ event.title }}</h4>
          <p class="text-gray-600">{{ event.description }}</p>
          <p class="text-gray-600"><strong>Date:</strong> {{ event.date }}</p>
        </li>
      </ul>
      <p v-else class="text-gray-500 italic mb-4">No events available at this time.</p>

      <h3 class="text-xl font-semibold mb-2 text-gray-700">Your Blogs</h3>
      <ul v-if="blogs.length > 0" class="mb-4">
        <li v-for="blog in blogs" :key="blog.title" class="mb-2 border-b pb-2">
          <h4 class="font-medium text-gray-800">{{ blog.title }}</h4>
          <p class="text-gray-600">{{ blog.content }}</p>
        </li>
      </ul>
      <p v-else class="text-gray-500 italic mb-4">No blogs available at this time.</p>

      <h3 class="text-xl font-semibold mb-4 text-gray-700">Your Transactions</h3>
      <div v-if="transactions.length > 0">
        <!-- Table -->
        <table class="w-full border-collapse border border-gray-300 mb-6">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2">Event</th>
              <th class="border border-gray-300 p-2">Name</th>
              <th class="border border-gray-300 p-2">Email</th>
              <th class="border border-gray-300 p-2">Phone</th>
              <th class="border border-gray-300 p-2">Amount</th>
              <th class="border border-gray-300 p-2">Reference</th>
              <th class="border border-gray-300 p-2">Verified</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="text-gray-700">
              <td class="border border-gray-300 p-2">{{ transaction.event.title }}</td>
              <td class="border border-gray-300 p-2">{{ transaction.name }}</td>
              <td class="border border-gray-300 p-2">{{ transaction.email }}</td>
              <td class="border border-gray-300 p-2">{{ transaction.phone }}</td>
              <td class="border border-gray-300 p-2">{{ transaction.amount }}</td>
              <td class="border border-gray-300 p-2">{{ transaction.ref }}</td>
              <td class="border border-gray-300 p-2">{{ transaction.is_verified ? 'Yes' : 'No' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Charts Section -->
        <div class="charts flex flex-wrap gap-6">
          <!-- Total Amount Chart -->
          <div class="w-full md:w-1/2 p-4 bg-white rounded shadow-md">
            <h4 class="text-lg font-semibold mb-2">Total Amount by Event</h4>
            <canvas id="amountChart"></canvas>
          </div>
          <!-- Transactions by Verification Status -->
          <div class="w-full md:w-1/2 p-4 bg-white rounded shadow-md">
            <h4 class="text-lg font-semibold mb-2">Transactions by Verification</h4>
            <canvas id="verificationChart"></canvas>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 italic">No transactions available at this time.</p>
    </div>
  </div>
</template>

  
  <script>
import axios from "axios";
import { ref, onMounted } from "vue";
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
      new Chart(document.getElementById("amountChart"), {
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
      });

      // Transactions by Verification Chart
      new Chart(document.getElementById("verificationChart"), {
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
  
  <style scoped>
  .dashboard-container {
    padding: 20px;
  }
  
  .dashboard-card {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #333;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 15px;
  }
  
  h4 {
    margin: 5px 0;
    font-size: 1.2em;
  }
  
  p {
    margin: 5px 0;
    font-size: 1em;
  }

  .empty-state {
    color: #888;
    font-style: italic;
}

  </style>
  