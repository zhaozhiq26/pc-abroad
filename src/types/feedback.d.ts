// 反馈中心
export interface FeedbackRes {
  id?: number
  userTypeId: 0 | 1
  typeId: 1 | 2 | 3
  problemDes?: string
  picUrl?: string
  phone?: string
}

