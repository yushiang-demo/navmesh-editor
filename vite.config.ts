import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: "/navmesh-editor",
  server: {
    port: 3000,
    host:"0.0.0.0"
  },
})
