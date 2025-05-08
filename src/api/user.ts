import request from '@/utils/request'

// �û���ؽӿ�
export interface User {
  id: number
  username: string
  email: string
  role: string
  status: number
  createTime: string
}

// �û��б��ѯ����
export interface UserQuery {
  page: number
  pageSize: number
  username?: string
  status?: number
}

// �û��б�������
export interface UserListResponse {
  total: number
  list: User[]
}

// ��ȡ�û��б�
export function getUserList(params: UserQuery) {
  return request.get<UserListResponse>('/user/list', params)
}

// ����û�
export function addUser(data: Omit<User, 'id' | 'createTime'>) {
  return request.post<User>('/user/add', data)
}

// �����û�
export function updateUser(id: number, data: Partial<User>) {
  return request.put<User>(`/user/${id}`, data)
}

// ɾ���û�
export function deleteUser(id: number) {
  return request.delete(`/user/${id}`)
}

// ��ȡ�û�����
export function getUserDetail(id: number) {
  return request.get<User>(`/user/${id}`)
}

// �޸��û�״̬
export function updateUserStatus(id: number, status: number) {
  return request.put(`/user/${id}/status`, { status })
}

// �����û�����
export function resetUserPassword(id: number) {
  return request.put(`/user/${id}/password/reset`)
}

// �ϴ��û�ͷ��
export function uploadUserAvatar(id: number, file: File) {
  return request.upload(`/user/${id}/avatar`, file)
} 