import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd());
const PORT = Number(env.VITE_PORT) || 5173;

console.log("port", PORT);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths({ projects: ["./jsconfig.json"] }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: PORT,
  },
});
