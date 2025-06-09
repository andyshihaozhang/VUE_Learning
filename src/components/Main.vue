<template>
  <el-container>
    <!-- 顶部标题栏 -->
    <el-header>
      <h1>FEIFAN-SYSTEM</h1>
    </el-header>
    
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside>
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
      <el-main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { House, Cpu, User, Setting, Scissor, Calendar, DataLine } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  width: 100%;
}

.el-header {
  position: static;
  display: flex;
  background: #1a1f36;
  height: 60px;
  flex-shrink: 0;
  z-index: 100;
  align-items: center;
}

.el-header h1 {
  display: inline-flex;
  margin-left: 10px;
  color: #fff;
  font-size: 20px;
  
}

.el-aside {
  width: 200px;
  flex-shrink: 0;
  position: static;
  height: calc(100vh - 60px);  
}

.el-main {
  position: static;
  height: calc(100vh - 60px);  
  padding: 20px;
}

:deep(.el-menu) {
  display: flex;
  flex-direction: column;
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