// 员工状态枚举
export enum EmployeeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

// 用户基本信息接口
export interface EmployeeBase {
  employeeId: number;
  employeeName: string;
  employeePhone: number;
  employeeStatus: EmployeeStatus;
  employeeCreateTime: string;
}

// 用户详细信息接口
export interface EmployeeDetail extends EmployeeBase {}

// 用户查询参数接口
export interface EmployeeQueryParams {
  page: number;
  pageSize: number;
  search?: number;
  status?: EmployeeStatus;
}

// 用户创建参数接口
export interface EmployeeCreateParams {
  employeeName: string;
  employeePhone: number;
  employeeStatus: EmployeeStatus;
}

// 用户更新参数接口
export interface EmployeeUpdateParams {
  employeeId?: number;
  employeePhone?: number;
  employeeStatus?: EmployeeStatus;
}

// 用户列表响应接口
export interface EmployeeListResponse {
  items: EmployeeDetail[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 用户操作结果接口
export interface EmployeeOperationResult {
  success: boolean;
  message: string;
  data?: EmployeeDetail;
}

// API 响应接口
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
} 