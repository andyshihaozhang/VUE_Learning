<template>
  <div class="settings-container">
    <el-row :gutter="20" class="full-height">
      <!-- 左侧：上下结构 -->
      <el-col :span="8" class="full-height">
        <div class="left-column">
          <!-- 上：用户信息卡片 -->
          <el-card class="user-info-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="header-title">个人信息</span>
                <el-button link type="primary" @click="refreshUserInfo">
                  <el-icon><Refresh /></el-icon>
                </el-button>
              </div>
            </template>
            <div class="user-info">
              <div class="avatar-container">
                <el-avatar :size="80" :src="avatarUrl">
                  {{ loginStore.loginInfo?.username?.charAt(0)?.toUpperCase() }}
                </el-avatar>
                <h3 class="username">{{ loginStore.loginInfo?.username || '未登录' }}</h3>
                <el-tag :type="loginStore.loginInfo?.status === 1 ? 'success' : 'danger'" class="status-tag">
                  {{ loginStore.loginInfo?.status === 1 ? '正常' : '禁用' }}
                </el-tag>
              </div>
              <el-divider />
              <div class="info-list">
                <div class="info-item">
                  <el-icon><User /></el-icon>
                  <span class="label">用户名：</span>
                  <span class="value">{{ loginStore.loginInfo?.username || '-' }}</span>
                </div>
                <div class="info-item">
                  <el-icon><Iphone /></el-icon>
                  <span class="label">手机号：</span>
                  <span class="value">{{ loginStore.loginInfo?.phone || '-' }}</span>
                </div>
                <div class="info-item">
                  <el-icon><UserFilled /></el-icon>
                  <span class="label">角色：</span>
                  <el-tag size="small" type="info">{{ loginStore.loginInfo?.role || '-' }}</el-tag>
                </div>
              </div>
            </div>
          </el-card>
          <!-- 下：密码修改卡片 -->
          <el-card class="password-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="header-title">修改密码</span>
              </div>
            </template>
            <el-form
              ref="passwordFormRef"
              :model="passwordForm"
              :rules="passwordRules"
              label-position="top"
              @submit.prevent="handleChangePassword"
            >
              <el-form-item label="原密码" prop="oldPassword">
                <el-input
                  v-model="passwordForm.oldPassword"
                  type="password"
                  show-password
                  placeholder="请输入原密码"
                />
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                  v-model="passwordForm.newPassword"
                  type="password"
                  show-password
                  placeholder="请输入新密码"
                />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  show-password
                  placeholder="请再次输入新密码"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleChangePassword" :loading="loading" class="submit-btn">
                  修改密码
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
      <!-- 右侧：系统设置 -->
      <el-col :span="16" class="full-height">
        <el-card class="system-settings-card fill-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="header-title">系统设置</span>
            </div>
          </template>
          <el-form
            ref="settingsFormRef"
            :model="settings"
            label-position="top"
            class="settings-form"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="系统名称">
                  <el-input v-model="settings.systemName" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="系统主题">
                  <el-select v-model="settings.theme" style="width: 100%">
                    <el-option label="浅色" value="light">
                      <div class="theme-option">
                        <div class="theme-preview light"></div>
                        <span>浅色</span>
                      </div>
                    </el-option>
                    <el-option label="深色" value="dark">
                      <div class="theme-option">
                        <div class="theme-preview dark"></div>
                        <span>深色</span>
                      </div>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="语言">
                  <el-select v-model="settings.language" style="width: 100%">
                    <el-option label="中文" value="zh">
                      <div class="language-option">
                        <span class="flag">🇨🇳</span>
                        <span>中文</span>
                      </div>
                    </el-option>
                    <el-option label="English" value="en">
                      <div class="language-option">
                        <span class="flag">🇺🇸</span>
                        <span>English</span>
                      </div>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通知设置">
                  <div class="notification-center">
                    <el-space direction="horizontal" alignment="center" :size="40">
                      <el-checkbox v-model="notificationSettings.email" label="email" class="notification-checkbox">
                        <el-icon><Message /></el-icon>
                        <span>邮件通知</span>
                      </el-checkbox>
                      <el-checkbox v-model="notificationSettings.sms" label="sms" class="notification-checkbox">
                        <el-icon><ChatDotRound /></el-icon>
                        <span>短信通知</span>
                      </el-checkbox>
                    </el-space>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-divider />

            <div class="form-actions">
              <el-button type="primary" @click="saveSettings" :loading="loading">
                保存设置
              </el-button>
              <el-button @click="resetSettings">重置</el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { 
  User, 
  Iphone, 
  UserFilled, 
  Message, 
  ChatDotRound,
  Refresh
} from '@element-plus/icons-vue'

const loginStore = useLoginStore()
const loading = ref(false)
const passwordFormRef = ref<FormInstance>()
const settingsFormRef = ref<FormInstance>()

// 头像URL（如果有的话）
const avatarUrl = computed(() => {
  // TODO: 如果有头像URL，在这里返回
  return ''
})

// 刷新用户信息
const refreshUserInfo = async () => {
  try {
    loading.value = true
    // TODO: 实现刷新用户信息的逻辑
    ElMessage.success('用户信息已更新')
  } catch (error) {
    console.error('刷新用户信息失败:', error)
    ElMessage.error('刷新用户信息失败')
  } finally {
    loading.value = false
  }
}

// 密码修改表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码验证规则
const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (passwordForm.confirmPassword !== '') {
      if (passwordFormRef.value) {
        passwordFormRef.value.validateField('confirmPassword')
      }
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const passwordRules: FormRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, validator: validatePass, trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ]
}

// 系统设置
const settings = reactive({
  systemName: 'Vue Admin System',
  theme: 'light',
  language: 'zh'
})

// 通知设置
const notificationSettings = reactive({
  email: true,
  sms: false
})

// 处理密码修改
const handleChangePassword = async () => {
  if (!passwordFormRef.value) return
  
  try {
    await passwordFormRef.value.validate()
    loading.value = true
    
    await loginStore.changePassword(passwordForm.oldPassword, passwordForm.newPassword)
    ElMessage.success('密码修改成功')
    
    // 清空表单
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (error: any) {
    console.error('密码修改失败:', error)
    ElMessage.error(error.response?.data?.message || '密码修改失败')
  } finally {
    loading.value = false
  }
}

// 保存系统设置
const saveSettings = async () => {
  try {
    loading.value = true
    // TODO: 实现保存设置的逻辑
    console.log('保存设置:', {
      ...settings,
      notifications: notificationSettings
    })
    ElMessage.success('设置保存成功')
  } catch (error) {
    console.error('保存设置失败:', error)
    ElMessage.error('保存设置失败')
  } finally {
    loading.value = false
  }
}

// 重置系统设置
const resetSettings = () => {
  settings.systemName = 'Vue Admin System'
  settings.theme = 'light'
  settings.language = 'zh'
  notificationSettings.email = true
  notificationSettings.sms = false
  ElMessage.success('设置已重置')
}
</script>

<style scoped>
.settings-container {
  height: 100vh;
  min-height: 0;
  box-sizing: border-box;
  padding: 20px;
}
.full-height {
  height: 100%;
}
.left-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}
.fill-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1f36;
}

.user-info-card,
.password-card {
  height: auto;
  min-height: 0;
  display: block;
}

.system-settings-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.system-settings-card .settings-form {
  flex: 1 1 auto;
  min-height: 0;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.system-settings-card .el-row {
  flex-direction: column;
  gap: 0;
}

.system-settings-card .el-col {
  width: 100%;
  max-width: 100%;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.username {
  margin: 10px 0 5px;
  font-size: 18px;
  color: #1a1f36;
}

.status-tag {
  margin-top: 5px;
}

.info-list {
  padding: 10px 0;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #606266;
}

.info-item .el-icon {
  margin-right: 8px;
  font-size: 16px;
  color: #909399;
}

.info-item .label {
  width: 70px;
  color: #909399;
}

.info-item .value {
  flex: 1;
  color: #1a1f36;
}

.theme-option,
.language-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.theme-preview.light {
  background: #ffffff;
}

.theme-preview.dark {
  background: #1a1f36;
}

.flag {
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input__wrapper),
:deep(.el-select) {
  width: 100%;
}

:deep(.el-checkbox) {
  margin-right: 0;
  width: 100%;
}

:deep(.el-checkbox__label) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.el-divider) {
  margin: 24px 0;
}

.notification-center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notification-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  padding: 6px 16px;
  border-radius: 6px;
  background: #f7f8fa;
  transition: background 0.2s;
}
.notification-checkbox .el-icon {
  font-size: 18px;
  color: #409eff;
}
.notification-checkbox .el-checkbox__label {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style> 