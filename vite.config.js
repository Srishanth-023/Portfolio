import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-drei': ['@react-three/drei'],
          'three-fiber': ['@react-three/fiber']
        }
      }
    }
  }
})
