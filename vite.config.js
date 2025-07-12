import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      //开发环境启用Mock
      enable:process.env.NODE_ENV === 'development',
      mockPath:'src/mock',
    })
  ],
  server: {
    port: 3000,  // 启动端口
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // 开发时指向mock服务
        changeOrigin: true
      }
    }
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')//@指向src
    }
  }
})