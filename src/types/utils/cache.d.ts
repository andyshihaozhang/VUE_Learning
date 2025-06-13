export interface Cache<T> {
    getFlushTime(): number;
    getFlushDuration(): number;
    getCashData(): T;
    setCashData(cashData: T): void;
    setFlushTime(flushTime: number): void;
    setFlushDuration(flushDuration: number): void;
}

export interface CacheType<T> {
    // 缓存数据
    cashData: T;
    // 缓存时间
    flushTime: number;
    // 缓存时长
    flushDuration: number;
}

