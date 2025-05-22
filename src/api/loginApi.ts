import { http } from '@/utils/http'

import type { LoginParams, LoginResponse, RegisterParams } from '@/types/business/login'

export class LoginApi {
    private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL + '/user'

    static async login(params: LoginParams) {
        return http.post<ApiResponse<LoginResponse>>(this.BASE_URL + '/login', params)
    }

    static async register(params: RegisterParams) {
        return http.post<ApiResponse<null>>(this.BASE_URL + '/register', params)
    }
}
