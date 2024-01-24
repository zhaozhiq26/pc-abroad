import request from '@/utils/request'

// 查看发票抬头
export const getInvoiceTitle = () =>
  request<any>(`/system/invoice/getInvoiceTitle`, 'get')

// 新增发票抬头
export const addInvoice = (data: any) =>
  request<any>('/system/invoice/saveInvoiceTitle', 'post', data)
// 修改发票抬头
export const updateInvoice = (data: any) =>
  request<any>('/system/invoice/updateInvoiceTitle', 'PUT', data)
// 删除发票抬头
export const deteleInvoice = (id: any) =>
  request<any>(`/system/invoice/${id}`, 'DELETE')
// 查看开票记录
export const listByMemberId = (data: any) =>
  request<any>('/system/invoice/listByMemberId', 'post', data)
// 查询钱包记录列表
export const walletList = (data: any) =>
  request<any>('/pay/wallet/list', 'post', data)

// 查看可以开票的记录
export const ableInvoiceRecord = (data: any) =>
  request<any>('/system/invoice/ableInvoiceRecord', 'post', data)

// 提交开票
export const invoiceAdd = (data: any) =>
  request<any>('/system/invoice/add', 'post', data)
