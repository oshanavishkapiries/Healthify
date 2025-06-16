import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": [
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-slot",
          ],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-animations": ["framer-motion"],
          "vendor-styling": [
            "tailwindcss",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    },
  },
});
