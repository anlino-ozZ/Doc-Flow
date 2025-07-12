<template>
  <!-- 认证页面通用布局容器 -->
  <div class="auth-layout">
    <!-- 子路由渲染出口（必须！否则 Login 无法显示） -->
    <router-view />
  </div>
</template>

<script setup>
// 可按需引入组件库工具函数
</script>

<style scoped>
/* 全屏背景容器 */
.auth-layout {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #e6ecf1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
