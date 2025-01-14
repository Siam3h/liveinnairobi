import { createRouter, createWebHistory } from 'vue-router';

// Pages
const LandingPage = () => import('../pages/LandingPage.vue');
const About = () => import('../pages/About.vue');
const Contacts = () => import('../pages/Contacts.vue');
const Blogs = () => import('../pages/Blogs.vue');
const BlogsCreate = () => import('../pages/BlogsCreate.vue');
const BlogUpdate = () => import('../pages/BlogUpdate.vue');
const BlogDetail = () => import('../pages/BlogDetail.vue');
const Events = () => import('../pages/EventsListing.vue');
const EventCreate = () => import('../pages/EventCreate.vue');
const EventUpdate = () => import('../pages/EventUpdate.vue');
const EventDetail = () => import('../pages/EventDetail.vue');
const ProcessPayment = () => import('../pages/ProcessPayment.vue');
const VerifyPayment = () => import('../pages/VerifyPayment.vue');
const TicketScanner = () => import('../pages/TicketScanner.vue');
const SignUp = () => import('../pages/SignUp.vue');
const SignIn = () => import('../pages/SignIn.vue');
const UpdateProfile = () => import('../pages/UpdateProfile.vue');
const UserDashboard = () => import('../pages/UserDashboard.vue');
const NotFound = () => import('../pages/NotFound.vue');

// Components
const SignOut = () => import('../components/SignOut.vue');
const BlogDelete = () => import('../components/BlogDelete.vue');
const EventDelete = () => import('../components/EventDelete.vue');
const DeleteProfile = () => import('../components/DeleteProfile.vue');

// Routes Configuration
const routes = [
    // Landing and About Pages
    { path: '/', name: 'landing', component: LandingPage },
    { path: '/about', name: 'about', component: About },
    { path: '/contact', name: 'contact', component: Contacts },

    // Authentication Routes
    { path: '/auth/signup', name: 'signup', component: SignUp },
    { path: '/auth/signin', name: 'signin', component: SignIn },
    { path: '/auth/signout', name: 'signout', component: SignOut },

    // User Profile Routes
    { path: '/user/update-profile', name: 'update-profile', component: UpdateProfile },
    { path: '/user/delete-profile', name: 'delete-profile', component: DeleteProfile },
    { path: '/user/dashboard', name: 'user-dashboard', component: UserDashboard },

    // Blog Routes
    { path: '/blogs', name: 'blogs', component: Blogs },
    { path: '/blog/:slug', name: 'blog-detail', component: BlogDetail, props: true },
    { path: '/blogs/create', name: 'blogs-create', component: BlogsCreate },
    { path: '/blog/update/:slug', name: 'blog-update', component: BlogUpdate, props: true },
    { path: '/blog/delete/:slug', name: 'blog-delete', component: BlogDelete, props: true },

    // Event Routes
    { path: '/events', name: 'events', component: Events },
    { path: '/events/:eventId', name: 'event-detail', component: EventDetail, props: true },
    { path: '/events/create', name: 'event-create', component: EventCreate },
    { path: '/events/update/:eventId', name: 'event-update', component: EventUpdate, props: true },
    { path: '/events/delete/:eventId', name: 'event-delete', component: EventDelete, props: true },

    // Ticket Routes
    { path: '/events/verify-ticket', name: 'verify-ticket', component: TicketScanner },

    // Payment Routes
    { path: '/process-payment/:eventId', name: 'process-payment', component: ProcessPayment, props: true },
    { path: '/payments/verify_payment', name: 'verify-payment', component: VerifyPayment, props: (route) => ({ reference: route.query.reference }) },

    // 404 Not Found
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
