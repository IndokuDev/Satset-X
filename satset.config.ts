import { defineConfig } from 'satset-react';

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  assets: {
    favicon: '/favicon.png',
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "lucide-react", "@icons-pack/react-simple-icons"],
  },
});
