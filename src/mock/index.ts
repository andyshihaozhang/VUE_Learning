import Mock from 'mockjs'
import { mockUsers } from './user'

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
  const id = options.url.split('/').pop()
  const user = mockUsers.find(u => u.id === id)
  
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
    id: String(mockUsers.length + 1),
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
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
  const id = options.url.split('/').pop()
  const body = JSON.parse(options.body)
  const index = mockUsers.findIndex(u => u.id === id)
  
  if (index > -1) {
    mockUsers[index] = {
      ...mockUsers[index],
      ...body,
      updatedAt: new Date().toISOString()
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
  const id = options.url.split('/').pop()
  const index = mockUsers.findIndex(u => u.id === id)
  
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