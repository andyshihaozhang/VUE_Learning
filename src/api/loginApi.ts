import { http } from '@/utils/http'

import type { LoginParams, LoginResponse } from '@/types/business/login'
import { type ApiResponse } from '@/types/business/common'

export class LoginApi {
    private static readonly BASE_URL = '/api/login'

    static async login(params: LoginParams) {
        return http.post<ApiResponse<LoginResponse>>(this.BASE_URL, params)
    }
}
