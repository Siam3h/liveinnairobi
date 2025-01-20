<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Welcome, {{ user?.username }}</h1>
      <p class="email">{{ user?.email }}</p>
    </div>

    <!-- Stats Overview -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Events</h3>
        <p>{{ userEvents.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Blogs</h3>
        <p>{{ userBlogs.length }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Transactions</h3>
        <p>{{ userTransactions.length }}</p>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="tabs">
      <button 
        :class="['tab-btn', { active: activeTab === 'events' }]"
        @click="activeTab = 'events'"
      >
        My Events
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'blogs' }]"
        @click="activeTab = 'blogs'"
      >
        My Blogs
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'transactions' }]"
        @click="activeTab = 'transactions'"
      >
        My Transactions
      </button>
    </div>

    <!-- Content Sections -->
    <div class="tab-content">
      <!-- Events Tab -->
      <div v-if="activeTab === 'events'" class="content-section">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="userEvents.length === 0" class="empty-state">
          No events created yet
        </div>
        <div v-else class="grid-layout">
          <div v-for="event in userEvents" :key="event.id" class="card">
            <img :src="event.thumbnail_url || '/default-event.jpg'" :alt="event.title">
            <div class="card-content">
              <h3>{{ event.title }}</h3>
              <p>{{ event.event_date }}</p>
              <div class="card-actions">
                <router-link :to="`/events/${event.id}/edit`" class="btn-edit">
                  Edit
                </router-link>
                <button @click="deleteEvent(event.id)" class="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blogs Tab -->
      <div v-if="activeTab === 'blogs'" class="content-section">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="userBlogs.length === 0" class="empty-state">
          No blogs written yet
        </div>
        <div v-else class="grid-layout">
          <div v-for="blog in userBlogs" :key="blog.id" class="card">
            <img :src="blog.thumbnail_url || '/default-blog.jpg'" :alt="blog.title">
            <div class="card-content">
              <h3>{{ blog.title }}</h3>
              <p>{{ blog.time }}</p>
              <span :class="['status-badge', blog.is_approved ? 'approved' : 'pending']">
                {{ blog.is_approved ? 'Approved' : 'Pending' }}
              </span>
              <div class="card-actions">
                <router-link :to="`/blogs/${blog.slug}/edit`" class="btn-edit">
                  Edit
                </router-link>
                <button @click="deleteBlog(blog.id)" class="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Tab -->
      <div v-if="activeTab === 'transactions'" class="content-section">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="userTransactions.length === 0" class="empty-state">
          No transactions yet
        </div>
        <div v-else class="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Status</th>
                <th>Ticket Valid</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in userTransactions" :key="transaction.id">
                <td>{{ transaction.event.title }}</td>
                <td>KES {{ transaction.amount }}</td>
                <td>{{ transaction.ref }}</td>
                <td>
                  <span :class="['status-badge', transaction.is_verified ? 'success' : 'pending']">
                    {{ transaction.is_verified ? 'Verified' : 'Pending' }}
                  </span>
                </td>
                <td>
                  <span :class="['status-badge', transaction.is_valid ? 'success' : 'used']">
                    {{ transaction.is_valid ? 'Valid' : 'Used' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

export default {
  name: 'Dashboard',
  setup() {
    const store = useStore()
    const activeTab = ref('events')
    const loading = ref(false)
    const userEvents = ref([])
    const userBlogs = ref([])
    const userTransactions = ref([])
    const user = ref(store.state.auth.user)

    const fetchUserData = async () => {
      loading.value = true
      try {
        const userId = user.value.id
        const [eventsRes, blogsRes, transactionsRes] = await Promise.all([
          axios.get(`/api/events/user/${userId}/`),
          axios.get(`/api/blogs/user/${userId}/`),
          axios.get(`/api/payments/user/${userId}/transactions/`)
        ])

        userEvents.value = eventsRes.data
        userBlogs.value = blogsRes.data
        userTransactions.value = transactionsRes.data
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        loading.value = false
      }
    }

    const deleteEvent = async (eventId) => {
      if (confirm('Are you sure you want to delete this event?')) {
        try {
          await axios.delete(`/api/events/${eventId}/`)
          userEvents.value = userEvents.value.filter(event => event.id !== eventId)
        } catch (error) {
          console.error('Error deleting event:', error)
        }
      }
    }

    const deleteBlog = async (blogId) => {
      if (confirm('Are you sure you want to delete this blog?')) {
        try {
          await axios.delete(`/api/blogs/${blogId}/`)
          userBlogs.value = userBlogs.value.filter(blog => blog.id !== blogId)
        } catch (error) {
          console.error('Error deleting blog:', error)
        }
      }
    }

    onMounted(() => {
      fetchUserData()
    })

    return {
      activeTab,
      loading,
      userEvents,
      userBlogs,
      userTransactions,
      user,
      deleteEvent,
      deleteBlog
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.email {
  color: #666;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: #007bff;
  color: white;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-edit, .btn-delete {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-edit {
  background: #007bff;
  color: white;
  text-decoration: none;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.transactions-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.success { background: #28a745; color: white; }
.pending { background: #ffc107; color: black; }
.used { background: #6c757d; color: white; }

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.loading {
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    flex-direction: column;
  }
  
  .grid-layout {
    grid-template-columns: 1fr;
  }
}
</style> 