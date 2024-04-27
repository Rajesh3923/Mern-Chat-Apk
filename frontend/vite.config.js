import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // frontend port
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
