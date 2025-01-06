<template>
    <Navbar />
  
    <!-- Hero Section -->
    <div class="relative h-screen flex items-center justify-start bg-blue-100 text-left overflow-hidden">
      <div 
        class="absolute inset-0 bg-no-repeat bg-right bg-cover "
        style="background-image: url('/src/assets/images/bg2.jpg');">
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent"></div>
      <div class="relative z-10 w-full lg:w-3/4 mx-8 px-4 sm:px-6 lg:px-12 py-20 md:py-32 lg:py-48">
        <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight" style="font-family: 'Raleway', sans-serif;">
          About Live In NBO
        </h1>
        <p class="mt-6 text-white text-xl md:text-2xl lg:text-3xl" style="font-family: 'Raleway', sans-serif;">
          Live In NBO is your go-to platform for discovering, booking, and sharing the best events in Nairobi.
          We partner with leading organizations and talented individuals to bring you unforgettable experiences.
        </p>
      </div>
    </div>
  
    <!-- About Section -->
    <div class="py-16 bg-white text-center">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h2 class="text-4xl font-bold text-blue-600 mb-8" style="font-family: 'Raleway', sans-serif;">
          Our Story
        </h2>
        <p class="text-lg text-gray-600 mb-12" style="font-family: 'Raleway', sans-serif;">
          Founded in 2024, Live In NBO connects people with amazing events, from concerts to conferences.
          Our mission is to empower event organizers and attendees to create and experience memorable moments.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-yellow-100 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-red-600 mb-4">Our Vision</h3>
            <p class="text-gray-700">To be the leading platform for event discovery and ticketing in Kenya.</p>
          </div>
          <div class="bg-yellow-100 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-red-600 mb-4">Our Mission</h3>
            <p class="text-gray-700">To partner with organizations and individuals to bring events to life.</p>
          </div>
          <div class="bg-yellow-100 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold text-red-600 mb-4">Our Values</h3>
            <p class="text-gray-700">Excellence, Integrity, and Community. Creating lasting relationships.</p>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Gallery Section -->
    <div class="py-16 bg-gray-100">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 class="text-4xl font-bold text-blue-600 mb-12" style="font-family: 'Raleway', sans-serif;">Gallery</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <!-- Gallery Item -->
          <div class="relative group overflow-hidden rounded-lg shadow-lg">
            <img 
              src="https://media.istockphoto.com/id/1199007040/photo/carefree-couples-having-fun-while-dancing-on-music-festival.jpg?s=1024x1024&w=is&k=20&c=m5J6NUe3YUEt-jkdIndIlpYJj0kZ-Mbec5G0wS0RejI=" 
              alt="Event Image 1" 
              class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Music Concert</p>
            </div>
          </div>
          <!-- Additional Gallery Items (repeat similar structure) -->
          <div class="relative group overflow-hidden rounded-lg shadow-lg">
            <img 
              src="https://media.istockphoto.com/id/2051402873/photo/business-people-handshake-and-meeting-for-b2b-partnership-or-introduction-together-at-office.jpg?s=1024x1024&w=is&k=20&c=BoakxsRskxDTkbXwB-QIRkfyg0B4hxu23kcsI_GKDhQ=" 
              alt="Event Image 2" 
              class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-red-600 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Networking Event</p>
            </div>
          </div>
          <div class="relative group overflow-hidden rounded-lg shadow-lg">
            <img 
              src="https://media.istockphoto.com/id/2155514577/photo/ballet-and-street-dance-mix-beautiful-young-girl-in-black-dress-ballerina-dancing-with-young.jpg?s=1024x1024&w=is&k=20&c=bklyZ8GOGlXaSiLh0iLnu8ZezJAeeR-LPKBckVlysKI=" 
              alt="Event Image 3" 
              class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="absolute inset-0 bg-yellow-600 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Dance Performance</p>
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
    name: "About",
  };
  </script>
  
  <style scoped>
    /* Custom hover animations and style refinements */
    .group-hover\:scale-105 {
      transform: scale(1.05);
    }
  </style>