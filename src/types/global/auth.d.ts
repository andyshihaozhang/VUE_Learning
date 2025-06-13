export interface AuthInfo {
    token: string
    userId: number
    username: string
    phone: string
    status: number
    role: string
}

export interface LoginParams {
    phone: string
    password: string
}

export interface LoginResponse {
    token: string
    userId: number
    username: string
    phone: string
    status: number
    role: string
}

export interface RegisterParams {
    phone: string
    username: string
    password: string
}

export interface ChangePasswordParams {
    oldPassword: string
    newPassword: string
}
