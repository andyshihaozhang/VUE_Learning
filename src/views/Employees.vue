<template>
  <el-card class="employees">
    <template #header>
      <div class="card-header">
        <h2>员工信息</h2>
        <el-button type="primary" @click="handleAddEmployee">
          <el-icon><Plus /></el-icon>
          新增员工
        </el-button>
      </div>
    </template>
    
    <el-table 
      class="table-container"
      :data="employees" 
      v-loading="requestLoading">
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
    <FFPagination
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-size="pageSize"
    />

      <!-- 新增员工模态框 -->
    <EmployeeAddForm
      ref="addEmployeeFormRef"
      @formOver="handleAddEmployeeOver"
    />

    <!-- 编辑员工模态框 -->
    <EmployeeEditForm
      ref="editEmployeeFormRef"
      @formOver="handleEditEmployeeOver"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

import EmployeeStatusTag from '@/components/business/employee/EmployeeStatusTag.vue'
import EmployeeAddForm from '@/components/business/employee/EmployeeAddForm.vue'
import EmployeeEditForm from '@/components/business/employee/EmployeeEditForm.vue'
import { useEmployeeStore } from '@/stores/business/employeeStore'
import FFPagination from '@/components/global/FFPagination.vue'
import type { Employee } from '@/types/business/employee'
const employeeStore = useEmployeeStore()
const requestLoading = ref(false)

// 表单
const addEmployeeFormRef = ref<InstanceType<typeof EmployeeAddForm>>()
const editEmployeeFormRef = ref<InstanceType<typeof EmployeeEditForm>>()

const employees = ref<Employee[]>()
var currentPage = ref(1)
var pageSize = ref(16)
var total = ref(0)

// 获取用户列表
const getEmployees = async () => {
  requestLoading.value = true
  try {
    var response = await employeeStore.getEmployees({
      page: currentPage.value,
      pageSize: pageSize.value
    })
    employees.value = response.items
    currentPage.value = response.page
    pageSize.value = response.pageSize
    total.value = response.total
  } catch (error : any) {
    ElMessage.error(error.message)
  } finally {
    requestLoading.value = false
  }
}

// 打开新增员工表单
const handleAddEmployee = () => {
  addEmployeeFormRef.value?.openForm()
}

// 处理新增用户
const handleAddEmployeeOver = async () => {
  try {
    addEmployeeFormRef.value?.closeForm()
    getEmployees()
  } catch (error : any) {
    ElMessage.error(error.message)
  }
}


// 处理删除员工
const handleDeleteEmployee = async (id: number) => {
  try {
    await employeeStore.deleteEmployee(id)
    ElMessage.success('删除员工成功')
    getEmployees()
  } catch (error : any) {
    ElMessage.error(error.message)
  }
}

// 处理编辑员工
const handleEditEmployeeOver = async () => {
  try {
    editEmployeeFormRef.value?.closeForm()
    getEmployees()
  } catch (error : any) {
      ElMessage.error(error.message)
  }
}

// 打开编辑模态框
const openEditModal = (employee: Employee) => {
  editEmployeeFormRef.value?.initForm(employee)
  editEmployeeFormRef.value?.openForm()
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
.employees {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.table-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-card__body) {
  height: calc(100% - 60px);
  padding: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
</style> 