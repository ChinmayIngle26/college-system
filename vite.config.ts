import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Loads .env, .env.development, etc.

  console.log("Vite Loaded ENV:", env.VITE_CLERK_PUBLISHABLE_KEY);

  return {
    plugins: [react()],
    define: {
      'process.env': env, // Ensures process.env works properly
    },
  };
});
