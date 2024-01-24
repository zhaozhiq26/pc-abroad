export interface invoiceApi {
  /**
   * 接收地址
   */
  address?: string | undefined
  /**
   * 银行名称
   */
  bank?: string | undefined
  /**
   * 银行卡号
   */
  card?: string | undefined
  /**
   * 企业名称
   */
  companyName?: string | undefined
  /**
   * 邮箱
   */
  email?: string | undefined
  id?: number
  /**
   * 身份证号
   */
  idNumber?: string | undefined
  /**
   * 手机号
   */
  phone?: string | undefined
  /**
   * 社会统一信用代码
   */
  succ?: string | undefined
  /**
   * 发票抬头类型,0-个人,1-企业
   */
  type: number
  /**
   * 用户id
   */
  userId?: string | undefined
  /**
   * 个人名称
   */
  userName?: string | undefined
}
export interface walletListApi {
  /**
   * 交易类型
   */
  type?: number | undefined
  /**
   * 页码数
   */
  pageNum: number
  /**
   * 条数
   */
  pageSize: number
  /**
   * 起始时间
   */
  startTime?: string | undefined
  /**
   * 结束时间
   */
  endTime?: string | undefined
  /**
   * 用户id
   */
  userId?: string | undefined
}
export interface issueInvoiceApi {
  /**
   * 交易类型
   */
  type?: number | undefined
  /**
   * 页码数
   */
  pageNum: number
  /**
   * 条数
   */
  pageSize: number
  /**
   * 起始时间
   */
  startTime?: string | undefined
  /**
   * 结束时间
   */
  endTime?: string | undefined
  /**
   * 媒体id
   */
  createId?: number | undefined
  /**
   * 媒体id
   */
  mediaName?: string | undefined
}
