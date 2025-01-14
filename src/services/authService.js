import axios from 'axios';
import Cookies from 'js-cookie';

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

// Authentication service
const authService = {
  // Fetch CSRF token
  async fetchCSRFToken() {
    try {
      const response = await apiClient.get('/users/csrf/');
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
  },

  // Sign up
  async authSignUp(data) {
    await this.fetchCSRFToken();
    return apiClient.post('/users/auth/signup/', data).catch(handleError);
  },

  // Sign in
  async authSignIn(credentials) {
    await this.fetchCSRFToken();
    return apiClient.post('/users/auth/signin/', credentials).catch(handleError);
  }
};

// Request Interceptor: Adds CSRF token to specific request methods
apiClient.interceptors.request.use(
  async (config) => {
    if (['post', 'put', 'delete'].includes(config.method)) {
      let csrfToken = Cookies.get('csrftoken');

      if (!csrfToken) {
        csrfToken = await authService.fetchCSRFToken();
      }

      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
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
      const csrfToken = await authService.fetchCSRFToken();
      if (csrfToken) {
        originalRequest.headers['X-CSRFToken'] = csrfToken;
        return apiClient(originalRequest);
      }
    }

    // Handle authentication errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default authService;