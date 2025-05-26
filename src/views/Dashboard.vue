<template>
  <div class="dashboard">
    <h2>仪表盘</h2>
    <div class="dashboard-grid">
      <div class="card">
        <h3>当前员工数</h3>
        <p class="number">1,234</p>
      </div>
      <div class="card">
        <h3>当前产品数</h3>
        <p class="number">256</p>
      </div>
      <div class="card">
        <h3>系统消息</h3>
        <p class="number">12</p>
      </div>
      <div class="card">
        <h3>待处理任务</h3>
        <p class="number">5</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 仪表盘组件逻辑
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.number {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 10px 0 0;
}
</style> 