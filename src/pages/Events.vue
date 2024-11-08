<template>
    <div id="app" class="bg-gray-100 min-h-screen">
        <Navbar />
        <EventList />
        <Footer />
    </div>
</template>


<script>
    import EventList from '../components/EventList.vue';
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';

    export default {
        components: {
            EventList,
            Navbar,
            Footer,
        }
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Raleway:wght@300;400;600;700&display=swap');
</style>
