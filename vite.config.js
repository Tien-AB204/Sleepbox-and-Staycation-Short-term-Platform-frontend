import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const RENDER_API = "https://boxhub-sleepbox-platform-backend.onrender.com";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: RENDER_API,
        changeOrigin: true,
      },
    },
  },
});
