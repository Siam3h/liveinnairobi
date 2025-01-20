<template>
  <Navbar />

  <!-- Hero Section -->
  <div class="relative h-screen flex items-center justify-start bg-blue-200 text-left overflow-hidden">
    <div 
      class="absolute inset-0 bg-no-repeat bg-right bg-cover"
      style="background-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070');">
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent"></div>
    <div class="relative z-10 w-full lg:w-3/4 mx-8 px-4 sm:px-6 lg:px-12 py-20 md:py-32 lg:py-48">
      <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight" style="font-family: 'Raleway', sans-serif;">
        About Live In Nairobi
      </h1>
      <p class="mt-6 text-white text-xl md:text-2xl lg:text-3xl" style="font-family: 'Raleway', sans-serif;">
        Celebrating Arts and Culture in Nairobi and Beyond.
        Join us as we highlight the vibrant cultural scene of the city through dynamic coverage and engaging content.
      </p>
    </div>
  </div>

  <!-- About Section -->
  <div class="py-16 bg-white text-center">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <h2 class="text-4xl font-bold text-blue-600 mb-8" style="font-family: 'Raleway', sans-serif;">
        What We Do
      </h2>
      <p class="text-lg text-gray-600 mb-12" style="font-family: 'Raleway', sans-serif;">
        Live In Nairobi is a Media/News Company dedicated to promoting arts and culture. Our platform provides comprehensive event coverage, artist promotions, critical reviews, and a bi-weekly gig guide to connect audiences with Nairobi's thriving creative scene.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
          <img 
            src="https://images.pexels.com/photos/11483554/pexels-photo-11483554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Event Coverage" 
            class="w-full h-40 object-cover rounded-md mb-4">
          <h3 class="text-2xl font-bold text-red-600 mb-4">Event Coverage</h3>
          <p class="text-gray-700">In-depth coverage of art and musical events, capturing the essence of Nairobi's vibrant cultural scene.</p>
        </div>
        <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062" 
            alt="Promoting Artists" 
            class="w-full h-40 object-cover rounded-md mb-4">
          <h3 class="text-2xl font-bold text-red-600 mb-4">Promoting Artists</h3>
          <p class="text-gray-700">Offering a platform for local artists and performers to showcase their talent and connect with their audience.</p>
        </div>
        <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
          <img 
            src="https://media.istockphoto.com/id/1177502660/photo/young-woman-reading-the-news-on-a-modern-tablet-computer-while-sitting-in-her-living-room.jpg?s=1024x1024&w=is&k=20&c=lcFzelAHLx4AssYinkhrKgYmor33U2BsfJ8yX_DD2V8=" 
            alt="Digital Magazine" 
            class="w-full h-40 object-cover rounded-md mb-4">
          <h3 class="text-2xl font-bold text-red-600 mb-4">Digital Magazine</h3>
          <p class="text-gray-700">A visually engaging resource with articles, artist interviews, and event highlights.</p>
        </div>
      </div>
    </div>
  </div>

<!-- who are we -->
<div class="py-16 bg-white text-center">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <h2 class="text-4xl font-bold text-blue-600 mb-8" style="font-family: 'Raleway', sans-serif;">
      Who We Are
    </h2>
    <p class="text-lg text-gray-600 mb-12" style="font-family: 'Raleway', sans-serif;">
      Live In Nairobi is a dynamic platform celebrating and promoting the rich tapestry of arts and culture in Nairobi. Our mission is to connect diverse audiences with the city's vibrant creative scene, fostering collaboration and appreciation.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/2908833/pexels-photo-2908833.jpeg" 
          alt="Cultural Enthusiasts" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Cultural Enthusiasts</h3>
        <p class="text-gray-700">Engaging those passionate about visual arts, music, dance, literature, and more, creating opportunities to explore diverse cultural expressions.</p>
      </div>
      
      <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg" 
          alt="Local Residents" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Local Residents</h3>
        <p class="text-gray-700">Focusing on Nairobi residents deeply invested in the local arts and cultural scene, bridging the city’s creative talents with its community.</p>
      </div>
      
      <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg" 
          alt="Young Adults and Professionals" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Young Adults & Professionals</h3>
        <p class="text-gray-700">Catering to tech-savvy individuals seeking accessible, high-quality cultural content that complements their lifestyle.</p>
      </div>
      
      <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/2104150/pexels-photo-2104150.jpeg" 
          alt="Artists and Creatives" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Artists & Creatives</h3>
        <p class="text-gray-700">Providing a stage for emerging and established creatives to showcase their talent and engage with their audiences.</p>
      </div>
      
      <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/30298046/pexels-photo-30298046/free-photo-of-mud-racing-jeep-at-off-road-competition.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Event Seekers" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Event Seekers</h3>
        <p class="text-gray-700">Connecting individuals with live performances, exhibitions, workshops, and festivals across the city.</p>
      </div>
      
      <div class="bg-yellow-50 p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg" 
          alt="Cultural Educators and Students" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Educators & Students</h3>
        <p class="text-gray-700">Empowering those dedicated to studying and preserving Nairobi’s cultural heritage and contemporary art forms.</p>
      </div>

     
    </div>
  </div>
</div>
<!-- Projects Section -->
<div class="py-16 bg-gray-50 text-center">
  <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <h2 class="text-4xl font-bold text-blue-600 mb-8" style="font-family: 'Raleway', sans-serif;">
      How We Do It: Projects
    </h2>
    <p class="text-lg text-gray-600 mb-12" style="font-family: 'Raleway', sans-serif;">
      Live In Nairobi is committed to innovative approaches that celebrate and elevate arts and culture in Nairobi, providing creative solutions that connect artists and audiences like never before.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/5088011/pexels-photo-5088011.jpeg" 
          alt="Digital Engagement Platform" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Digital Engagement Platform</h3>
        <p class="text-gray-700">A hub for artists, cultural events, and enthusiasts with features like event listings, artist profiles, and user-generated content.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg" 
          alt="Immersive Content Creation" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Immersive Content Creation</h3>
        <p class="text-gray-700">Bringing cultural events to life through VR and AR experiences for a unique and engaging audience connection.</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" 
          alt="Audience Analytics" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Audience Analytics</h3>
        <p class="text-gray-700">Using data to understand user preferences and deliver personalized content and event suggestions.</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/3153199/pexels-photo-3153199.jpeg" 
          alt="Collaborative Partnerships" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Collaborative Partnerships</h3>
        <p class="text-gray-700">Partnering with artists and cultural institutions to provide comprehensive event coverage and exclusive content.</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/4064693/pexels-photo-4064693.jpeg" 
          alt="Virtual Events" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Virtual Events</h3>
        <p class="text-gray-700">Hosting virtual events to connect artists with a global audience and offer fans interactive cultural experiences.</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src="https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg" 
          alt="Crowdsourced Content" 
          class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-bold text-red-600 mb-4">Crowdsourced Content</h3>
        <p class="text-gray-700">Encouraging user contributions like reviews and stories to foster a vibrant and inclusive cultural community.</p>
      </div>
    </div>
  </div>
</div>

  <!-- Strategy Section -->
  <div class="py-16 bg-gray-100">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
      <h2 class="text-4xl font-bold text-blue-600 mb-12" style="font-family: 'Raleway', sans-serif;">Our Strategy</h2>
      <p class="text-lg text-gray-600 mb-12" style="font-family: 'Raleway', sans-serif;">
        Live In Nairobi bridges the gap between artists and audiences through interactive digital platforms, immersive content, and community-focused initiatives.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div class="relative group overflow-hidden rounded-lg shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070" 
            alt="Interactive Features" 
            class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Interactive Features</p>
          </div>
        </div>
        <div class="relative group overflow-hidden rounded-lg shadow-lg">
          <img 
            src="https://images.pexels.com/photos/5338444/pexels-photo-5338444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Community Building" 
            class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Community Building</p>
          </div>
        </div>
        <div class="relative group overflow-hidden rounded-lg shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1558211583-d26b5d92f62d?q=80&w=2070" 
            alt="Artist Collaborations" 
            class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p class="text-white text-lg font-bold" style="font-family: 'Raleway', sans-serif;">Artist Collaborations</p>
          </div>
        </div>
      </div>
    </div>
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
  name: "About",
};
</script>

<style scoped>
/* Custom hover animations and style refinements */
.group-hover\:scale-105 {
  transform: scale(1.05);
}

</style>
