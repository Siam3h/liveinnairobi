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
        <a href="/auth/signin" class="mx-4 text-sm text-gray-300 hover:text-blue-400 transition-colors">Sign In</a>
        <a href="/auth/signup" class="mx-4 text-sm text-gray-300 hover:text-blue-400 transition-colors">Sign Up</a>
      </div>

      <hr class="my-8 border-gray-700" />

      <!-- Social Media Icons and Footer Details -->
      <div class="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between">
        <p class="text-sm text-gray-500">&copy; {{ currentYear }} Live In NBO. All Rights Reserved.</p>
        <div class="mt-8 flex space-x-4">
          <a href="https://www.facebook.com/liveinnbo" aria-label="Facebook" target="_blank" class="text-white hover:text-blue-400 transition-colors">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/liveinnbo" aria-label="Instagram" target="_blank" class="text-white hover:text-pink-400 transition-colors">
            <i class="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://twitter.com/liveinnbo" aria-label="Twitter" target="_blank" class="text-white hover:text-blue-400 transition-colors">
            <i class="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://wa.me/your-number" aria-label="WhatsApp" target="_blank" class="text-white hover:text-green-400 transition-colors">
            <i class="fab fa-whatsapp fa-2x"></i>
          </a>
          <a href="https://www.linkedin.com/company/liveinnbo" aria-label="LinkedIn" target="_blank" class="text-white hover:text-blue-500 transition-colors">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear() // Dynamically fetch the current year
    };
  }
};
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
