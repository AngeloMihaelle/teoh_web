import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [vue()],
    server: {
        proxy: {
            "/api": {
                target: "https://teoh-api-fwh0arfzffhqg9g7.canadacentral-01.azurewebsites.net",
                changeOrigin: true, // Ensures that the origin header is correctly modified
                secure: false, // Disable SSL verification (if needed)
                rewrite: (path) => path.replace(/^\/api/, "") // Removes the '/api' prefix
            }
        }
    },
    publicDir: 'public',
});
