import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'https://liveinnbo-backend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true     
});

// Add request interceptor to include CSRF token
apiClient.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle CSRF token refresh
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403 && error.response.data.detail === 'CSRF Failed') {
      // Retry the request once
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken) {
          originalRequest.headers['X-CSRFToken'] = csrfToken;
        }
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);


export default {
    // Blog APIs
    getBlogs(page = 1) {
        return apiClient.get(`/blogs/?page=${page}`);
    },
    getBlog(slug) {
        return apiClient.get(`/blogs/${slug}/`);
    },
    // Event APIs
    getEvents(page = 1) {
        return apiClient.get(`/events/?page=${page}`);
    },
    getEvent(eventId) {
        return apiClient.get(`/events/${eventId}/`);
    },

    verifyTicket(data) {
        const csrfToken = Cookies.get('csrftoken'); 
        return apiClient.post(`/payments/verify_ticket/`, data,
            {
                headers: {
                    'X-CSRFToken': csrfToken, 
                },
            }
        );
    },

    // Payment APIs
    initializePayment(paymentData) {
        //console.log("Payment data:", paymentData); 
        return apiClient.post(`/payments/process/${paymentData.eventId}/`, paymentData);
    },
    verifyPayment(reference) {
        return apiClient.get(`/payments/verify_payment/?reference=${reference}`);
    },
    thankYou(transactionId) {
        return apiClient.get(`/payments/thankyou/${transactionId}/`);
    },
    
    // Auth APIs
    authSignUp(data) {
        return apiClient.post('/users/auth/signup/', data);
    },      
    authSignIn(){
        return apiClient.post(`/users/auth/signin/`)
    },
    authSignOut(){
        return apiClient.post(`/users/auth/signout/`)
    },
    updateProfile(){
        return apiClient.put(`/update_profile/`)
    },
    deleteProfile(){
        return apiClient.delete(`/delete_account/`)
    },
    
    // User APIs
    getUsers() {
        return apiClient.get('/users/');
    },
    getUser(userId) {
        return apiClient.get(`/users/${userId}/`);
    },
};
