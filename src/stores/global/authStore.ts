/*
* 全局认证状态
* 认证用户基本信息
* 认证api调用函数接口
*/

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
    AuthInfo, 
    LoginParams, 
    RegisterParams, 
    ChangePasswordParams, 
    TokenInfo
} from '@/types/global/auth'
import { AuthApi } from '@/api/loginApi'
import { StoreId } from '@/enums/storeEnums'

export const useAuthStore = defineStore(StoreId.Auth, function() {
    const authInfo = ref<AuthInfo | null>(null)
    const isLoggedIn = ref(false)
    
    // 登陆
    async function login(loginParams: LoginParams, onSuccess: () => void) {
        try {
            const response = await AuthApi.login(loginParams)
            if (response) {
                authInfo.value = response.data.authInfo
                await setJwtToLocal(response.data.tokenInfo)
                isLoggedIn.value = true
            }
            onSuccess()
        } catch (error) {
            console.error('请求异常', error)
        }   
    }

    // 注册
    async function register(registerForm: RegisterParams, onSuccess: () => void) {
        try {
            const params: RegisterParams = { 
                phone: registerForm.phone, 
                password: registerForm.password, 
                username: registerForm.username 
            }
            const response = await AuthApi.register(params)
            if (response) {
                isLoggedIn.value = true
            }
            onSuccess()
        } catch (error) {
            console.error('请求异常', error)
        }
    }

    // 修改密码
    async function changePassword(oldPassword: string, newPassword: string) {
        try {
            const params: ChangePasswordParams = { oldPassword, newPassword }
            const response = await AuthApi.changePassword(params)
            if (response) {
                isLoggedIn.value = true
            }
        } catch (error) {
            console.error('请求异常', error)
        }   
    }

    // JWT持久化
    async function setJwtToLocal(tokenInfo: TokenInfo) {
        localStorage.setItem('access_token', tokenInfo.accessToken)
        localStorage.setItem('refresh_token', tokenInfo.refreshToken)
        localStorage.setItem('expires_time', tokenInfo.expiresAt)
    }

    async function refreshJwt(){
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
            throw new Error('No refresh token found')
        }
        const response = await AuthApi.refreshJwt({refreshToken})
        await setJwtToLocal(response.data.tokenInfo)
    }

    // 获取有效JWT认证
    async function getAccessToken(): Promise<string | null> {
        const expiresTime = localStorage.getItem('expires_time')
        const currentTime = new Date().getTime()
        
        if (!expiresTime) {
            return null
        }
        
        const expiresTimeNum = parseInt(expiresTime)
        if (isNaN(expiresTimeNum)) {
            console.error('Invalid expires time format')
            return null
        }
        
        if (expiresTimeNum < currentTime) {
            try {
                await refreshJwt()
                const newToken = localStorage.getItem('access_token')
                return newToken
            } catch (error) {
                console.error('Token refresh failed:', error)
                localStorage.removeItem('access_token')
                localStorage.removeItem('expires_time')
                return null
            }
        }

        return localStorage.getItem('access_token')
    }

    return { 
        authInfo,
        isLoggedIn, 
        login, 
        register, 
        changePassword,
        getAccessToken,
        refreshJwt
    }
})

