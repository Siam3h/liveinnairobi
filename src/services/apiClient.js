import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'https://liveinnbo-backend-npgz.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Handle generic API errors
const handleError = (error) => {
  const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
  console.error('API Error:', errorMessage);
  throw error;
};

// Fetch CSRF token
async function fetchCSRFToken() {
  try {
    const response = await apiClient.get('/users/csrf/');
    console.log(response.data.csrfToken);
    const csrfToken = response.data.csrfToken;
    Cookies.set('csrftoken', csrfToken, {
      secure: true,
      sameSite: 'None',
      domain: 'None',
    });
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}

// Request Interceptor: Adds CSRF token to specific request methods (POST, PUT, DELETE)
apiClient.interceptors.request.use(
  async (config) => {
    let csrfToken = Cookies.get('csrftoken');
    const token = localStorage.getItem('token');

    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles CSRF and authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle CSRF token errors (403)
    if (
      error.response?.status === 403 &&
      error.response?.data?.detail === 'CSRF Failed' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      let csrfToken = Cookies.get('csrftoken'); // Check cookies
      if (!csrfToken) {
        csrfToken = await fetchCSRFToken(); // Fetch if not in cookies
        Cookies.set('csrftoken', csrfToken); // Store in cookies
      }
      if (csrfToken) {
        originalRequest.headers['X-CSRFToken'] = csrfToken;
        return apiClient(originalRequest);
      }
    }

    // Handle authentication errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/signin';
    }

    return Promise.reject(error);
  }
);

// Export the API functions
export default {
  fetchCSRFToken,
  // Blog APIs
  getBlogs(page = 1) {
    return apiClient.get(`blogs/?page=${page}`).catch(handleError);
  },

  getBlog(slug) {
    return apiClient.get(`blogs/${slug}/`).catch(handleError);
  },

  async createBlog(data) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    return apiClient.post('blogs/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).catch(handleError);
  },

  async updateBlog(slug, data) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    return apiClient.patch(`blogs/${slug}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).catch(handleError);
  },

  deleteBlog(slug) {
    return apiClient.delete(`blogs/${slug}/`).catch(handleError);
  },

  // Event APIs
  getEvents(page = 1) {
    return apiClient.get(`events/?page=${page}`).catch(handleError);
  },

  getEvent(slug) {
    return apiClient.get(`events/event/${slug}/`).catch(handleError);
  },


    async createEvent(data) {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'thumbnail_url' && data[key] !== undefined && data[key] !== null) {
                formData.append(key, data[key]);
            }
        });
        return apiClient.post('events/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).catch(handleError);
    },

  async updateEvent(eventId, data) {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    return apiClient.put(`events/${eventId}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).catch(handleError);
  },

  deleteEvent(eventId) {
    return apiClient.delete(`events/${eventId}/`).catch(handleError);
  },

  // Payment APIs
  verifyTicket(data) {
    return apiClient.post('payments/verify_ticket/', data).catch(handleError);
  },

  initializePayment(paymentData) {
    return apiClient.post(`payments/process/${paymentData.eventId}/`, paymentData).catch(handleError);
  },

  verifyPayment(reference) {
    return apiClient.get(`payments/verify_payment/?reference=${reference}`).catch(handleError);
  },

  thankYou(transactionId) {
    return apiClient.get(`/payments/thankyou/${transactionId}/`).catch(handleError);
  },

  // Authentication APIs
  async authSignUp(data) {
    console.log('Sending registration data to API:', data); // Debug log
    return apiClient.post('auth/register/', {
      email: data.email,
      username: data.username,
      password: data.password,
      password2: data.password2
    });
  },

  async authSignIn(credentials) {
    return apiClient.post('auth/login/', {
      username: credentials.email,
      password: credentials.password
    }).catch(handleError);
  },

  async authSignOut() {
    const response = await apiClient.post('auth/logout/').catch(handleError);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response;
  },

  // User APIs
  async getDashboard() {
    return apiClient.get('auth/dashboard/');
  },

  // Update the profile with the new data
  async updateProfile(data) {
    const formData = new FormData();
    
    // Add fields to FormData
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

      const response = await apiClient.put('auth/update_profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file uploads
        },
      });
      return response;
  },

  async deleteProfile() {
    await this.fetchCSRFToken();
    return apiClient.delete('auth/delete_account/').catch(handleError);
  },

  async getUsers() {
    await this.fetchCSRFToken();
    return apiClient.get('/users/').catch(handleError);
  },

  async getUser(userId) {
    await this.fetchCSRFToken();
    return apiClient.get(`/users/${userId}/`).catch(handleError);
  },

  // CSRF API
  getCsrf() {
    return apiClient.get('/users/csrf').catch(handleError);
  },
};
