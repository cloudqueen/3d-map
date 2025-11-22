import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import cesium from 'vite-plugin-cesium'

export default defineConfig({
  plugins: [
    react(),
    cesium()
  ],
  resolve: {
    alias: {
      '@cloudqueen/3d-map-component': resolve(__dirname, '../src/index.ts')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
