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
      
      <div class="table-container">
        <el-table 
          :data="employeeStore.employeeList" 
          style="width: 100%"
          v-loading="employeeStore.loading"
          height="calc(100vh - 270px)"
        >
          <el-table-column prop="employeeName" label="员工姓名" />
          <el-table-column prop="employeePhone" label="手机号" />
          <el-table-column prop="employeeStatus" label="状态">
            <template #default="scope">
              <EmployeeStatusTag :status="scope.row.employeeStatus" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" @click="openEditModal(scope.row)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="handleDeleteEmployee(scope.row.employeeId)">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页配置 -->
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next, jumper, ->, total"
          :total="employeeStore.total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          :page-size="pageSize"
        />
      </div>
    </el-card>

    <!-- 新增员工模态框 -->
    <el-dialog v-model="showAddModal" title="新增员工" width="400px">
      <EmployeeForm
        v-model="currentEmployeeForm"
        :is-edit="false"
        @submit="handleAddEmployee"
        @cancel="showAddModal = false"
      />
    </el-dialog>

    <!-- 编辑员工模态框 -->
    <el-dialog v-model="showEditModal" title="编辑员工" width="400px">
      <EmployeeForm
        v-model="currentEmployeeForm"
        :is-edit="true"
        @submit="handleEditEmployee"
        @cancel="showEditModal = false"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

import type { EmployeeDetail } from '@/types/business/employee'
import { ActiveStatus } from '@/types/business/common'
import EmployeeStatusTag from '@/components/user/EmployeeStatusTag.vue'
import EmployeeForm from '@/components/user/EmployeeForm.vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

// 控制新增员工模态框显示
const showAddModal = ref(false)
// 控制编辑员工模态框显示
const showEditModal = ref(false)
// 当前编辑的员工表单
const currentEmployeeForm = ref<Partial<EmployeeDetail>>({})

const currentPage = ref(1)
const pageSize = ref(16)

// 获取用户列表
const getEmployees = async () => {
  try {
    await employeeStore.fetchEmployees({
      page: currentPage.value,
      pageSize: pageSize.value
    })
  } catch (error) {
    ElMessage.error('获取员工列表失败')
  }
}

// 处理新增用户
const handleAddEmployee = async (employeeData: Partial<EmployeeDetail>) => {
  try {
    console.log("component: handleAddEmployee called with data:", employeeData)
    if (!employeeData.employeeName || !employeeData.employeePhone) {
      ElMessage.error('员工姓名和手机号为必填项')
      return
    }
    console.log("component: calling employeeStore.createEmployee")
    await employeeStore.createEmployee({
      employeeName: employeeData.employeeName,
      employeePhone: employeeData.employeePhone,
      employeeStatus: employeeData.employeeStatus as ActiveStatus
    })
    console.log("component: employeeStore.createEmployee completed")
    ElMessage.success('添加员工成功')
    showAddModal.value = false
    getEmployees()
  } catch (error) {
    console.error("component: handleAddEmployee error:", error)
    ElMessage.error('添加员工失败')
  }
}

// 处理删除员工
const handleDeleteEmployee = async (id: number) => {
  try {
    await employeeStore.deleteEmployee(id)
    ElMessage.success('删除员工成功')
    getEmployees()
  } catch (error) {
    ElMessage.error('删除员工失败')
  }
}

// 处理编辑员工
const handleEditEmployee = async (employeeData: Partial<EmployeeDetail>) => {
  if (!currentEmployeeForm.value.employeeId) return
  try {
    await employeeStore.updateEmployee(
      currentEmployeeForm.value.employeeId,
      employeeData
    )
    ElMessage.success('更新员工成功')
    showEditModal.value = false
    getEmployees()
  } catch (error) {
    ElMessage.error('更新员工失败')
  }
}

// 打开编辑模态框
const openEditModal = (employee: EmployeeDetail) => {
  currentEmployeeForm.value = { ...employee }
  showEditModal.value = true
}

// 处理页码变化
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  getEmployees()
}

// 处理每页条数变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
  getEmployees()
}

// 组件挂载时获取用户列表
onMounted(() => {
  getEmployees()
})
</script>

<style scoped>
.users {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.box-card {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  padding: 15px 0;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  z-index: 10;
}

:deep(.el-card__body) {
  height: calc(100% - 60px);
  padding: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

:deep(.el-table__body-wrapper) {
  overflow-y: auto;
  overflow-x: hidden;
}

:deep(.el-table__header-wrapper) {
  overflow: hidden;
}

:deep(.el-scrollbar__bar.is-horizontal) {
  height: 8px;
}

:deep(.el-scrollbar__bar.is-vertical) {
  width: 8px;
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