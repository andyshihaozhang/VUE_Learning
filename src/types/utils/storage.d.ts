
export interface CustomStorageTool {
    getItem<T>(key: string): Promise<T | null> | T;
    setItem<T>(key: string, value: T): Promise<T | null> | T;
}

export interface storage {
    // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 数据库名称, 默认值：Vue3PersistStorage
    name?: string;
    // 数据库中表名，默认值：DataShee
    storeName?: string;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
    // storage类型，有localStorage、sessionStroage（可选）
    storage?: Storage | CustomStorage;
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
}