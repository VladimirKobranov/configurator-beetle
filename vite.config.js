import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const env = loadEnv("development", ".");
const PORT = Number(env.VITE_PORT) || 5173;

console.log("port", PORT);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: PORT,
  },
});
