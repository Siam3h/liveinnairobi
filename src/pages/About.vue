<template>
    <Navbar />
    <!-- Hero Section -->
    <div class="relative h-screen flex items-center justify-start bg-blue-600 text-left overflow-hidden">
        <div class="absolute inset-0 bg-no-repeat bg-right bg-cover opacity-60"
             style="background-image: url('static/images/background_image4.jpg');">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent"></div>
        <div class="relative z-10 w-full lg:w-3/4 mx-8 px-4 sm:px-6 lg:px-12 py-20 md:py-32 lg:py-48">
            <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight" style="font-family: 'Raleway', sans-serif;">
                About Live In NBO
            </h1>
            <p class="mt-4 text-white text-2xl md:text-3xl lg:text-4xl" style="font-family: 'Raleway', sans-serif;">
                Live In NBO is your go-to platform for discovering, booking, and sharing the best events in Nairobi. We partner with leading organizations and talented individuals to bring you unforgettable experiences that inspire and entertain.
            </p>
        </div>
    </div>

    <!-- About Section -->
    <div class="py-12 bg-white text-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-extrabold text-gray-900 mb-6" style="font-family: 'Raleway', sans-serif;">Our Story</h2>
            <p class="text-lg text-gray-600 mb-8" style="font-family: 'Raleway', sans-serif;">
                Founded in 2024, Live In NBO aims to connect people with amazing events, from concerts to conferences and everything in between. Our mission is to empower event organizers and attendees to create and experience memorable moments that resonate long after the event ends.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 class="text-2xl font-bold mb-4">Our Vision</h3>
                    <p class="text-gray-600">To be the leading platform for event discovery and ticketing in Kenya, enhancing the entertainment experience for every user.</p>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 class="text-2xl font-bold mb-4">Our Mission</h3>
                    <p class="text-gray-600">To partner with organizations, agencies, and individuals to bring events to life and transform visions into reality.</p>
                </div>
                <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 class="text-2xl font-bold mb-4">Our Values</h3>
                    <p class="text-gray-600">Excellence, Integrity, and Community. We believe in creating lasting relationships and delivering top-tier experiences.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Gallery Section with Hover Text -->
    <div class="py-12 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl font-extrabold text-gray-900 mb-12" style="font-family: 'Raleway', sans-serif;">Gallery</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <!-- Gallery Image 1 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Event Image 1" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Music Concert - A Night to Remember</p>
                    </div>
                </div>

                <!-- Gallery Image 2 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Event Image 2" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Corporate Networking Event</p>
                    </div>
                </div>

                <!-- Gallery Image 3 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9" alt="Event Image 3" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Behind the Scenes - Setting Up a Festival</p>
                    </div>
                </div>

                <!-- Gallery Image 4 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Event Image 4" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Cultural Dance Performance</p>
                    </div>
                </div>

                <!-- Gallery Image 5 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b" alt="Event Image 5" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Rock Band Live Performance</p>
                    </div>
                </div>

                <!-- Gallery Image 6 -->
                <div class="relative group overflow-hidden rounded-lg shadow-lg">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Event Image 6" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    <div class="absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Community Gathering and Festivities</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script>
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';
    export default {
        components: {
            Navbar,
            Footer,
        },
        name: "About"
    };
</script>

<style scoped>
    /* Add some styles if needed */
</style>