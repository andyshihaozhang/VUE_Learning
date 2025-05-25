import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChangePasswordParams, LoginInfo, LoginParams, RegisterParams } from '@/types/business/login'
import { LoginApi } from '@/api/loginApi'


export const useLoginStore = defineStore('login', () => {
    const loginInfo = ref<LoginInfo | null>(null)
    const isLoggedIn = ref(false)
    
    const login = async (loginForm: LoginParams, onSuccess: () => void) => {
        try {
            const params: LoginParams = { phone: loginForm.phone, password: loginForm.password }
            const response = await LoginApi.login(params)
            if (response?.data?.data) {
                loginInfo.value = response.data.data
                isLoggedIn.value = true
            }
            console.log('loginInfo:', loginInfo.value)
            onSuccess()
        } catch (error) {
            console.error('请求异常', error)
        }   
    }

    const register = async (registerForm: RegisterParams, onSuccess: () => void) => {
        try {
            const params: RegisterParams = { phone: registerForm.phone, password: registerForm.password, username: registerForm.username }
            const response = await LoginApi.register(params)
            if (response?.data?.data) {
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
            if (response?.data?.data) {
                isLoggedIn.value = true
            }
        } catch (error) {
            console.error('请求异常', error)
        }   
    }

    return { loginInfo, isLoggedIn, login, register, changePassword }
})

