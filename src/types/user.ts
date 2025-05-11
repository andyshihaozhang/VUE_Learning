// 用户角色枚举
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// 用户状态枚举
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

// 用户权限接口
export interface UserPermission {
  id: string;
  name: string;
  code: string;
  description: string;
}

// 用户角色接口
export interface UserRoleInfo {
  id: string;
  name: UserRole;
  permissions: UserPermission[];
  description: string;
}

// 用户基本信息接口
export interface UserBase {
  id: string;
  username: string;
  phone: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

// 用户详细信息接口
export interface UserDetail extends UserBase {}

// 用户查询参数接口
export interface UserQueryParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: UserStatus;
}

// 用户创建参数接口
export interface UserCreateParams {
  username: string;
  phone: string;
}

// 用户更新参数接口
export interface UserUpdateParams {
  username?: string;
  phone?: string;
  status?: UserStatus;
}

// 用户列表响应接口
export interface UserListResponse {
  items: UserDetail[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 用户操作结果接口
export interface UserOperationResult {
  success: boolean;
  message: string;
  data?: UserDetail;
}

// Omit用于从User类型中移除id属性，返回一个新的类型NewUser，id由服务器生成
export type NewUser = Omit<User, 'id'>

// Partial用于将User类型中的id属性变为可选属性，返回一个新的类型UpdateUser
export type UpdateUser = Partial<Omit<User, 'id'>>

// API 响应接口
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
} 