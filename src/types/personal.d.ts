// 公告栏
export interface collectPageObj {
  /**
   * 0不显示  1显示
   */
  collect?: '0' | '1'
  /**
   * 页码
   */
  current: number
  // 分页条数
  pageSize: number
  /**
  /**
   * 用户id 只有当用户是否需要收藏时有效果
   */
  userId?: string | ''
}
// 图文订单列表
export interface imgTextObjApi {
  current: number
  endOrderTime: string
  pageSize: number
  /**
   * 4为寄样订单
   */
  promId?: string | ''
  resourceTitle?: string
  sellId?: string | ''
  startOrderTime?: string | ''
  userId?: string | ''
  orderStatusList?: [] | undefined
}
// 评价
export interface evaluateObjApi {
  /**
   * 内容
   */
  content?: string
  /**
   * 修改时不能为空，新增时可以为空
   */
  resourceId?: number
  /**
   * 订单id
   */
  orderItemId?: number
  /**
   * 图片
   */
  pic?: string
  /**
   * 评分
   */
  score?: number
  /**
   * 用户id
   */
  userId?: number
}

// 充值
export interface rechargeObjApi {
  /**
   * 充值金额
   */
  amount?: any | undefined
  /**
   * 支付方式
   */
  payMethod?: string
  /**
   * 用户id
   */
  userId?: string
}

// 绑定账号
export interface bindTerRes {
  pid?: number | null
  code: string
  email?: string | undefined
  username?: string | undefined
  password: string
  confirmPassword: string
  type: 0 | 1
  userId: string | null
}
