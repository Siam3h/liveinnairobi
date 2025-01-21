<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- User Profile Section -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <!-- Profile Header -->
          <div class="flex items-center space-x-6">
            <div class="shrink-0">
              <img 
                :src="userData?.avatar || '/default-avatar.png'" 
                class="h-24 w-24 object-cover rounded-full"
                alt="Profile avatar"
              />
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">{{ userData?.username }}</h2>
                  <p class="text-sm text-gray-500">{{ userData?.email }}</p>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ userData?.agency_name ? `Agency: ${userData.agency_name}` : '' }}
                  </p>
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-blue-100 text-blue-800': userData?.role === 'event_organizer',
                      'bg-green-100 text-green-800': userData?.role === 'author'
                    }"
                  >
                    {{ formatRole(userData?.role) }}
                  </span>
                </div>
                <router-link 
                  :to="{ name: 'update-profile' }" 
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </router-link>
              </div>
            </div>
          </div>

          <!-- Bio Section -->
          <div class="mt-6" v-if="userData?.bio">
            <h3 class="text-lg font-medium text-gray-900">About</h3>
            <p class="mt-2 text-gray-600 whitespace-pre-line">{{ userData.bio }}</p>
          </div>
        </div>
      </div>

      <!-- Content Tabs -->
      <div class="mb-6">
        <nav class="flex space-x-4">
          <button 
            v-for="tab in ['blogs', 'events', 'transactions']" 
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium',
              activeTab === tab 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </nav>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 text-red-800 p-4 rounded-md mb-6">
        {{ error }}
      </div>

      <!-- Blogs Tab Content -->
      <div v-else-if="activeTab === 'blogs'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">My Blogs</h2>
          <router-link 
            to="/blogs/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Blog
          </router-link>
        </div>

        <div v-if="blogs.length === 0" class="text-center py-12 bg-white rounded-lg">
          <p class="text-gray-500">You haven't created any blogs yet.</p>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="blog in blogs" :key="blog.id" class="bg-white rounded-lg shadow">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">{{ blog.title }}</h3>
              <p class="mt-2 text-gray-600 line-clamp-3">{{ blog.content }}</p>
              <div class="mt-4 flex justify-end space-x-2">
                <router-link 
                  :to="`/blogs/${blog.slug}/edit`"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </router-link>
                <button 
                  @click="deleteBlog(blog.slug)"
                  class="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Events Tab Content -->
      <div v-else-if="activeTab === 'events'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">My Events</h2>
          <router-link 
            to="/events/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Event
          </router-link>
        </div>

        <div v-if="events.length === 0" class="text-center py-12 bg-white rounded-lg">
          <p class="text-gray-500">You haven't created any events yet.</p>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow">
            <img 
              v-if="event.image_url" 
              :src="event.image_url" 
              :alt="event.title"
              class="w-full h-48 object-cover rounded-t-lg"
            >
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">{{ event.title }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ formatDate(event.date) }}</p>
              <p class="mt-2 text-gray-600 line-clamp-3">{{ event.description }}</p>
              <div class="mt-4 flex justify-end space-x-2">
                <router-link 
                  :to="`/events/${event.id}/edit`"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </router-link>
                <button 
                  @click="deleteEvent(event.id)"
                  class="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Tab Content -->
      <div v-else-if="activeTab === 'transactions'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Transactions</h2>
          <div class="text-lg font-medium text-green-600">
            Total Earnings: {{ formatCurrency(totalEarnings) }}
          </div>
        </div>

        <div v-if="transactions.length === 0" class="text-center py-12 bg-white rounded-lg">
          <p class="text-gray-500">No transactions recorded yet.</p>
        </div>

        <template v-else>
          <!-- Transaction Charts -->
          <div class="grid gap-6 md:grid-cols-2">
            <!-- Monthly Revenue Chart -->
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Monthly Revenue</h3>
              <MonthlyRevenueChart :chart-data="monthlyRevenueData" />
            </div>
            
            <!-- Transaction Status Chart -->
            <div class="bg-white p-6 rounded-lg shadow">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Transaction Status</h3>
              <TransactionStatusChart :chart-data="transactionStatusData" />
            </div>
          </div>

          <!-- Transaction Table -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 class="text-lg font-medium text-gray-900">Transaction History</h3>
              <div class="flex space-x-2">
                <select 
                  v-model="transactionFilter" 
                  class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ transaction.event_title }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ transaction.buyer_email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(transaction.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(transaction.amount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import apiClient from '@/services/apiClient';
import { MonthlyRevenueChart, TransactionStatusChart } from '@/components/charts';

export default {
  components: {
    MonthlyRevenueChart,
    TransactionStatusChart
  },
  
  setup() {
    const userData = ref(null);
    const blogs = ref([]);
    const events = ref([]);
    const transactions = ref([]);
    const totalEarnings = ref(0);
    const activeTab = ref('blogs');
    const isLoading = ref(true);
    const error = ref(null);
    const transactionFilter = ref('all');

    const formatRole = (role) => {
      if (!role) return '';
      return role.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

    const loadDashboardData = async () => {
      try {
        isLoading.value = true;
        error.value = null;

        const response = await apiClient.getDashboard();
        const data = response.data;
        
        userData.value = data.user;
        blogs.value = data.blogs;
        events.value = data.events;
        transactions.value = data.transactions;
        totalEarnings.value = data.total_earnings;

      } catch (err) {
        console.error('Error loading dashboard data:', err);
        error.value = 'Failed to load dashboard data. Please try again later.';
      } finally {
        isLoading.value = false;
      }
    };

    const deleteBlog = async (slug) => {
      if (!confirm('Are you sure you want to delete this blog?')) return;
      
      try {
        await apiClient.deleteBlog(slug);
        blogs.value = blogs.value.filter(blog => blog.slug !== slug);
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog. Please try again.');
      }
    };

    const deleteEvent = async (id) => {
      if (!confirm('Are you sure you want to delete this event?')) return;
      
      try {
        await apiClient.deleteEvent(id);
        events.value = events.value.filter(event => event.id !== id);
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again.');
      }
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
      }).format(amount);
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    // Computed properties for charts and filtered transactions
    const monthlyRevenueData = computed(() => {
      const monthlyData = {};
      transactions.value.forEach(transaction => {
        const date = new Date(transaction.created_at);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        monthlyData[monthYear] = (monthlyData[monthYear] || 0) + transaction.amount;
      });
      return {
        labels: Object.keys(monthlyData),
        datasets: [{
          label: 'Revenue',
          data: Object.values(monthlyData),
          backgroundColor: 'rgba(79, 70, 229, 0.2)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 1
        }]
      };
    });

    const transactionStatusData = computed(() => {
      const statusCount = {
        completed: transactions.value.filter(t => t.status === 'completed').length,
        pending: transactions.value.filter(t => t.status === 'pending').length
      };
      return {
        labels: ['Completed', 'Pending'],
        datasets: [{
          data: [statusCount.completed, statusCount.pending],
          backgroundColor: ['rgba(34, 197, 94, 0.2)', 'rgba(234, 179, 8, 0.2)'],
          borderColor: ['rgba(34, 197, 94, 1)', 'rgba(234, 179, 8, 1)'],
          borderWidth: 1
        }]
      };
    });

    const filteredTransactions = computed(() => {
      if (transactionFilter.value === 'all') return transactions.value;
      return transactions.value.filter(t => t.status === transactionFilter.value);
    });

    onMounted(loadDashboardData);

    return {
      userData,
      blogs,
      events,
      transactions,
      totalEarnings,
      activeTab,
      isLoading,
      error,
      formatCurrency,
      formatDate,
      deleteBlog,
      deleteEvent,
      transactionFilter,
      filteredTransactions,
      monthlyRevenueData,
      transactionStatusData,
      formatRole
    };
  }
};
</script>

<style>

</style>