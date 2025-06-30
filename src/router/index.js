import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: ()=>import('@/views/Home.vue')
      },
      {
        path:'/auth',
        component:()=>import('@/layout/AuthLayout.vue'),
        children:[
            {
                path:'login',
                name:'Login',
                component:()=>import('@/views/Auth/Login.vue')
            }
        ]
      }
      // 其他子路由...
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router  
