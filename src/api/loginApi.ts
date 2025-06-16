import { http } from '@/utils/http'

import { type RefreshJwtResponse, type ChangePasswordParams, type LoginParams, type LoginResponse, type RefreshJwtParams, type RegisterParams } from '@/types/global/auth'

export class AuthApi {
    private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/user'

    static async login(params: LoginParams) {
        return http.post<LoginResponse>(this.BASE_URL + '/login', params)
    }

    static async register(params: RegisterParams) {
        return http.post<null>(this.BASE_URL + '/register', params)
    }

    static async changePassword(params: ChangePasswordParams) {
        return http.post<null>(this.BASE_URL + '/change-password', params)
    }

    static async refreshJwt(params: RefreshJwtParams){
        return http.post<RefreshJwtResponse>(this.BASE_URL + '/refreshjwt', params)
    }
}
