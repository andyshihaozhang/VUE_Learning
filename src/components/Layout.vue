<template>
  <div class="app-wrapper">
    <!-- 顶部标题栏 -->
    <el-header class="fixed-header">
      <h1>FEIFAN-SYSTEM</h1>
    </el-header>
    
    <div class="main-wrapper">
      <!-- 左侧菜单栏 -->
      <el-aside class="fixed-aside">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#1a1f36"
          text-color="#a3aed0"
          active-text-color="#fff"
          router
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/dashboard">
            <el-icon><Cpu /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/employees">
            <el-icon><User /></el-icon>
            <span>员工信息</span>
          </el-menu-item>
          <el-menu-item index="/products">
            <el-icon><Scissor /></el-icon>
            <span>产品管理</span>
          </el-menu-item>
          <el-menu-item index="/process">
            <el-icon><Calendar /></el-icon>
            <span>生产记录</span>
          </el-menu-item>
          <el-menu-item index="/data-center">
            <el-icon><DataLine /></el-icon>
            <span>数据中心</span>
          </el-menu-item>
          <el-menu-item index="/settings" class="settings-menu-item">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <!-- 右侧视图栏 -->
      <el-main class="scrollable-main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { House, Cpu, User, Setting, Scissor, Calendar, DataLine } from '@element-plus/icons-vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  position: relative;
  background: #f0f2f5;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #1a1f36;
  color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
}

.fixed-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

.main-wrapper {
  padding-top: 60px; /* 为固定header留出空间 */
  min-height: calc(100vh - 60px);
  position: relative;
}

.fixed-aside {
  position: fixed;
  left: 0;
  top: 60px; /* header的高度 */
  bottom: 0;
  width: 200px;
  background: #1a1f36;
  color: #fff;
  z-index: 999;
  overflow-y: auto;
}

.scrollable-main {
  margin-left: 200px; /* aside的宽度 */
  min-height: calc(100vh - 60px);
  padding: 20px;
  background: #f0f2f5;
  position: relative;
  z-index: 1;
}

:deep(.el-menu) {
  height: 100%;
  border-right: none;
}

:deep(.el-menu-item.is-active) {
  background-color: #2d3748 !important;
}

:deep(.el-menu-item:hover) {
  background-color: #2d3748 !important;
}

:deep(.el-menu-item .el-icon) {
  margin-right: 8px;
  font-size: 18px;
  vertical-align: middle;
}

.settings-menu-item {
  margin-top: auto;
  border-top: 1px solid rgba(255,255,255,0.1);
}

/* 添加过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 