// 微信登陆
export interface addAediaRes {
  id?: number
  countryId?: number
  sellId?: number
  promId?: number
  resourceTypeId?: number
  resourceName?: string
  resourceUrl?: string
  resourceFlow?: number
  flowUnit?: 'K' | 'M'
  flowAnalysis?: string
  averageView?: number
  viewUnit?: 'K' | 'M'
  price?: number
  ghostwritingPrice?: number
  adId?: number
  adSize?: string
  platforms?: string[]
  sfId?: number
  grounding?: string
  resourceDes?: string
}
// 微信登陆
export interface loginWx {
  type?: number
  code?: any
  state?: any
}
export interface frontPageObj {
  /**
   * 0不显示  1显示
   */
  collect?: '' | '0' | '1'
  /**
   * 国家id
   */
  countryId?: number
  resourceTypeId?: number
  /**
   * 页码
   */
  current: number
  /**
   * 搜索结束金额
   */
  endPrice?: string
  // 分页条数
  pageSize: number
  /**
   * 平台id
   */
  platforms?: string
  /**
   * 推广类别id
   */
  promId?: string
  /**
   * 粉丝量
   */
  fanInterval: [number, number]
  /**
   * 名字
   */
  resourceName?: string
  /**
   * 营销分类
   */
  sellId?: number | null
  /**
   * 搜索开始金额
   */
  startPrice?: string
  /**
   * 用户id 只有当用户是否需要收藏时有效果
   */
  userId?: string | ''
  /**
   * 类目
   */
  mediaCategory?: string
  /**
   * 类型
   */
  mediaType?: string
  /**
   * 类型
   */
  mediaClassification?: string
}

// /排行榜
export interface rankObject {
  /**
   * 可以为空，不为空时根据最新排行
   */
  newSort?: number
  /**
   * 第几页
   */
  pageNum?: number
  /**
   * 每页几条数据
   */
  pageSize?: number
  /**
   * 可以为空，不为空时根据热门排行
   */
  popularSort?: number
  /**
   * 可以为空，不为空时根据推荐排行
   */
  recommendSort?: number
}
