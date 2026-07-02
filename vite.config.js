import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Pflanzen-finder/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
})
