<template>
  <div class="users">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>员工管理</h2>
          <el-button type="primary" @click="showAddModal = true">
            <el-icon><Plus /></el-icon>
            新增员工
          </el-button>
        </div>
      </template>
      <el-table :data="users.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
        <el-table-column prop="username" label="员工姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <UserStatusTag :status="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" size="small" @click="openEditModal(scope.row)">
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDeleteUser(scope.row.id)">
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="users.length"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        style="text-align: center; margin-top: 20px;"
      />
    </el-card>

    <!-- 新增用户模态框 -->
    <el-dialog v-model="showAddModal" title="新增用户" width="400px">
      <UserForm
        v-model="currentUserForm"
        :is-edit="false"
        @submit="handleAddUser"
        @cancel="showAddModal = false"
      />
    </el-dialog>

    <!-- 编辑用户模态框 -->
    <el-dialog v-model="showEditModal" title="编辑用户" width="400px">
      <UserForm
        v-model="currentUserForm"
        :is-edit="true"
        @submit="handleEditUser"
        @cancel="showEditModal = false"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UserDetail } from '@/types/user'
import { UserStatus } from '@/types/user'
import UserStatusTag from '@/components/user/UserStatusTag.vue'
import UserForm from '@/components/user/UserForm.vue'
import { UserApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

// 用户列表
const users = ref<UserDetail[]>([])
// 控制新增用户模态框显示
const showAddModal = ref(false)
// 控制编辑用户模态框显示
const showEditModal = ref(false)
// 当前编辑的用户
const currentUser = ref<UserDetail | null>(null)
// 当前编辑的用户表单
const currentUserForm = ref<Partial<UserDetail>>({})

const currentPage = ref(1)
const pageSize = ref(16)

// 获取用户列表
const getUsers = async () => {
  try {
    const response = await UserApi.getUsers({ page: 1, pageSize: 100 })
    console.log('API Response:', response)
    if (response?.data?.items) {
      users.value = response.data.items.map((user: UserDetail) => ({
        ...user,
        status: user.status as UserStatus
      }))
    } else {
      console.error('Invalid response format:', response)
      ElMessage.error('获取用户列表失败')
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    ElMessage.error('获取用户列表失败')
  }
}

// 处理新增用户
const handleAddUser = async (userData: Partial<UserDetail>) => {
  try {
    if (!userData.username || !userData.phone) {
      ElMessage.error('用户名和电话为必填项')
      return
    }
    const res = await UserApi.createUser({
      username: userData.username,
      phone: userData.phone
    })
    ElMessage.success(res.message || '添加用户成功')
    showAddModal.value = false
    getUsers()
  } catch (error) {
    ElMessage.error('添加用户失败')
  }
}

// 处理删除用户
const handleDeleteUser = async (id: string) => {
  try {
    await UserApi.deleteUser(id)
    ElMessage.success('删除用户成功')
    getUsers()
  } catch (error) {
    ElMessage.error('删除用户失败')
  }
}

// 处理编辑用户
const handleEditUser = async (userData: Partial<UserDetail>) => {
  if (!currentUser.value) return
  try {
    await UserApi.updateUser(currentUser.value.id, userData)
    ElMessage.success('更新用户成功')
    showEditModal.value = false
    getUsers()
  } catch (error) {
    ElMessage.error('更新用户失败')
  }
}

// 打开编辑模态框
const openEditModal = (user: UserDetail) => {
  currentUser.value = user
  Object.assign(currentUserForm.value, user)
  showEditModal.value = true
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
}

// 组件挂载时获取用户列表
onMounted(() => {
  getUsers()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-card) {
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

:deep(.el-card__header) {
  padding: 16px 20px;
  border-bottom: 1px solid #edf2f7;
  background-color: #fff;
}

:deep(.el-table) {
  --el-table-border-color: #edf2f7;
  --el-table-header-bg-color: #f8fafc;
}

:deep(.el-button--primary) {
  --el-button-bg-color: #1a1f36;
  --el-button-border-color: #1a1f36;
  --el-button-hover-bg-color: #2d3748;
  --el-button-hover-border-color: #2d3748;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #1a1f36;
}

:deep(.el-button .el-icon) {
  margin-right: 4px;
  vertical-align: middle;
}
</style> 