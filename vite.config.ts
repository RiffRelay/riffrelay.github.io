import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/@language-lit/material3-expressive/")) return "material3-expressive";
          if (id.includes("/node_modules/")) return "vendor";
        },
      },
    },
  },
});
