import Mock from 'mockjs'
import type { User } from '@/types/user'
import { UserStatus } from '@/types/user'

// 模拟用户列表数据
const users: User[] = [
  { id: 1, username: 'admin', phonenumber: '18888888888', status: UserStatus.ACTIVE },
  { id: 2, username: 'user1', phonenumber: '18888888888', status: UserStatus.INACTIVE },
  { id: 3, username: 'user2', phonenumber: '18888888888', status: UserStatus.ACTIVE },
]

// 模拟获取用户列表
Mock.mock('/api/users', 'get', () => {
  return {
    code: 200,
    data: users,
    message: '获取成功'
  }
})

// 模拟添加用户
Mock.mock('/api/users', 'post', (options: any) => {
  const newUser = JSON.parse(options.body)
  const user = {
    id: users.length + 1,
    ...newUser
  }
  users.push(user)
  return {
    code: 200,
    data: user,
    message: '添加成功'
  }
})

// 模拟删除用户
Mock.mock(/\/api\/users\/\d+/, 'delete', (options: any) => {
  const id = parseInt(options.url.match(/\/api\/users\/(\d+)/)[1])
  const index = users.findIndex(user => user.id === id)
  if (index > -1) {
    users.splice(index, 1)
  }
  return {
    code: 200,
    data: null,
    message: '删除成功'
  }
})

// 模拟更新用户
Mock.mock(/\/api\/users\/(\d+)/, 'put', (options: any) => {
  const id = parseInt(options.url.match(/\/api\/users\/(\d+)/)[1])
  const updatedUser = JSON.parse(options.body)
  const index = users.findIndex(user => user.id === id)
  if (index > -1) {
    users[index] = { ...users[index], ...updatedUser }
  }
  return {
    code: 200,
    data: users[index],
    message: '更新成功'
  }
}) 