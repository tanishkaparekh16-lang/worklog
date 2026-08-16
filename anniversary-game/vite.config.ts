import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built site works from any host or subfolder
// (Vercel, Netlify, GitHub Pages) without extra configuration.
export default defineConfig({
  plugins: [react()],
  base: './',
})
