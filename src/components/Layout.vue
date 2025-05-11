<template>
  <el-container style="min-height: 100vh">
    <!-- 顶部标题栏 -->
    <el-header height="60px" style="background: #1a1f36; color: #fff; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="margin: 0; font-size: 1.5rem; font-weight: 500;">FEIFAN-SYSTEM</h1>
    </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" style="background: #1a1f36; color: #fff; padding: 0;">
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
            <el-icon><DataLine /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-menu-item index="/users">
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
          <el-menu-item index="/settings" style="margin-top: auto; border-top: 1px solid rgba(255,255,255,0.1);">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧视图栏 -->
      <el-main style="background: #f0f2f5; padding: 20px; min-height: calc(100vh - 60px);">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { House, DataLine, User, Goods, Setting, Scissor, Calendar } from '@element-plus/icons-vue'
</script>

<style scoped>
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
</style> 