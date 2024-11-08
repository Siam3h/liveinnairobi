import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    base: '/liveinnairobi/',
    plugins: [vue()],
    resolve: {
        alias: { '@': '/src' },
    },
    server: {
        proxy: {
            '/api/v1/blogs': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
            '/api/v1/events': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
            '/api/v1/payments': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
            '/api/v1/users': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
        },
    },

});
