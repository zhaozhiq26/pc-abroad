import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, checkStatusAPI, getUserInfo } from '@/api/user'
import type { loginRes } from '@/types/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 存储登录信息
    const loginInfo = ref()
    // 存储用户信息
    const userInfo = ref<any>()
    // 登录
    const Userlogin = async (loginForm: loginRes) => {
      const res = await login(loginForm)
      loginInfo.value = res.data
    }
    // 微信登录
    // const wxLogin = async (vxLoginObj: any) => {
    //   const res = await wxLoginAPI(vxLoginObj)
    //   loginInfo.value = res.data
    // }
    const wxLogin = async (code: any) => {
      const res = await checkStatusAPI(code)
      loginInfo.value = res.data
  }
    // 获取用户信息
    const setUserInfo = async () => {
      const res = await getUserInfo()
      userInfo.value = res.data
    }
    // 退出登录
    const logout = async () => {
      loginInfo.value = undefined
      userInfo.value = undefined
    }
    return {
      Userlogin,
      loginInfo,
      wxLogin,
      userInfo,
      setUserInfo,
      logout
    }
  },
  {
    persist: {
      paths: ['loginInfo', 'userInfo', 'userInfoID']
    }
  }
)
