
export class Cache<T> {
    private cashData: T
    private flushTime: number
    private flushDuration: number

    constructor() {
        this.cashData = {} as T
        this.flushTime = 0
        this.flushDuration = 0
    }

    getFlushTime() {
        return this.flushTime
    }

    getFlushDuration() {
        return this.flushDuration
    }

    getCashData() {
        return this.cashData
    }

    setCashData(cashData: T) {
        this.cashData = cashData
    }
}
