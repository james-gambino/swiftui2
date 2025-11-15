import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [react(), vue()],
    root: '.',
    server: { port: 3000 },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});