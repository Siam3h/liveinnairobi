import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://liveinnbobackend-production.up.railway.app/api/v1', 
    headers: {
        'Content-Type': 'application/json',
    },
});



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
    // Payment APIs
    initializePayment(paymentData) {
        return apiClient.post(`/payments/${paymentData.eventId}/`, paymentData);
    },
    verifyPayment(reference) {
        return apiClient.get(`/payments/verify_payment/?reference=${reference}`);
    },
    // User APIs
    getUsers() {
        return apiClient.get('/users/');
    },
    getUser(userId) {
        return apiClient.get(`/users/${userId}/`);
    },
};
