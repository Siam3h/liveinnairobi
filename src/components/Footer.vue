<template>
    <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div class="container px-6 py-10 mx-auto">
        <!-- Logo Section -->
        <div class="flex flex-col items-center text-center">
          <a href="/" class="text-3xl font-extrabold tracking-wide text-white" style="font-family: 'Montserrat', sans-serif;">
            Live In NBO
          </a>
          <p class="mt-4 text-sm text-gray-400">
            Discover events, blogs, and the latest updates in Nairobi.
          </p>
        </div>
  
        <!-- Navigation Links -->
        <div class="flex flex-wrap justify-center mt-6">
          <a href="/" class="mx-4 text-sm text-gray-300 hover:text-blue-400 transition-colors">Home</a>
          <a href="/about" class="mx-4 text-sm text-gray-300 hover:text-blue-400 transition-colors">About</a>
          <a href="/events" class="mx-4 text-sm text-gray-300 hover:text-blue-400 transition-colors">Events</a>
          <a href="/blogs" class="mx-4 text-sm text-gray-300 hover:text-blue-400 transition-colors">Blogs</a>
          <a href="/contact" class="mx-4 text-sm text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
        </div>
  
        <hr class="my-8 border-gray-700" />
  
        <!-- Social Media Icons and Footer Details -->
        <div class="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between">
          <p class="text-sm text-gray-500">&copy; 2024 Live In NBO. All Rights Reserved.</p>
          <div class="flex space-x-4">
            <!-- Social Icons -->
            <a href="https://reddit.com/liveinnbo" aria-label="Reddit" class="text-gray-400 hover:text-blue-500 transition-colors">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="..."></path>
              </svg>
            </a>
            <a href="https://facebook.com/liveinnbo" aria-label="Facebook" class="text-gray-400 hover:text-blue-500 transition-colors">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="..."></path>
              </svg>
            </a>
            <a href="https://github.com/liveinnbo" aria-label="Github" class="text-gray-400 hover:text-blue-500 transition-colors">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="..."></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  footer {
    background: linear-gradient(to bottom right, #1f2937, #111827); /* Subtle gradient */
  }
  
  footer a {
    transition: color 0.3s ease;
  }
  
  footer a:hover {
    color: #60a5fa; /* Lighter blue on hover */
  }
  </style>
  