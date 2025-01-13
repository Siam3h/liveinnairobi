import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'https://liveinnbo-backend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// RequestInterceptor
apiClient.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle CSRF token errors
    if (error.response?.status === 403 && error.response?.data?.detail === 'CSRF Failed' && !originalRequest._retry) {
      originalRequest._retry = true;
      const csrfToken = Cookies.get('csrftoken');
      if (csrfToken) {
        originalRequest.headers['X-CSRFToken'] = csrfToken;
        return apiClient(originalRequest);
      }
    }

    // Handle authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // You might want to redirect to login or refresh token here
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

const handleError = (error) => {
  const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
  console.error('API Error:', errorMessage);
  throw error;
};

export default {
  // Blog APIs
  getBlogs(page = 1) {
    return apiClient.get(`/blogs/?page=${page}`).catch(handleError);
  },

  getBlog(slug) {
    return apiClient.get(`/blogs/${slug}/`).catch(handleError);
  },

  // Event APIs
  getEvents(page = 1) {
    return apiClient.get(`/events/?page=${page}`).catch(handleError);
  },

  getEvent(eventId) {
    return apiClient.get(`/events/${eventId}/`).catch(handleError);
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

  // Auth APIs
  authSignUp(data) {
    return apiClient.post('/users/auth/signup/', data).catch(handleError);
  },

  authSignIn(credentials) {
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
  }
};