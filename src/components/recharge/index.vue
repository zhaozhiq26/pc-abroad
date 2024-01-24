<template>
  <div>
    <el-dialog
        v-model="topUpDialogVisible"
        :close-on-click-modal="false"
        width="559"
        @close="rechargeClose"
        @keyup.esc="handleKeyup"
    >
      <div class="top_up_pirce">
        <div class="top_up_content">
          <h5>余额充值</h5>
          <div class="int_pirce">
            <el-input
                v-model="pirce"
                :formatter="
                (value:any) => `${value}`.replace(/\B(?=(\d{13})+(?!\d))/g, ',')
              "
                :parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                placeholder="自定义充值金额"
                type="text"
                @input="changeInput"
            >
            </el-input>
          </div>
          <div class="pirce_select">
            <span
                v-for="(pirce, index) in numberIndex"
                :key="index"
                :class="[index === number ? 'active' : '']"
                class="pointer"
                @click="handlePirce(pirce, index)"
            >
              {{ pirce }}
            </span>
          </div>
        </div>
        <div class="pay_way">
          <h5>支付方式</h5>
          <div class="pay_way_code">
            <qrcode-vue :size="120" :value="qrCodeText" level="H"/>
          </div>
          <div class="balance_img">
            <div class="balance_img_list">
              <img alt="" src="@/assets/img/wx-payment.png"/>
              <img alt="" src="@/assets/img/zfb-payment.png"/>
            </div>
          </div>
          <div class="actual_pirce">
            <span>实付款:</span><em>￥{{ pirce }}</em>
          </div>
          <div class="handle_immediately" @click="rechargeClose">完成</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import QrcodeVue from 'qrcode.vue'
import type {rechargeObjApi} from '@/types/personal'
import {rechargeQuery} from '@/api/personal'
import {useUserStore} from '@/stores'

const userStore = useUserStore()
const topUpDialogVisible = ref(false)
const pirce = ref<any>()
const number = ref<any>()
const qrCodeText = ref<any>('')
const timeInter = ref<any>(null)
const orderId = ref<any>()
const numberIndex = ref<any>([500, 1000, 1500, 2000, 3000, 5000])
const recharge = reactive<rechargeObjApi>({
  amount: undefined,
  payMethod: 'alipay',
  userId: userStore.userInfo?.userId
})
// 选金额
const handlePirce = (item: string, value: any) => {
  number.value = value
  pirce.value = item
  changeInput()
}

// 输入金额
const changeInput = async () => {
  console.log(pirce.value)
  if (pirce.value) {
    console.log(2)
    recharge.amount = Number(pirce.value).toFixed(2)
  } else {
    qrCodeText.value = ''
    clearInterval(timeInter.value)
    return false
  }
  let id = new Date().getTime().toString()
  clearInterval(timeInter.value)
  qrCodeText.value = `${
      import.meta.env.VITE_APP_BASE_URL
  }?id=${id}&type=3&userId=${recharge.userId}&month=${recharge.amount}`
  orderId.value = id
  loopOrderState()
}
// 查询支付状态
const loopOrderState = () => {
  const data = {
    rechargeId: orderId.value
  }
  timeInter.value = setInterval(() => {
    console.log(timeInter, timeInter.value)
    rechargeQuery(data)
        .then((res: any) => {
          if (res.data.status === 'succeeded') {
            clearInterval(timeInter.value)
            window.clearInterval(timeInter.value)
            ElMessage({
              message: '支付成功!',
              type: 'success'
            })
            topUpDialogVisible.value = false
          }
        })
        .catch(() => {
          clearInterval(timeInter.value)
          window.clearInterval(timeInter.value)
          ElMessage.error('支付失败')
        })
  }, 3000)
}
// 充值
const handleRecharge = () => {
  topUpDialogVisible.value = true
}
// 关闭充值
const rechargeClose = (value: any) => {
  // timeInter.value = null
  clearInterval(timeInter.value)
  window.clearInterval(timeInter.value)
  topUpDialogVisible.value = false
  recharge.amount = undefined
  number.value = undefined
  pirce.value = undefined
  qrCodeText.value = ''
  returnUserInfo()
}
const handleKeyup = (event: KeyboardEvent) => {
  clearInterval(timeInter.value)
  window.clearInterval(timeInter.value)
}
const emit = defineEmits()
// 回个人信息
const returnUserInfo = () => {
  timeInter.value = null
  clearInterval(timeInter.value)
  window.clearInterval(timeInter.value)
  emit('returnUserInfo', '')
}
defineExpose({
  handleRecharge
})
</script>
<style lang="scss" scoped>
.top_up_pirce {
  display: flex;

  .top_up_content {
    font-size: 14px;
    border-right: 1px solid #ebedf0;
    // padding-right: 20px;
    width: 324px;

    h5 {
      color: #111;
      font-weight: bold;
    }

    .int_pirce {
      margin-top: 12px;
      padding-right: 22px;
    }

    .pirce_select {
      margin-top: 44px;

      .active {
        background: #098d72;
        color: #fff;
      }

      span {
        display: inline-block;
        width: 88px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        color: #333;
        font-weight: bold;
        margin: 16px 18px 0 0;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #d9d9d9;
      }
    }
  }

  .pay_way {
    padding-left: 24px;
    width: 190px;

    h5 {
      font-size: 14px;
      font-weight: bold;
      color: #111;
    }

    .pay_way_code {
      margin-top: 44px;
      display: flex;
      justify-content: center;

      img {
        width: 100px;
      }
    }

    .balance_img {
      margin-top: 30px;
      display: flex;
      justify-content: center;

      .balance_img_list {
        display: flex;
        justify-content: space-between;
        width: 100px;

        img {
          width: 16px;
        }
      }
    }

    .actual_pirce {
      width: 100%;
      text-align: center;
      margin-top: 16px;

      span {
        color: #111;
        font-weight: bold;
      }

      em {
        color: #f3294d;
      }
    }

    .handle_immediately {
      width: 76px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #098d72;
      margin-top: 38px;
      margin-left: auto;
      margin-right: auto;
      color: #098d72;
    }
  }
}
</style>
