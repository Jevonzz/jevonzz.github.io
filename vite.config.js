import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js lives in a lazily loaded chunk, so its size doesn't affect first paint.
    chunkSizeWarningLimit: 1000,
  },
})
