import request from '@/utils/request'
import type {
  UserInfoApi,
  loginRes,
  registerApi,
  registerRes,
  wxLoginRes
} from '@/types/user'

// 获取国家列表
export const getCountry = (data: any) =>
  request<any>('/system/country/tree', 'post', data)
// 购物平台管理
export const platformAll = () =>
  request<object[]>('/system/platform/getAll', 'get')
// 营销分类
export const cateseAll = () =>
  request<object[]>('/system/catesell/getAll', 'get')
// 推广类别
export const catereAll = () => request<object[]>('/system/catere', 'get')
// 根据资源id获取推广类别
export const catestAllList = (params: any) =>
  request<object[]>(`/system/catest`, 'get', params)
// 首页资源
export const userListPage = (data: any) =>
  request<any>('/system/medium/listPage', 'post', data)
// 收藏
export const collectAdd = (data: any) =>
  request<any>('/system/collect', 'post', data)
// 取消收藏
export const collectDelete = (params: any) =>
  request<any>('/system/collect/del', 'get', params)
// 热门
export const getRank = (data: any) =>
  request<any>('/system/medium/getRank', 'post', data)

//获取首页导航栏
export const getFront = () => request<any>('/system/front', 'get')
// 下载
export const LinkDown = (params: any) =>
  request<any>('/file/down', 'get', params)

// 增加浏览记录
export const userBehaviorAdd = () =>
  request<any>('/member/userBehavior/add', 'get')
