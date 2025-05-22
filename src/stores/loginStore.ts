import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginInfo, LoginParams } from '@/types/business/login'
import { LoginApi } from '@/api/loginApi'


export const useLoginStore = defineStore('login', () => {
    const loginInfo = ref<LoginInfo | null>(null)
    const isLoggedIn = ref(false)
    
    const login = async (phone: string, password: string) => {
        try {
            const params: LoginParams = { phone, password }
            const response = await LoginApi.login(params)
            if (response?.data?.data) {
                loginInfo.value = response.data.data
                isLoggedIn.value = true
            }
        } catch (error) {
            console.error('请求异常', error)
        }   
    }

    return { loginInfo, isLoggedIn, login }
})

