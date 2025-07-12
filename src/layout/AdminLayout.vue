<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">Doc Flow</div>
    </el-header>

    <!-- 侧边栏 -->
    <div class="main-content-wrapper">
      <el-aside width="200px" v-if="showSidebar">
        <el-menu :default-active="activeSidebar" mode="vertical">
          <el-sub-menu index="1">
            <template #title>仪表盘</template>
            <el-menu-item index="1-1" @click="navigateTo('Home')">数据一览</el-menu-item>
            <el-menu-item index="1-2" @click="navigateTo('HomeCharts')">趋势图表</el-menu-item>
            <el-menu-item index="1-3" @click="navigateTo('HomeActivities')">最近活动</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>我的管理</template>
            <el-menu-item index="2-1" @click="navigateTo('FolderManage')">文件夹管理</el-menu-item>
            <el-menu-item index="2-2" @click="navigateTo('FileManage')">文件管理</el-menu-item>
            <el-menu-item index="2-3" @click="navigateTo('UserManage')">用户管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>系统设置</template>
            <el-menu-item index="3-1" @click="navigateTo('UserProfile')">个人信息</el-menu-item>
            <el-menu-item index="3-2" @click="navigateTo('ThemeSettings')">主题颜色</el-menu-item>
            <el-menu-item index="3-3" @click="navigateTo('PrivacySettings')">隐私设置</el-menu-item>
          </el-sub-menu> 
        </el-menu>
      </el-aside>
      
      <!-- 路由出口 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 侧边栏显示状态
const showSidebar = computed(() => {
  return route.meta.showSidebar !== false;
});

// 侧边栏激活项（直接使用路由元信息）
const activeSidebar = computed(() => {
  return route.meta.menuIndex || '1-1'; // 默认激活仪表盘-数据一览
});

// 导航函数
const navigateTo = (name) => {
  router.push({ name });
};
</script>

<style scoped>
.logo{
    text-align: center;
    margin: 17px;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #3461a9;
  color: white;
}

.footer {
  background-color: #f5f5f5;
  text-align: center;
}

.main-content-wrapper{
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f9fafb;
  overflow: auto;
}

@media (max-width: 768px) {
  .main-content-wrapper {
    flex-direction: column;
  }
  .el-aside {
    width: 100% !important; /* 移动端侧边栏占满宽度 */
  }
}
</style>