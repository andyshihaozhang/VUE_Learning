import Mock from 'mockjs'
import { mockUsers } from './user'
import { mockProducts, mockProcesses } from './product'
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

// 产品列表接口
Mock.mock(/\/api\/products(\?.*)?$/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const page = parseInt(url.searchParams.get('page') || '1')
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10')
  
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = mockProducts.slice(start, end)
  
  return {
    code: 200,
    data: {
      items,
      total: mockProducts.length,
      page,
      pageSize,
      totalPages: Math.ceil(mockProducts.length / pageSize)
    },
    message: 'success'
  }
})

// 单个产品接口
Mock.mock(/\/api\/products\/\d+/, 'get', (options) => {
  const productId = parseInt(options.url.split('/').pop() || '0')
  const product = mockProducts.find(p => p.productId === productId)
  
  if (product) {
    return {
      code: 200,
      data: product,
      message: 'success'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '产品不存在'
  }
})

// 创建产品接口
Mock.mock('/api/products', 'post', (options) => {
  const body = JSON.parse(options.body)
  const newProduct = {
    productId: mockProducts.length + 1,
    ...body,
    createTime: new Date().toISOString()
  }
  mockProducts.push(newProduct)
  
  return {
    code: 200,
    data: newProduct,
    message: '创建成功'
  }
})

// 更新产品接口
Mock.mock(/\/api\/products\/\d+/, 'put', (options) => {
  const productId = parseInt(options.url.split('/').pop() || '0')
  const body = JSON.parse(options.body)
  const index = mockProducts.findIndex(p => p.productId === productId)
  
  if (index > -1) {
    mockProducts[index] = {
      ...mockProducts[index],
      ...body
    }
    return {
      code: 200,
      data: mockProducts[index],
      message: '更新成功'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '产品不存在'
  }
})

// 删除产品接口
Mock.mock(/\/api\/products\/\d+/, 'delete', (options) => {
  const productId = parseInt(options.url.split('/').pop() || '0')
  const index = mockProducts.findIndex(p => p.productId === productId)
  
  if (index > -1) {
    mockProducts.splice(index, 1)
    return {
      code: 200,
      data: null,
      message: '删除成功'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '产品不存在'
  }
})

// 工序列表接口
Mock.mock(/\/api\/processes(\?.*)?$/, 'get', (options) => {
  const url = new URL(options.url, 'http://localhost')
  const productId = parseInt(url.searchParams.get('productId') || '0')
  const page = parseInt(url.searchParams.get('page') || '1')
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10')
  
  const productProcesses = mockProcesses.filter(p => p.productId === productId)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = productProcesses.slice(start, end)
  
  return {
    code: 200,
    data: {
      items,
      total: productProcesses.length,
      page,
      pageSize,
      totalPages: Math.ceil(productProcesses.length / pageSize)
    },
    message: 'success'
  }
})

// 创建工序接口
Mock.mock('/api/processes', 'post', (options) => {
  const body = JSON.parse(options.body)
  const newProcess = {
    processId: mockProcesses.length + 1,
    ...body,
    createTime: new Date().toISOString(),
    employees: []
  }
  mockProcesses.push(newProcess)
  
  return {
    code: 200,
    data: newProcess,
    message: '创建成功'
  }
})

// 更新工序接口
Mock.mock(/\/api\/processes\/\d+/, 'put', (options) => {
  const processId = parseInt(options.url.split('/').pop() || '0')
  const body = JSON.parse(options.body)
  const index = mockProcesses.findIndex(p => p.processId === processId)
  
  if (index > -1) {
    mockProcesses[index] = {
      ...mockProcesses[index],
      ...body
    }
    return {
      code: 200,
      data: mockProcesses[index],
      message: '更新成功'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '工序不存在'
  }
})

// 删除工序接口
Mock.mock(/\/api\/processes\/\d+/, 'delete', (options) => {
  const processId = parseInt(options.url.split('/').pop() || '0')
  const index = mockProcesses.findIndex(p => p.processId === processId)
  
  if (index > -1) {
    mockProcesses.splice(index, 1)
    return {
      code: 200,
      data: null,
      message: '删除成功'
    }
  }
  
  return {
    code: 404,
    data: null,
    message: '工序不存在'
  }
}) 