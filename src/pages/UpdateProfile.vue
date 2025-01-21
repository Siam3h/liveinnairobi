<template>
  <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Update Profile</h1>
        
        <form @submit.prevent="updateProfile" class="space-y-6">
          <!-- Avatar Preview and Upload -->
          <div class="flex items-center space-x-6">
            <div class="shrink-0">
              <img 
                :src="avatarPreview || '/default-avatar.png'" 
                class="h-16 w-16 object-cover rounded-full"
                alt="Profile avatar"
              />
            </div>
            <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input 
                type="file" 
                @change="handleFileChange"
                accept="image/*"
                class="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </label>
          </div>

          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <!-- Agency Name Field -->
          <div>
            <label for="agencyName" class="block text-sm font-medium text-gray-700">Agency Name</label>
            <input
              id="agencyName"
              v-model="agencyName"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <!-- Role Selection -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              v-model="role"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="event_organizer">Event Organizer</option>
              <option value="author">Author</option>
            </select>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <!-- Bio Field -->
          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              v-model="bio"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>

          <!-- Password Field for signing in -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">New Password (optional)</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <!-- Success/Error Messages -->
          <div v-if="message" :class="['p-4 rounded-md', messageClass]">
            <p class="text-sm">{{ message }}</p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isLoading"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Updating...' : 'Update Profile' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '@/services/apiClient';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const agencyName = ref('');
    const role = ref('event_organizer');
    const email = ref('');
    const bio = ref('');
    const avatar = ref(null);
    const password = ref('');
    const avatarPreview = ref('');
    const isLoading = ref(false);
    const message = ref('');
    const messageClass = ref('');

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        avatar.value = file;
        avatarPreview.value = URL.createObjectURL(file);
      }
    };

    const updateProfile = async () => {
      isLoading.value = true;
      message.value = '';
      
      const formData = new FormData();
      formData.append('username', username.value);
      formData.append('agency_name', agencyName.value);
      formData.append('role', role.value);
      formData.append('email', email.value);
      formData.append('bio', bio.value);
      if (avatar.value) formData.append('avatar', avatar.value);
      if (password.value) formData.append('password', password.value);

      try {
        await apiClient.updateProfile('/auth/update_profile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        message.value = 'Profile updated successfully!';
        messageClass.value = 'bg-green-50 text-green-800';
        
        setTimeout(() => {
          router.push({ name: 'user-dashboard' });
        }, 1500);

      } catch (error) {
        console.error('Update profile error:', error);
        message.value = error.response?.data?.error || 'An error occurred while updating your profile';
        messageClass.value = 'bg-red-50 text-red-800';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      username,
      agencyName,
      role,
      email,
      bio,
      avatar,
      password,
      avatarPreview,
      isLoading,
      message,
      messageClass,
      handleFileChange,
      updateProfile
    };
  }
};
</script>
