import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Produces one self-contained HTML file in dist-single/ —
// useful for the claude.ai artifact preview and for sharing
// the game as a single file. `npm run build:single`.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: { outDir: 'dist-single' },
})
