import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance
class ApiClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      withCredentials: true, // Allow cookies to be sent with the request
    });

    // Add request interceptor to inject token and CSRF token
    this.client.interceptors.request.use(
      async (config) => {
        // Inject Authorization token
        const token = Cookies.get('token'); // Use cookies for auth token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Inject CSRF token
        const csrfToken = Cookies.get('csrftoken'); // Fetch CSRF token from cookies
        if (csrfToken) {
          config.headers['X-CSRFToken'] = csrfToken;
        } else {
          // If CSRF token is not in cookies, fetch it
          await this.fetchCSRFToken();
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token expiration and CSRF errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already tried to refresh
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh token
            const refreshToken = Cookies.get('refreshToken');
            const response = await this.refreshAuthToken(refreshToken);

            const { token } = response.data;
            Cookies.set('token', token);

            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.client(originalRequest);
          } catch (error) {
            // If refresh fails, redirect to login
            this.handleAuthError();
            return Promise.reject(error);
          }
        }

        // Handle CSRF token errors (403)
        if (
          error.response?.status === 403 &&
          error.response?.data?.detail === 'CSRF Failed' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          let csrfToken = Cookies.get('csrftoken'); // Check cookies
          if (!csrfToken) {
            csrfToken = await this.fetchCSRFToken(); // Fetch if not in cookies
            Cookies.set('csrftoken', csrfToken); // Store in cookies
          }
          if (csrfToken) {
            originalRequest.headers['X-CSRFToken'] = csrfToken;
            return this.client(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Method to fetch CSRF token
  async fetchCSRFToken() {
    try {
      const response = await this.client.get('/users/csrf/');
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

  // Method to refresh the authentication token
  async refreshAuthToken(refreshToken) {
    return this.client.post('/auth/refresh', { refreshToken });
  }

  // Method to handle authentication errors
  handleAuthError() {
    // Clear tokens
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    Cookies.remove('csrftoken');

    // Redirect to login page
    window.location.href = '/login';
  }

  // Handle generic API errors
  handleError(error) {
    console.error('API Error:', error.response?.data?.message || error.message || 'An error occurred');
    throw error;
  }

  // API functions
  // Dashboard endpoint
  async getDashboard() {
    return this.client.get('/users/dashboard/').catch(this.handleError);
  }

  // Blog APIs
  getBlogs(page = 1) {
    return this.client.get(`/blogs/?page=${page}`).catch(this.handleError);
  }

  createBlog(data) {
    return this.client.post(`/blogs/`, data).catch(this.handleError);
  }

  getBlog(slug) {
    return this.client.get(`/blogs/${slug}/`).catch(this.handleError);
  }

  updateBlog(slug, data) {
    return this.client.put(`/blogs/${slug}/`, data).catch(this.handleError);
  }

  deleteBlog(slug) {
    return this.client.delete(`/blogs/${slug}/`).catch(this.handleError);
  }

  // Event APIs
  getEvents(page = 1) {
    return this.client.get(`/events/?page=${page}`).catch(this.handleError);
  }

  createEvent(data) {
    return this.client.post(`/events/`, data).catch(this.handleError);
  }

  getEvent(eventId) {
    return this.client.get(`/events/${eventId}/`).catch(this.handleError);
  }

  updateEvent(eventId, data) {
    return this.client.put(`/events/${eventId}/`, data).catch(this.handleError);
  }

  deleteEvent(eventId) {
    return this.client.delete(`/events/${eventId}/`).catch(this.handleError);
  }

  // Payment APIs
  verifyTicket(data) {
    return this.client.post('/payments/verify_ticket/', data).catch(this.handleError);
  }

  initializePayment(paymentData) {
    return this.client
      .post(`/payments/process/${paymentData.eventId}/`, paymentData)
      .catch(this.handleError);
  }

  verifyPayment(reference) {
    return this.client
      .get(`/payments/verify_payment/?reference=${reference}`)
      .catch(this.handleError);
  }

  thankYou(transactionId) {
    return this.client
      .get(`/payments/thankyou/${transactionId}/`)
      .catch(this.handleError);
  }

  // Authentication APIs
  authSignUp(data) {
    return this.client.post('/users/auth/signup/', data).catch(this.handleError);
  }

  authSignIn(credentials) {
    return this.client.post('/users/auth/signin/', credentials).catch(this.handleError);
  }

  authSignOut() {
    return this.client.post('/users/auth/signout/').catch(this.handleError);
  }

  // User APIs
  updateProfile(data) {
    return this.client.put('/users/update_profile/', data).catch(this.handleError);
  }

  deleteProfile() {
    return this.client.delete('/users/delete_account/').catch(this.handleError);
  }

  getUsers() {
    return this.client.get('/users/').catch(this.handleError);
  }

  getUser(userId) {
    return this.client.get(`/users/${userId}/`).catch(this.handleError);
  }

  // CSRF API
  getCsrf() {
    return this.client.get('/users/csrf').catch(this.handleError);
  }
}

export default ApiClient;
