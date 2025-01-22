<template>
  <div>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow dark:bg-gray-800">
      <div class="container px-6 py-1 mx-auto">
        <div class="lg:flex lg:items-center lg:justify-between">
          <!-- Logo -->
          <a href="/" class="text-2xl font-bold text-blue-600" style="font-family: 'Montserrat', sans-serif;">
            Live In NBO
          </a>

          <!-- Mobile Menu Button -->
          <div class="flex lg:hidden ml-auto">
            <button
              @click="toggleMenu"
              type="button"
              class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <div
            :class="menuOpen ? 'block' : 'hidden'"
            class="absolute inset-x-0 z-20 w-full px-6 py-4 bg-white dark:bg-gray-800 lg:relative lg:bg-transparent lg:w-auto lg:flex lg:items-center"
          >
            <div class="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:flex-row lg:items-center lg:space-x-6">
              <a href="/" class="mt-2 lg:mt-0 hover:text-gray-900 dark:hover:text-gray-200">Home</a>
              <a href="/about" class="mt-2 lg:mt-0 hover:text-gray-900 dark:hover:text-gray-200">About Us</a>
              <a href="/events" class="mt-2 lg:mt-0 hover:text-gray-900 dark:hover:text-gray-200">Events</a>
              <a href="/blogs" class="mt-2 lg:mt-0 hover:text-gray-900 dark:hover:text-gray-200">Blogs</a>
              <a href="/contact" class="mt-2 lg:mt-0 hover:text-gray-900 dark:hover:text-gray-200">Contact</a>
              <a href="/auth/signin" class="mt-2 lg:mt-0 hover:text-gray-900 dark:hover:text-gray-200">Sign In</a>
              <a href="/auth/signup" class="mt-2 lg:mt-0 hover:text-gray-900 dark:hover:text-gray-200">Sign Up</a>

              <!-- Search Bar -->
              <div class="relative mt-4 lg:mt-0">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  class="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false, // Tracks the state of the mobile menu
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen; // Toggles the menu state
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here */
</style>
