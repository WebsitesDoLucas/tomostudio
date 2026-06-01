import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    modulePreload: false, // 🌟 A SOLUÇÃO MÁGICA: Impede o Safari de bloquear o ecrã em branco!
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor-react';
            return 'vendor';
          }
        }
      }
    }
  }
});