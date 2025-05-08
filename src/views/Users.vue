<template>
  <div class="users">
    <div class="header">
      <h2>用户管理</h2>
      <button class="add-btn" @click="showAddModal = true">
        <span class="icon">+</span>
        新增用户
      </button>
    </div>
    <div class="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>电话</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.phonenumber }}</td>
            <td>
              <UserStatusTag :status="user.status" />
            </td>
            <td>
              <button class="btn-edit">编辑</button>
              <button class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增用户模态框 -->
    <div class="modal" v-if="showAddModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>新增用户</h3>
          <button class="close-btn" @click="showAddModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <UserForm
            @submit="handleAddUser"
            @cancel="showAddModal = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, UserStatus } from '@/types/user'
import UserStatusTag from '@/components/user/UserStatusTag.vue'
import UserForm from '@/components/user/UserForm.vue'

// 模拟用户数据
const users = ref<User[]>([
  { id: 1, username: 'admin', phonenumber: '18888888888', status: UserStatus.ACTIVE },
  { id: 2, username: 'user1', phonenumber: '18888888888', status: UserStatus.INACTIVE },
  { id: 3, username: 'user2', phonenumber: '18888888888', status: UserStatus.ACTIVE },
])

// 控制新增用户模态框显示
const showAddModal = ref(false)

// 处理新增用户
const handleAddUser = (userData: Omit<User, 'id'>) => {
  const user = {
    id: users.value.length + 1,
    ...userData
  }
  users.value.push(user)
  showAddModal.value = false
}
</script>

<style scoped>
.users {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #40a9ff;
}

.icon {
  margin-right: 8px;
  font-size: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

button {
  padding: 4px 8px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #1890ff;
  color: white;
}

.btn-delete {
  background-color: #ff4d4f;
  color: white;
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
}
</style> 