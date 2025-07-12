import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  //后台管理路由
  {
    path: '/',
    component: () => import('@/layout/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      // 首页（仪表盘主页面）
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/admin/home/Dashboard.vue'),
        meta: { requiresAuth: true, menuIndex: '1-1', role: 'admin' }
      },
      
      // 仪表盘子页面
      {
        path: 'home/charts',
        name: 'HomeCharts',
        component: () => import('@/views/home/Charts.vue'),
        meta: { requiresAuth: true, menuIndex: '1-2', role: 'admin' }
      },
      {
        path: 'home/activities',
        name: 'HomeActivities',
        component: () => import('@/views/home/Activities.vue'),
        meta: { requiresAuth: true, menuIndex: '1-3', role: 'admin' }
      },
      
      // 「我的管理」子路由（直接挂载到 /manage 下，无单独父组件）
      {
        path: 'manage/folders',
        name: 'FolderManage',
        component: () => import('@/views/manage/Folders.vue'),
        meta: { requiresAuth: true, menuIndex: '2-1', role: 'admin' }
      },
      {
        path: 'manage/files',
        name: 'FileManage',
        component: () => import('@/views/manage/Files.vue'),
        meta: { requiresAuth: true, menuIndex: '2-2', role: 'admin' }
      },
      {
        path: 'manage/users',
        name: 'UserManage',
        component: () => import('@/views/manage/Users.vue'),
        meta: { requiresAuth: true, menuIndex: '2-3', role: 'admin' }
      },
      
      // 「系统设置」子路由（直接挂载到 /settings 下，无单独父组件）
      {
        path: 'settings/profile',
        name: 'UserProfile',
        component: () => import('@/views/settings/Profile.vue'),
        meta: { requiresAuth: true, menuIndex: '3-1', role: 'admin' }
      },
      {
        path: 'settings/theme',
        name: 'ThemeSettings',
        component: () => import('@/views/settings/Theme.vue'),
        meta: { requiresAuth: true, menuIndex: '3-2', role: 'admin' }
      },
      {
        path: 'settings/privacy',
        name: 'PrivacySettings',
        component: () => import('@/views/settings/Privacy.vue'),
        meta: { requiresAuth: true, menuIndex: '3-3', role: 'admin' }
      }
    ]
  },

  //用户端路由
  {
    path: '/user',
    component: () => import('@/layout/UserLayout.vue'),
    meta: { requiresAuth: true, role: 'user' },
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('@/views/user/Home.vue'),
        meta: { requiresAuth: true, role: 'user' }
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/user/Profile.vue'),
        meta: { requiresAuth: true, role: 'user' }
      },
      {
        path: 'myfiles',
        name: 'UserMyfiles',
        component: () => import('@/views/user/Myfiles.vue'),
        meta: { requiresAuth: true, role: 'user' }
      },
    ]
  },
  
  // 认证路由
  {
    path: '/auth',
    component: () => import('@/layout/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth/Login.vue')
      }
    ]
  },
  
  // 404 路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫：整合登录验证、角色权限和环境区分
router.beforeEach((to, from, next) => {
  // 1. 开发环境：跳过登录验证，但保留角色权限检查（方便测试不同角色）
  const isDevEnv = process.env.NODE_ENV === 'development';
  const userRole = localStorage.getItem('role') || 'guest'; // 角色：admin/user/guest
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 2. 开发环境处理：未登录时默认模拟登录（方便测试）
  if (isDevEnv && !isLoggedIn) {

    // !!!!!!!!!!!!!!!!!!!!!!!!手动切换默认角色!!!!!!!!!!!!!!!!!!!!!!!!
    localStorage.setItem('role', 'admin'); // 默认模拟管理员
    // localStorage.setItem('role', 'user');  // 默认模拟普通用户
    localStorage.setItem('isLoggedIn', 'true');

    // 更新变量值
    const updatedRole = localStorage.getItem('role') || 'guest';
    console.log(`[开发环境] 自动模拟登录，角色：${updatedRole}`);
  }

  // 3. 登录状态验证（生产环境强制验证，开发环境可选验证）
  if (!isDevEnv && to.meta.requiresAuth && !isLoggedIn) {
    console.log('未登录，跳转至登录页');
    return next({ name: 'Login' });
  }

  // 4. 已登录用户访问登录页：跳转至对应角色的首页
  if (to.name === 'Login' && isLoggedIn) {
    const redirectPath = userRole === 'admin' ? '/admin' : '/user';
    console.log(`已登录（${userRole}），跳转至${redirectPath}`);
    return next(redirectPath);
  }

  // 5. 角色权限验证（开发/生产环境均生效）
  if (to.meta.role && to.meta.role !== userRole) {
    console.log(`角色不匹配（当前：${userRole}，需要：${to.meta.role}）`);
    // 跳转至当前角色的首页
    const fallbackPath = userRole === 'admin' ? '/admin' : 
                        userRole === 'user' ? '/user' : '/auth/login';
    return next(fallbackPath);
  }

  // 6. 所有验证通过，正常访问
  next();
});

console.log('路由实例创建成功:', router); // 添加日志
console.log('路由配置:', routes); // 打印路由配置

export default router;     
