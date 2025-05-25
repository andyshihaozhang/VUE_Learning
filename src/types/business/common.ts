// 进程状态枚举
export enum ProcessStatus {
    COMPLETED = '已完成',
    PENDING = '待开始',
    IN_PROGRESS = '进行中',
    CANCELLED = '已取消'
}

// 状态枚举
export enum ActiveStatus {
    ACTIVE = 0,
    INACTIVE = 1
}