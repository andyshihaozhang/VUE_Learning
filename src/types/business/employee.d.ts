import { ActiveStatus } from '@/enums/businessEnum';

// 用户基本信息接口
export interface Employee {
  employeeId: number;
  employeeName: string;
  employeePhone: number;
  employeeStatus: ActiveStatus;
  employeeCreateTime: string;
}

// 全部用户响应接口
export interface AllEmployeeListResponse {
  items: Employee[];
  total: number;
}

// 用户查询参数接口
export interface EmployeeQueryParams {
  page: number;
  pageSize: number;
  search?: number;
  status?: ActiveStatus;
}

// 用户创建参数接口
export interface EmployeeCreateParams {
  employeeName: string;
  employeePhone: number;
  employeeStatus: ActiveStatus;
}

// 用户更新参数接口
export interface EmployeeUpdateParams {
  employeeId: number;
  employeeName?: string;
  employeePhone?: number;
  employeeStatus?: ActiveStatus;
}

// 用户列表响应接口
export interface EmployeeListResponse {
  items: Employee[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 用户操作结果接口
export interface EmployeeOperationResult {
  success: boolean;
  message: string;
  data?: Employee;
}

export interface EmployeeListByProductResponse {
  items: Employee[]
  total: number
}