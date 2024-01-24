import request from '@/utils/request'

// 定制服务新增
export const customMade = (data: any) =>
  request<any>('/member/customMade', 'post', data)
