
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    // 明確設定 GitHub Pages 的子路徑
    base: '/Private-Library/',
    resolve: {
      alias: {
        '@': '/',
      },
    },
    define: env.VITE_GEMINI_API_KEY ? {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    } : {},
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})
