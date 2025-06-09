<template>
  <div class="settings-container">
    <el-card class="message-card"
      shadow="always">
      <div class="profile-header">
        <el-avatar :size="100" src="https://placeholder.com/150" />
        <h2 class="username">用户名</h2>
        <p class="user-role">角色：管理员</p>
      </div>
      
      <el-divider />
      
      <div class="profile-info">
        <div class="info-item">
          <el-icon><User /></el-icon>
          <span>账号：admin</span>
        </div>
        <div class="info-item">
          <el-icon><Message /></el-icon>
          <span>邮箱：admin@example.com</span>
        </div>
        <div class="info-item">
          <el-icon><Phone /></el-icon>
          <span>手机：138****8888</span>
        </div>
        <div class="info-item">
          <el-icon><Location /></el-icon>
          <span>地区：中国</span>
        </div>
      </div>

      <div class="profile-actions">
        <el-button type="primary" @click="handleEditProfile">
          <el-icon><Edit /></el-icon>
          编辑资料
        </el-button>
        <el-button @click="handleChangePassword">
          <el-icon><Lock /></el-icon>
          修改密码
        </el-button>
      </div>
    </el-card>
    <el-card class="setting-card"
      shadow="never">

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { User, Message, Phone, Location, Edit, Lock } from '@element-plus/icons-vue'

const handleEditProfile = () => {
  // 处理编辑资料
}

const handleChangePassword = () => {
  // 处理修改密码
}
</script>

<style scoped>
.settings-container {
  display: flex;
  gap: 20px;
  height: 100%;
}

.message-card {
  flex: 1;
  height: 100%;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.username {
  margin: 15px 0 5px;
  font-size: 20px;
  color: #303133;
}

.user-role {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.profile-info {
  flex: 1;
  padding: 20px 0;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #606266;
}

.info-item .el-icon {
  margin-right: 10px;
  font-size: 18px;
  color: #909399;
}

.profile-actions {
  display: flex;
  flex-flow: column-reverse nowrap;
  gap: 10px;
  padding: 20px 0;
}

.profile-actions .el-button {
  width: 100%;
  margin-left: 0;
}

.setting-card {
  flex: 4;
  height: 100%;
}

/* 卡片内容区域 */
:deep(.el-card__body) {
  height: 100%;   /* 占满卡片高度 */
  display: flex;  /* 使其内部也成为flex容器 */
  flex-direction: column; /* 垂直排列子元素 */
}

</style>
