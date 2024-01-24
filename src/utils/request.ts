import type { ApiReq } from '@/types/test'
import axios, { type Method } from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { useUserStore } from '@/stores'

const request = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000 // request timeout
})

// 添加请求拦截器
request.interceptors.request.use(
  config => {
    // (1) 添加请求头
    const userStore = useUserStore()
    if (userStore.loginInfo?.access_token) {
      config.headers.Authorization = userStore.loginInfo?.access_token
    }
    // config: 请求报文
    return config
  },
  error => {
    // 响应成功: 统一弹出成功提示框
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    const code = response.data.code || 200
    if (code === 200) {
      return response.data
    } else if (code === 401) {
      ElMessage({
        message: response.data.msg || '网络错误，请稍后重试',
        type: 'error'
      })
      window.localStorage.clear()
      location.href = '/'
    } else {
      ElMessage({
        message: response.data.msg || '网络错误，请稍后重试',
        type: 'error'
      })
      // 验证失败抛出错误
      return Promise.reject(response.data.code)
    }
  },
  error => {
    // (2) 响应失败: 统一弹出错误提示框

    // (3) 响应401: 转跳登录页

    return Promise.reject(error)
  }
)

function ajax<T> (
  url: string,
  method: Method = 'get',
  data: object = {},
  headers: object = {}
) {
  const requestMode = method.toLowerCase() === 'get' ? 'params' : 'data'
  return request<any, ApiReq<T>>({
    url,
    method,
    [requestMode]: data,
    headers
  })
}

export default ajax
