import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    
    base: '/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        proxy: {
            '/api/v1/blogs': {
                target: 'https://liveinnbobackend-production.up.railway.app',
                changeOrigin: true,
            },
            '/api/v1/events': {
                target: 'https://liveinnbobackend-production.up.railway.app',
                changeOrigin: true,
            },
            '/api/v1/payments': {
                target: 'https://liveinnbobackend-production.up.railway.app',
                changeOrigin: true,
            },
            '/api/v1/users': {
                target: 'https://liveinnbobackend-production.up.railway.app',
                changeOrigin: true,
            },
        },
    },
});
