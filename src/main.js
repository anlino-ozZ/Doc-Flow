import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'  // 可选，基础样式
import router from './router/index' 
import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/global.css';
import ElementPlus from 'element-plus'; 
import 'element-plus/dist/index.css'; 

const app = createApp(App)
app.use(createPinia())  // 注册Pinia
app.use(router) 
app.use(ElementPlus);
app.mount('#app')


if (import.meta.env.VITE_MOCK_ENABLE) {
  import('./mock').then(() => console.log('Mock 启用'));
}