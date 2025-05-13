import Mock from 'mockjs'
import { mockUsers } from './user'
import { EmployeeStatus } from '../types/employee'

// 设置延迟时间
Mock.setup({
  timeout: '200-600'
})

// 用户列表接口
Mock.mock(/\/api\/users(\?.*)?$/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const page = parseInt(url.searchParams.get('page') || '1')
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10')
  
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = mockUsers.slice(start, end)
  
  return {
    code: 200,
    data: {
      items,
      total: mockUsers.length,
      page,
      pageSize,
      totalPages: Math.ceil(mockUsers.length / pageSize)
    },
    message: 'success'
  }
})

// 单个用户接口
Mock.mock(/\/api\/users\/\d+/, 'get', (options) => {
  const employeeId = parseInt(options.url.split('/').pop() || '0')
  const user = mockUsers.find(u => u.employeeId === employeeId)
  
  if (user) {
    return {
      code: 200,
      data: user,
      message: 'success'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '用户不存在'
  }
})

// 创建用户接口
Mock.mock('/api/users', 'post', (options) => {
  const body = JSON.parse(options.body)
  const newUser = {
    employeeId: mockUsers.length + 1,
    ...body,
    employeeCreateTime: new Date().toISOString()
  }
  mockUsers.push(newUser)
  
  return {
    code: 200,
    data: newUser,
    message: '创建成功'
  }
})

// 更新用户接口
Mock.mock(/\/api\/users\/\d+/, 'put', (options) => {
  const employeeId = parseInt(options.url.split('/').pop() || '0')
  const body = JSON.parse(options.body)
  const index = mockUsers.findIndex(u => u.employeeId === employeeId)
  
  if (index > -1) {
    mockUsers[index] = {
      ...mockUsers[index],
      ...body
    }
    return {
      code: 200,
      data: mockUsers[index],
      message: '更新成功'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '用户不存在'
  }
})

// 删除用户接口
Mock.mock(/\/api\/users\/\d+/, 'delete', (options) => {
  const employeeId = parseInt(options.url.split('/').pop() || '0')
  const index = mockUsers.findIndex(u => u.employeeId === employeeId)
  
  if (index > -1) {
    mockUsers.splice(index, 1)
    return {
      code: 200,
      data: null,
      message: '删除成功'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '用户不存在'
  }
})

// 批量删除用户接口
Mock.mock('/api/users/batch-delete', 'post', (options) => {
  const { ids } = JSON.parse(options.body)
  const deletedCount = ids.reduce((count: number, id: number) => {
    const index = mockUsers.findIndex(u => u.employeeId === id)
    if (index > -1) {
      mockUsers.splice(index, 1)
      return count + 1
    }
    return count
  }, 0)
  
  return {
    code: 200,
    data: null,
    message: `成功删除 ${deletedCount} 个用户`
  }
})

// 更新用户状态接口
Mock.mock(/\/api\/users\/\d+\/status/, 'patch', (options) => {
  const employeeId = parseInt(options.url.split('/')[3] || '0')
  const { status } = JSON.parse(options.body)
  const index = mockUsers.findIndex(u => u.employeeId === employeeId)
  
  if (index > -1) {
    mockUsers[index].employeeStatus = status
    return {
      code: 200,
      data: mockUsers[index],
      message: '状态更新成功'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '用户不存在'
  }
}) 