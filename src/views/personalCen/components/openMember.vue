<template>
  <div class="open_membe">
    <div class="open_membe_title" @click="handleReturn">
      <el-icon>
        <ArrowLeft/>
      </el-icon>
      <span>会员充值</span>
    </div>
    <div class="member_pirce">
      <div
          :class="[num === 1 ? 'member_pirce_list_active' : '']"
          class="member_pirce_list"
          @click="handleChange(1, '69.00')"
      >
        <span class="monthly">月付会员</span>
        <span class="pirce">
          <em>￥69.00</em>
          <el-text class="pirce_text" tag="del">￥138</el-text>
        </span>
        <img alt="" class="member_img" src="@/assets/img/half-discount.png"/>
      </div>
      <div
          :class="[num === 2 ? 'member_pirce_list_active' : '']"
          class="member_pirce_list"
          @click="handleChange(2, '199.00')"
      >
        <span class="monthly">季付会员</span>
        <span class="pirce">
          <em>￥199.00</em>
          <el-text class="pirce_text" tag="del">￥398</el-text>
        </span>
        <img alt="" class="member_img" src="@/assets/img/half-discount.png"/>
      </div>
      <div
          :class="[num === 3 ? 'member_pirce_list_active' : '']"
          class="member_pirce_list"
          @click="handleChange(3, '689.00')"
      >
        <span class="monthly">年付会员</span>
        <span class="pirce">
          <em>￥689.00</em>
          <el-text class="pirce_text" tag="del">￥1378</el-text>
        </span>
        <img alt="" class="member_img" src="@/assets/img/half-discount.png"/>
      </div>
    </div>
    <div class="payment">
      <div class="payment_pirce">
        <span>实付款：</span><em>￥{{ pirce }}</em>
      </div>
      <div class="payment_way">
        <div class="payment_code">
          <qrcode-vue :size="120" :value="qrCodeText" level="H"/>
        </div>
        <div class="payment_icon">
          <img alt="" src="@/assets/img/wx-payment.png"/>
          <img alt="" src="@/assets/img/zfb-payment.png"/>
        </div>
        <div class="balance">
          <span class="balance_content">
            <el-radio-group v-model="radio1" class="balance_radio">
              <el-radio label="1" size="large"><span></span></el-radio>
            </el-radio-group>
            <el-icon class="balance_icon">
              <Wallet/>
            </el-icon>
            <i class="balance_pirce">钱包余额</i>
          </span>
          <span class="balance_actual">￥{{ balance }}</span>
        </div>
        <div
            v-loading.fullscreen.lock="fullscreenLoading"
            class="handle_immediately"
            @click="handleChongMember"
        >
          立即支付
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import QrcodeVue from 'qrcode.vue'
import {getPayStatus, purchase, walletRuery} from '@/api/personal'
import {useUserStore} from '@/stores'

const userStore = useUserStore()
const radio1 = ref('1')
const num = ref<Number>(1)
const pirce = ref<string>('69.00')
const qrCodeText = ref<any>('')
const orderId = ref<any>()
const timeBuy = ref<any>(null)
const balance = ref<any>()
const fullscreenLoading = ref(false)
const state = reactive<any>({
  timeInter: null //定义定时器
})
const handleChange = (index: Number, item: string) => {
  num.value = index
  pirce.value = item
  clearInterval(state.timeInter)
  changePirce()
}
// 查询用户余额
const getWalletRuery = async () => {
  const id = {
    userId: userStore.userInfo?.userId
  }
  const res = await walletRuery(id)
  userStore.setUserInfo()
  balance.value = res.data.balance
}
const handleChongMember = async () => {
  let payStatus
  if (num.value === 1) {
    payStatus = 'month'
  } else if (num.value === 2) {
    payStatus = 'season'
  } else if (num.value === 3) {
    payStatus = 'year'
  }
  const data = {
    vipType: payStatus,
    userId: userStore.userInfo.userId,
    txId: new Date().getTime()
  }
  fullscreenLoading.value = true
  await purchase(data)
      .then(() => {
        ElMessage({
          message: '支付成功!',
          type: 'success'
        })
        clearInterval(state.timeInter)
        handleReturn()
        setTimeout(() => {
          userStore.setUserInfo()
          fullscreenLoading.value = false
        }, 1000)
      })
      .catch(() => {
        clearInterval(state.timeInter)
        setTimeout(() => {
          fullscreenLoading.value = false
        }, 1000)
      })
}
const changePirce = async () => {
  let payStatus
  if (num.value === 1) {
    payStatus = 0
  } else if (num.value === 2) {
    payStatus = 1
  } else if (num.value === 3) {
    payStatus = 2
  }
  let id = new Date().getTime().toString()
  clearInterval(state.timeInter)
  qrCodeText.value = `${
      import.meta.env.VITE_APP_BASE_URL
  }?id=${id}&type=2&userId=${userStore.userInfo.userId}&month=${payStatus}`
  orderId.value = id
  loopOrderState()
}
// 查询支付状态
const loopOrderState = () => {
  const data = {
    orderId: orderId.value
  }
  state.timeInter = setInterval(() => {
    getPayStatus(data)
        .then((res: any) => {
          if (res.data.status === 'succeeded') {
            clearInterval(state.timeInter)
            window.clearInterval(timeBuy.value)
            ElMessage({
              message: '购买成功!',
              type: 'success'
            })
            setTimeout(() => {
              userStore.setUserInfo()
              handleReturn()
            }, 1000)
          }
        })
        .catch(() => {
          clearInterval(state.timeInter)
          ElMessage.error('支付失败')
        })
  }, 3000)
}
clearInterval(state.timeInter)
// 回到个人信息页
const emit = defineEmits()
const handleReturn = () => {
  emit('handleReturn', '')
  clearInterval(state.timeInter)
}
onUnmounted(() => {
  clearInterval(state.timeInter)
  state.timeInter = null
})
changePirce()
getWalletRuery()
</script>
<style lang="scss" scoped>
.open_membe {
  width: 1228px;
  height: 924px;
  background: #ffffff;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid #ededed;
  padding: 24px;
  color: #111;

  .open_membe_title {
    cursor: pointer;
    text-align: center;
    display: inline-block;

    .el-icon svg {
      padding-top: 2px;
    }

    span {
      margin-left: 5px;
      line-height: 16px;
    }
  }

  .member_pirce {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .member_pirce_list {
      width: 328px;
      height: 79px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #dcdee0;
      position: relative;
      padding: 0 16px;

      .monthly {
        margin-top: 16px;
        font-weight: bold;
      }

      .pirce {
        margin-top: 6px;

        em {
          color: #f3294d;
          font-weight: bold;
        }

        .pirce_text {
          margin-left: 2px;
          font-size: 12px;
        }
      }

      .member_img {
        position: absolute;
        right: -13px;
        top: -20px;
        width: 95px;
        height: 67px;
      }

      span {
        display: block;
      }
    }

    .member_pirce_list_active {
      border: 2px solid #098d72;
    }
  }

  .payment {
    .payment_pirce {
      margin-top: 42px;

      em {
        color: #f3294d;
      }
    }

    .payment_way {
      width: 245px;
      margin: 38px 0 0 86px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .payment_code {
        img {
          width: 120px;
        }
      }

      .payment_icon {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        width: 100px;

        img {
          width: 16px;
        }
      }

      .balance {
        margin-top: 34px;
        width: 100%;
        height: 32px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #098d72;
        display: flex;
        padding: 0 13px;
        font-size: 14px;

        .balance_icon {
          margin-right: 5px;
          color: #098d72;
        }

        .balance_actual {
          margin-left: 16px;
          height: 32px;
          line-height: 32px;
        }

        .balance_pirce {
          margin-top: -2px;
        }

        .balance_content {
          height: 32px;
          display: flex;
          align-items: center;
        }
      }

      .handle_immediately {
        margin-top: 12px;
        width: 100%;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #ffffff;
        background: #098d72;
        border-radius: 4px;
        border: 1px solid #098d72;
      }
    }
  }
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  border: 1px solid #098d72;
  background-color: #098d72;
}
</style>
