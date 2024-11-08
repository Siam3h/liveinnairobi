import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import Contacts from '../pages/Contacts.vue';
import Events from '../pages/Events.vue';
import Blogs from '../pages/Blogs.vue';
import About from '../pages/About.vue';
//import BlogList from '../components/BlogList.vue';
import BlogDetail from '../components/BlogDetail.vue'; 
//import EventList from '../components/EventList.vue';
import EventDetail from '../components/EventDetail.vue'; 
import ProcessPayment from '../components/ProcessPayment.vue'; 


const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contacts,
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: Blogs,
    },
    {
        path: '/blog/:slug',
        name: 'blog-detail',
        component: BlogDetail,
    },
    {
        path: '/events',
        name: 'events',
        component: Events,
    },
    {
        path: '/event/:id',
        name: 'event-detail',
        component: EventDetail,
    },
    {
        path: '/process-payment/:id',
        name: 'process-payment',
        component: ProcessPayment, 
        props: true,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
