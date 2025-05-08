<template>
  <div class="layout">
    <!-- 顶部标题栏 -->
    <header class="header">
      <h1>VUE 测试系统</h1>
    </header>
    
    <div class="main-container">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <nav class="menu">
          <router-link to="/" class="menu-item">
            <span class="menu-icon">🏠</span>
            <span>首页</span>
          </router-link>
          <router-link to="/dashboard" class="menu-item">
            <span class="menu-icon">📊</span>
            <span>仪表盘</span>
          </router-link>
          <router-link to="/users" class="menu-item">
            <span class="menu-icon">👥</span>
            <span>用户管理</span>
          </router-link>
          <router-link to="/settings" class="menu-item">
            <span class="menu-icon">⚙️</span>
            <span>系统设置</span>
          </router-link>
        </nav>
      </aside>

      <!-- 右侧内容区 -->
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.header {
  height: 60px;
  background-color: #2c3e50;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

.main-container {
  display: flex;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  position: relative;
}

.sidebar {
  width: 200px;
  background-color: #fff;
  border-right: 1px solid #e9ecef;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
}

.menu {
  padding: 20px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #f8f9fa;
  color: #1a73e8;
}

.menu-item.router-link-active {
  background-color: #f8f9fa;
  border-left: 3px solid #1a73e8;
  color: #1a73e8;
}

.menu-icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.content {
  flex: 1;
  margin-left: 200px;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 60px);
}
</style> 