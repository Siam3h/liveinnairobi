<template>
    <div id="app" class="bg-gray-100 min-h-screen">
        <Navbar />
        <BlogList />
        <Footer />
    </div>
</template>

<script>
    import BlogList from '../components/BlogList.vue';
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';

    export default {
        components: {
            BlogList,
            Navbar,
            Footer,
        }
    };
</script>

