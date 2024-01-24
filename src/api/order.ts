import request from '@/utils/request'
// 根据资源id获取推广类别
export const catestAll = (params: any) =>
  request<object[]>(`/system/catest`, 'get', params)
// 获取国家列表
export const getCountry = (data: any) =>
  request<object[]>('/system/country/tree', 'post', data)
// 购物平台管理
export const getOneplatform = (id: any) =>
  request<object[]>(`/system/platform/getOne/${id}`, 'get')
// 营销分类
export const getOneCatese = (id: any) =>
  request<object[]>(`/system/catesell/getOne/${id}`, 'get')
// 通过id回显推广类别
export const getOneCatere = (id: any) =>
  request<object[]>(`/system/catere/getOne/${id}`, 'get')

// 订单下单
export const submitOmsOrder = (data: any) =>
  request<any>('/order/omsOrder/submit', 'post', data)

// 查看订单列表
export const getOrderInfoById = (params: any) =>
  request<any>('/order/omsOrder/getOrderInfoById', 'get', params)
