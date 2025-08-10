import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Default to root for platforms like Vercel; override via CLI for GitHub Pages
  base: "/",
})
