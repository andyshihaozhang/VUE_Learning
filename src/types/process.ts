// 生产状态枚举
export enum ProcessStatus {
    COMPLETED = '已完成',
    PENDING = '待开始',
    IN_PROGRESS = '进行中'
  }


  // 流程接口
  export interface Process {
    indexId: number
    processId: number
    productId: number
    processName: string
    processDescription: string
    processPrice: number
    createTime: string
  }
  
