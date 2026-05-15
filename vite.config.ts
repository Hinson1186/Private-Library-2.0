
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    // 使用相對路徑，這樣無論儲存庫名稱是什麼都能正常運作
    base: './',
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
