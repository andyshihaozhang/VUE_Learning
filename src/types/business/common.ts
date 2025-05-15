// 进程状态枚举
export enum ProcessStatus {
    COMPLETED = '已完成',
    PENDING = '待开始',
    IN_PROGRESS = '进行中',
    CANCELLED = '已取消'
}

// 状态枚举
export enum ActiveStatus {
    ACTIVE = '在职',
    INACTIVE = '离职'
}

// API 响应公共接口
export interface ApiResponse<T = any> {
    code: number;
    data: T;
    message: string;
  } 