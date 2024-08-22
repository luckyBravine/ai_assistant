import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // use jsdom for DOM-related tests
    setupFiles: './tests/setup.js', // optional setup file if you have global setups
    globals: true, // Allows global usage of describe, it, etc.
    include: ['**/*.test.jsx'],
  },
})
