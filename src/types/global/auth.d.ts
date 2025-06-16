import { Token } from "typescript"

export interface AuthInfo {
    userId: number
    username: string
    phone: string
    status: number
    role: string
}

export interface TokenInfo{
    accessToken: string
    refreshToken: string
    expiresAt: string
}

export interface LoginParams {
    phone: string
    password: string
}

export interface LoginResponse {
    authInfo: AuthInfo
    tokenInfo: TokenInfo
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

export interface RefreshJwtParams {
    refreshToken: string
}

export interface RefreshJwtResponse {
    tokenInfo: TokenInfo
}