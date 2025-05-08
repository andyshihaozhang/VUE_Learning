<template>
  <div class="home">
    <div class="welcome-card">
      <h2>欢迎来到管理系统</h2>
      <p>这是一个基于 Vue 3 + TypeScript 的现代化管理系统</p>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <h3>高性能</h3>
        <p>基于 Vue 3 的 Composition API，提供更好的性能和开发体验</p>
      </div>
      <div class="feature-card">
        <h3>类型安全</h3>
        <p>使用 TypeScript 确保代码质量和开发效率</p>
      </div>
      <div class="feature-card">
        <h3>现代化UI</h3>
        <p>简洁优雅的界面设计，提供出色的用户体验</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 首页组件逻辑
</script>

<style scoped>
.home {
  padding: 20px;
}

.welcome-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.welcome-card h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 24px;
}

.welcome-card p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 18px;
}

.feature-card p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}
</style> 