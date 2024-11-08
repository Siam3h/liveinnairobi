<template>
    <div>
    <Navbar />
    <!-- Hero Section -->
    <div class="relative h-screen flex items-center justify-start bg-blue-600 text-left overflow-hidden">
        <div class="absolute inset-0 bg-no-repeat bg-right bg-cover opacity-60" style="background-image: url('assets/images/bg.jpg');"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent"></div>
        <div class="relative z-10 w-full lg:w-3/4 mx-8 px-4 sm:px-6 lg:px-12 py-20 md:py-32 lg:py-48">
            <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight" style="font-family: 'Raleway', sans-serif;">
                Contact Us
            </h1>
            <p class="mt-4 text-white text-2xl md:text-3xl lg:text-4xl" style="font-family: 'Raleway', sans-serif;">
                Have questions or want to collaborate? We would love to hear from you. Reach out to us using the form below or connect with us on social media.
            </p>
        </div>
    </div>

    <!-- Contact Form Section -->
    <div class="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-extrabold text-gray-800 mb-6" style="font-family: 'Raleway', sans-serif;">Get in Touch</h2>
            <form action="#" method="POST">
                <div class="grid gap-6 mb-4 md:grid-cols-2">
                    <!-- Name Field -->
                    <div>
                        <label for="name" class="block text-gray-700 mb-2">Full Name</label>
                        <input type="text" id="name" name="name" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500">
                    </div>
                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-gray-700 mb-2">Email Address</label>
                        <input type="email" id="email" name="email" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500">
                    </div>
                </div>
                <!-- Message Field -->
                <div class="mb-6">
                    <label for="message" class="block text-gray-700 mb-2">Message</label>
                    <textarea id="message" name="message" rows="6" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <!-- Submit Button -->
                <div>
                    <button type="submit" class="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    </div>
    <Footer />
    </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue';
    import Footer from '../components/Footer.vue';
    export default {
        components: {
            Navbar,
            Footer,
        },
        name: "Contacts",
    };

</script>

<style scoped>
    /* Add some styles if needed */
</style>