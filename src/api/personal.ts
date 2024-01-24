import request from '@/utils/request'
// 公告栏
export const bulletinBoard = () =>
  request<any>('/media/bulletinBoard/' + 0, 'get')
// 图文订单
export const orderListPage = (data: any) =>
  request<any>('/order/omsOrder/listUserByGraphicsTextPage', 'post', data)

// 订单状态列表
export const orderStatusList = () =>
  request<any>('/order/omsOrder/orderStatusList', 'get')

// 查看拒绝理由
export const orderReject = (params: any) =>
  request<any>('/order/reject', 'get', params)

// 评分
export const addComment = (data: any) =>
  request<any>('/member/comment', 'post', data)

// 查看评分
export const checkComment = (data: any) =>
  request<any>('/member/comment/lookComment', 'post', data)

// 收藏
export const collectList = (params: any) =>
  request<any>('/system/collect', 'get', params)
// 寄样订单
export const listBySendSamplesPage = (data: any) =>
  request<any>('/order/omsOrder/listUserBySendSamplesPage', 'post', data)

// 充值
export const rechargeDo = (data: any) =>
  request<any>('/pay/recharge/do', 'post', data)
// 充值记录
export const rechargeQuery = (data: any) =>
  request<any>('/pay/recharge/query', 'post', data)
// 看看支付支付状态
export const getPayStatus = (params: any) =>
  request<any>('/pay/getPayStatus', 'get', params)

// 查看充值记录
export const rechargeRuery = (data: any) =>
  request<object[]>('/pay/recharge/query', 'post', data)

// 查看充值记录
export const walletRuery = (params: any) =>
  request<any>('/pay/wallet/query', 'GET', params)

// 确认订单
export const confirmOrder = (data: any) =>
  request<any>('/order/omsOrder/confirmOrder', 'post', data)

//二次确认订单
export const improvementConfirmation = (data: any) =>
  request<any>('/order/omsOrder/improvementConfirmation', 'post', data)

// 申请退款
export const requestRefun = (data: any) =>
  request<any>('/order/omsOrder/requestRefund', 'post', data)
// 问题中的申请退款
export const questionRequestRefund = (data: any) =>
  request<any>('/order/omsOrder/questionRequestRefund', 'post', data)
// 平台介入
export const platformIntervention = (data: any) =>
  request<any>('/order/omsOrder/platformIntervention', 'post', data)

// 待接单状态取消订单 单个
export const cancelOrder = (data: any) =>
  request<any>('/order/omsOrder/cancelOrder', 'post', data)

//创建订单取消订单 批量
export const cancelCreateOrderList = (data: any) =>
  request<any>('/order/omsOrder/cancelCreateOrderList', 'post', data)

//待接单状态取消订单 批量
export const cancelOrderList = (data: any) =>
  request<any>('/order/omsOrder/cancelOrderList', 'post', data)

// 编辑促销订单
export const editOrder = (data: any) =>
  request<any>('/order/omsOrder/edit', 'post', data)

// 编辑促销订单详情
export const getEditOrderDe = (id: any) =>
  request<any>(`/order/omsOrder/getById/${id}`, 'get')

// 订单下单
export const payByWallet = (data: any) =>
  request<any>('/pay/payByWallet', 'post', data)

// 扫码支付(延迟支付)
export const toDelayPay = (data: any) =>
  request<any>('/pay/toDelayPay', 'post', data)

// 聚合扫码支付
export const balanceMergePay = (data: any) =>
  request<any>('/pay/balanceMergePay', 'post', data)

// 聚合余额支付
export const scanMergePay = (data: any) =>
  request<any>('/pay/scanMergePay', 'post', data)

// 聚合订单id
export const getMergeId = (data: any) =>
  request<any>('/pay/getMergeId', 'post', data)
// 会员充值扫码支付
export const vipRecharge = (data: any) =>
  request<any>('/pay/vipRecharge', 'post', data)

// 会员充值余额支付
export const purchase = (data: any) =>
  request<any>('/pay/vip/purchase', 'post', data)
// 同意延长上贴
export const agreeExtendPosting = (data: any) =>
  request<any>('/order/omsOrder/agreeExtendPosting', 'post', data)

// 拒绝延长上贴
export const refuseExtenPosting = (data: any) =>
  request<any>('/order/omsOrder/refuseExtenPosting', 'post', data)

// 用户寄样
export const sampleSent = (data: any) =>
  request<any>('/order/omsOrder/sampleSent', 'post', data)

// 用户寄样订单填写code
export const setOrderCode = (data: any) =>
  request<any>('/order/omsOrder/setOrderCode', 'post', data)

// 反馈中心
// 用户反馈
export const postFeedback = (data: any) =>
  request<any>('/system/feedback', 'post', data)

// 修改密码
export const editMember = (data: any) => request<any>('/member', 'put', data)

// 电话绑定
export const bindRegister = (data: any) =>
  request<any>('/auth/register', 'post', data)

// 邮箱绑定
export const bindEmailRegister = (data: any) =>
  request<any>('/auth/emailRegister', 'post', data)
