import axios from 'axios';
import Cookies from 'js-cookie'; // Assuming js-cookie is being used for managing cookies

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://liveinnbo-backend.onrender.com/api/v1',
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
      sameSite: 'Lax',
      domain: '.onrender.com'
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
    // Check if the request method is POST, PUT, or DELETE
    if (['post', 'put', 'delete'].includes(config.method)) {
      let csrfToken = Cookies.get('csrftoken');

      if (!csrfToken) {
        csrfToken = await fetchCSRFToken();
        Cookies.set('csrftoken', csrfToken);
      }

      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
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
      // You might want to redirect to login or refresh token here
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Export the API functions
export default {
  fetchCSRFToken,
  // Blog APIs
  getBlogs(page = 1) {
    return apiClient.get(`/blogs/?page=${page}`).catch(handleError);
  },

  createBlog(data) {
    return apiClient.post(`/blogs/`, data).catch(handleError);
  },

  getBlog(slug) {
    return apiClient.get(`/blogs/${slug}/`).catch(handleError);
  },

  updateBlog(slug, data) {
    return apiClient.put(`/blogs/${slug}/`, data).catch(handleError);
  },

  deleteBlog(slug) {
    return apiClient.delete(`/blogs/${slug}/`).catch(handleError);
  },

  // Event APIs
  getEvents(page = 1) {
    return apiClient.get(`/events/?page=${page}`).catch(handleError);
  },

  createEvent(data) {
    return apiClient.post(`/events/`, data).catch(handleError);
  },

  getEvent(eventId) {
    return apiClient.get(`/events/${eventId}/`).catch(handleError);
  },

  updateEvent(eventId, data) {
    return apiClient.put(`/events/${eventId}/`, data).catch(handleError);
  },

  deleteEvent(eventId) {
    return apiClient.delete(`/events/${eventId}/`).catch(handleError);
  },

  // Payment APIs
  verifyTicket(data) {
    return apiClient.post('/payments/verify_ticket/', data).catch(handleError);
  },

  initializePayment(paymentData) {
    return apiClient
      .post(`/payments/process/${paymentData.eventId}/`, paymentData)
      .catch(handleError);
  },

  verifyPayment(reference) {
    return apiClient
      .get(`/payments/verify_payment/?reference=${reference}`)
      .catch(handleError);
  },

  thankYou(transactionId) {
    return apiClient
      .get(`/payments/thankyou/${transactionId}/`)
      .catch(handleError);
  },

  // Authentication APIs
  async authSignUp(data) {
    await this.fetchCSRFToken();
    return apiClient.post('/users/auth/signup/', data).catch(handleError);
  },

  async authSignIn(credentials) {
    await this.fetchCSRFToken();
    return apiClient.post('/users/auth/signin/', credentials).catch(handleError);
  },

  authSignOut() {
    return apiClient.post('/users/auth/signout/').catch(handleError);
  },

  // User APIs
  updateProfile(data) {
    return apiClient.put('/users/update_profile/', data).catch(handleError);
  },

  deleteProfile() {
    return apiClient.delete('/users/delete_account/').catch(handleError);
  },

  getUsers() {
    return apiClient.get('/users/').catch(handleError);
  },

  getUser(userId) {
    return apiClient.get(`/users/${userId}/`).catch(handleError);
  },

  //CSRF API
  getCsrf(){
    return apiClient.get('/users/csrf').catch(handleError);
  }
};
