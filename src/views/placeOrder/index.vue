<template>
  <div class="place_order">
    <Header></Header>
    <div class="header_nav">
      <div class="header_title">
        <i class="iconfont icon-jurassic_radio" />
        <span>
          订单有疑问，可点击对方头像，发起留言。如上帖失败，系统会发起原路退款
        </span>
      </div>
      <div class="step_title">
        <span class="step_one"></span>
        <span :class="[num === 2 || num === 3 ? 'active_two' : 'step_two']">
        </span>
        <span :class="[num === 3 ? 'active_three' : 'step_three']"></span>
        <span class="step_four"></span>
      </div>
    </div>
    <OrderForm v-show="isNum === 1" @dropOrderChange="orderChange"></OrderForm>
    <orderSelect
      v-if="isNum === 2"
      @return-up-step="selectReturn"
      @nextIssueOrder="selectDateOrder"
      :orderObj="orderObj"
    >
    </orderSelect>
    <IssueOrder
      v-if="isNum === 3"
      :orderObj="orderObj"
      @returnUpStepOrder="selectDateMultiple"
    >
    </IssueOrder>
    <YwFloat v-if="route.path !== '/'" />
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header/index.vue'
import OrderForm from './components/orderForm.vue'
import orderSelect from './components/orderSelect.vue'
import IssueOrder from './components/issueOrder.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const num = ref<number>(0)
const isNum = ref<number>(1)
const orderObj = ref<any>()
const route = useRoute()
// 表单下一步
const orderChange = (item: any, index: number) => {
  orderObj.value = item
  isNum.value = index
  num.value = index
}
// 选择订单上一步
const selectReturn = (index: number) => {
  num.value = index
  isNum.value = index
}
// 选择订单下一步
const selectDateOrder = (item: any, index: number) => {
  orderObj.value = item
  isNum.value = index
  num.value = index
  console.log(orderObj.value)
}
// 选择时间发布上一步
const selectDateMultiple = (index: number) => {
  num.value = index
  isNum.value = index
}
userStore.setUserInfo()
</script>
<style lang="scss" scoped>
.place_order {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  .header_nav {
    width: 1400px;
    margin-left: auto;
    margin-right: auto;
    .header_title {
      height: 38px;
      background: #fefbea;
      border-radius: 4px;
      display: flex;
      align-items: center;
      margin-top: 16px;
      padding: 0 16px;
      span {
        font-size: 14px;
        color: #ef6706;
        margin-left: 11px;
      }
    }
    .step_title {
      margin-top: 16px;
      display: flex;
      height: 38px;
      span {
        width: 350px;
      }
      .step_one {
        background: url('../../assets/img/group_one.png') no-repeat;
        background-size: 100% 100%;
      }
      .step_two {
        background: url('../../assets/img/group_two.png') no-repeat;
        background-size: 100% 100%;
      }
      .step_three {
        background: url('../../assets/img/group_three.png') no-repeat;
        background-size: 100% 100%;
      }
      .step_four {
        background: url('../../assets/img/group_four.png') no-repeat;
        background-size: 100% 100%;
      }
      .active_two {
        background: url('../../assets/img/group_active_two.png') no-repeat;
        background-size: 100% 100%;
      }

      .active_three {
        background: url('../../assets/img/group_active_three.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
