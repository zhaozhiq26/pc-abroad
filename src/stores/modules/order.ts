import { defineStore } from 'pinia'
export const useOrderStore = defineStore(
  'order',
  () => {
    // 订单详情
    const orderObject = ref<any>()
    // 登录
    const orderHandle = async (item: any) => {
      orderObject.value = item
    }
    return {
      orderObject,
      orderHandle
    }
  },
  {
    persist: {
      paths: ['orderObject']
    }
  }
)
