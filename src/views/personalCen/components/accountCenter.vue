<template>
  <div class="account_center">
    <div class="account_header">
      <div class="header_select">
        <span :class="[num === '1' ? 'active' : '']" @click="handleChange"
          >交易流水</span
        >
        <span :class="[num === '2' ? 'active' : '']" @click="handleChange"
          >发票管理</span
        >
      </div>
      <div class="available">
        <span class="available_pirce">
          可用余额: <em>￥{{ balance }}</em>
        </span>
        <span class="top_up" @click="handleRecharge">充值</span>
      </div>
    </div>
    <AccountList v-show="num === '1'"></AccountList>
    <Invoicing v-show="num === '2'"></Invoicing>
    <Recharge ref="childComp" @returnUserInfo="getWalletRuery"></Recharge>
  </div>
</template>
<script lang="ts" setup>
import AccountList from '@/views/account/accountList.vue'
import Recharge from '@/components/recharge/index.vue'
import Invoicing from '@/views/account/invoicing.vue'
import { useUserStore } from '@/stores'
import { walletRuery } from '@/api/personal'
import type { rechargeObjApi } from '@/types/personal'
const userStore = useUserStore()
const topUpDialogVisible = ref(false)
const num = ref<string>('1')
const number = ref<any>()
const balance = ref<any>()
const childComp = ref<any>()
const recharge = reactive<rechargeObjApi>({
  amount: undefined,
  payMethod: 'alipay',
  userId: userStore.userInfo?.userId
})
const handleChange = () => {
  num.value = num.value === '1' ? '2' : '1'
}
// 充值
const handleRecharge = () => {
  childComp.value.handleRecharge()
}
// 充值成功查询余额
// const rechargeClose = async () => {
//   console.log(1)
//   const id = {
//     userId: userStore.userInfo?.userId
//   }
//   const res = await walletRuery(id)
//   balance.value = res.data.balance
// }
//
// 查询用户余额
const getWalletRuery = async () => {
  const id = {
    userId: userStore.userInfo?.userId
  }
  const res = await walletRuery(id)
  balance.value = res.data.balance
}
getWalletRuery()
</script>
<style lang="scss" scoped>
.account_center {
  padding: 16px 20px 0 20px;
  background: #fff;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid #ededed;
  height: 924px;
  width: 1226px;
  font-size: 14px;

  .account_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 49px;

    .header_select {
      span {
        height: 100%;
        height: 48px;
        color: #555;
        margin: 0 20px;
        cursor: pointer;
        line-height: 49px;
        display: inline-block;
      }

      .active {
        color: #098d72;
        border-bottom: 2px solid #098d72;
      }
    }

    .available {
      .available_pirce {
        color: #555;

        em {
          color: #f3294d;
          margin-left: 16px;
        }
      }

      .top_up {
        display: inline-block;
        width: 48px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #098d72;
        border-radius: 4px;
        color: #fff;
        margin-left: 8px;
      }
    }
  }
}
</style>
