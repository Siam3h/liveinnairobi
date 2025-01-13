import axios from 'axios';

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

export default {
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
  },
};
