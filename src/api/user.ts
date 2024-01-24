import request from '@/utils/request'
import type {
  UserInfoApi,
  loginRes,
  registerApi,
  registerRes,
  wxLogin1Req,
  wxLoginReq,
  wxLoginRes
} from '@/types/user'
import type { PasswordRes } from '@/types/set'

// 登录
export const login = (data: loginRes) => request<registerApi>('/auth/webLogin', 'post', data)

// 获取手机验证码
export const phoneCode = (query: any) => request('/member/register/' + query, 'get')

// 获取邮箱验证码
export const emCode = (query: any) => request('/member/emailRegister/' + query, 'get')

// 手机号注册
export const registerAPI = (data: registerRes) => request('/auth/register', 'post', data)

// 邮箱注册
export const emailRegisterAPI = (data: registerRes) => request('/auth/emailRegister', 'post', data)

// 微信登录
export const getQrCodeAPI = (type: any) => request<wxLoginReq>('/auth/getQrCode', 'get' , type)  // 获取验证码和ticket
export const checkStatusAPI = (code:any) => request<wxLogin1Req>('/auth/checkStatus', 'get', code) // 获取登录状态
export const wxLoginAPI = (query: wxLoginRes) =>
  request('/auth/back', 'get', query)

// 退出登录
export const logoutAPI = () => request('/auth/logout', 'delete')

// 获取用户信息
export const getUserInfo = () =>
  request<UserInfoApi>('/member/getMemberInfo', 'get')
// 修改个人信息
export const updateInfoAPI = (data: object | undefined) =>
  request('/media/updateInfo', 'put', data)

// 修改密码
export const putPassWordAPI = (data: PasswordRes) =>
  request('/media', 'put', data)

// 上传文件
export const fileUploadAPI = (file: any) =>
  request<any>('/file/upload', 'post', file, {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  })

// 公共时间
export const getNationDate = () => request<number>('/system/base', 'get')

// 忘记密码
export const sendCodeAPI = (type: number, number: string) =>
  request(`/member/sendCode/${type}/${number}`, 'get')
export const forgetPasswordAPI = (data: any) =>
  request('/member/forgetPassword', 'post', data)
