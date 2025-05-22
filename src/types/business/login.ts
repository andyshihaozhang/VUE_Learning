export interface LoginInfo {
    userId: number
    username: string
    password: string
    phone: string
    status: number
    role: string
    token: string
}

export interface LoginParams {
    phone: string
    password: string
}

export interface LoginResponse {
    userId: number
    username: string
    password: string
    phone: string
    status: number
    role: string
    token: string
}
