export interface Cache<T> {
    getFlushTime(): number;
    getFlushDuration(): number;
    getCashData(): T;
    setCashData(cashData: T): void;
    setFlushTime(flushTime: number): void;
    setFlushDuration(flushDuration: number): void;
}

export interface CacheType<T> {
    // ��������
    cashData: T;
    // ����ʱ��
    flushTime: number;
    // ����ʱ��
    flushDuration: number;
}

