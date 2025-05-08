<template>
  <div class="settings">
    <h2>系统设置</h2>
    <div class="settings-form">
      <div class="form-group">
        <label>系统名称</label>
        <input type="text" v-model="settings.systemName" />
      </div>
      <div class="form-group">
        <label>系统主题</label>
        <select v-model="settings.theme">
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </div>
      <div class="form-group">
        <label>语言</label>
        <select v-model="settings.language">
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>
      <div class="form-group">
        <label>通知设置</label>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="settings.notifications.email" />
            邮件通知
          </label>
          <label>
            <input type="checkbox" v-model="settings.notifications.sms" />
            短信通知
          </label>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn-save" @click="saveSettings">保存设置</button>
        <button class="btn-reset" @click="resetSettings">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const settings = ref({
  systemName: 'Vue Admin System',
  theme: 'light',
  language: 'zh',
  notifications: {
    email: true,
    sms: false
  }
})

const saveSettings = () => {
  // 保存设置的逻辑
  console.log('保存设置:', settings.value)
}

const resetSettings = () => {
  // 重置设置的逻辑
  settings.value = {
    systemName: 'Vue Admin System',
    theme: 'light',
    language: 'zh',
    notifications: {
      email: true,
      sms: false
    }
  }
}
</script>

<style scoped>
.settings {
  padding: 20px;
}

.settings-form {
  max-width: 600px;
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

input[type="text"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-group {
  display: flex;
  gap: 20px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
}

.form-actions {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-save {
  background-color: #1890ff;
  color: white;
}

.btn-reset {
  background-color: #f5f5f5;
  color: #666;
}
</style> 