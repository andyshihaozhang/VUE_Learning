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
    ChangePasswordParams 
} from '@/types/global/auth'
import { LoginApi } from '@/api/loginApi'
import { StoreId } from '@/enums/storeEnums'


export const useAuthStore = defineStore(StoreId.Auth, () => {
    const authInfo = ref<AuthInfo | null>(null)
    const isLoggedIn = ref(false)
    
    const login = async (loginForm: LoginParams, onSuccess: () => void) => {
        try {
            const params: LoginParams = { phone: loginForm.phone, password: loginForm.password }
            const response = await LoginApi.login(params)
            if (response) {
                authInfo.value = response.data
                isLoggedIn.value = true
                localStorage.setItem('token', authInfo.value.token)
            }
            onSuccess()
        } catch (error) {
            console.error('请求异常', error)
        }   
    }

    const register = async (registerForm: RegisterParams, onSuccess: () => void) => {
        try {
            const params: RegisterParams = { phone: registerForm.phone, password: registerForm.password, username: registerForm.username }
            const response = await LoginApi.register(params)
            if (response) {
                isLoggedIn.value = true
            }
            onSuccess()
        } catch (error) {
            console.error('请求异常', error)
        }
    }
    
    const changePassword = async (oldPassword: string, newPassword: string) => {
        try {
            const params: ChangePasswordParams = { oldPassword, newPassword }
            const response = await LoginApi.changePassword(params)
            if (response) {
                isLoggedIn.value = true
            }
        } catch (error) {
            console.error('请求异常', error)
        }   
    }

    return { authInfo, isLoggedIn, login, register, changePassword }
})

