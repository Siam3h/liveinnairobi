<template>
    <div class="relative overflow-hidden bg-yellow-50 py-12">
      <div class="flex space-x-24 animate-slide">
        <div v-for="(logo, idx) in duplicatedLogos" :key="idx" class="flex items-center justify-center min-w-[200px]">
          <img
            :src="logo.src"
            :alt="logo.alt"
            class="max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'LogoScroller',
    data() {
      return {
        logos: [
          {
            src: "https://th.bing.com/th/id/R.3b0d6d0481366203a16f6e0921a25b29?rik=l6i2vAi38Zrtvw&pid=ImgRaw&r=0",
            alt: "KCB Bank"
          },
          {
            src: "https://th.bing.com/th/id/OIP.lKdxeTvgnsxV_hTWkk2i-gHaDt?rs=1&pid=ImgDetMain",
            alt: "Safaricom"
          },
          {
            src: "https://iconape.com/wp-content/png_logo_vector/equity-bank-logo.png",
            alt: "Equity Bank"
          },
          {
            src: "https://th.bing.com/th/id/R.51428b3a91021b63a0dfa5480128ed27?rik=UlK1YE2DY2YKdw&pid=ImgRaw&r=0",
            alt: "Kenya Airways"
          },
          {
            src: "https://th.bing.com/th/id/R.98af014d796f146a86340d82a3c68fb4?rik=d2Dl%2fgSk7oYvMw&pid=ImgRaw&r=0",
            alt: "Tusker"
          }
        ]
      }
    },
    computed: {
      duplicatedLogos() {
        return [...this.logos, ...this.logos]
      }
    }
  }
  </script>
  <style scoped>
  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
  .animate-slide {
    animation: slide 25s linear infinite;
  }
  .filter {
    transition: filter 0.3s ease;
  }
  .grayscale {
    filter: grayscale(100%);
  }
  .hover\:grayscale-0:hover {
    filter: grayscale(0);
  }
  </style>