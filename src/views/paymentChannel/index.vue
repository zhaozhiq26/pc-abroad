<template>
  <!-- <el-button @click="jsApiCall()" type="primary" plain> 支付 </el-button> -->
</template>
<script lang="ts" setup>
import { toDelayPay } from '@/api/personal'
const route = useRoute()
const payObj = ref<any>({
  code: '',
  state: '',
  id: '',
  type: undefined,
  userId: '',
  month: ''
})
console.log(import.meta.env.VITE_APP_BASE_URL)
payObj.value.id = route.query.id
payObj.value.type = route.query.type
payObj.value.userId = route.query.userId ? route.query.userId : ''
payObj.value.month = route.query.month ? route.query.month : ''
const orderInfo = ref<any>({})
// 判断扫码的客户端是微信还是支付宝（JS方式）
const isWeixinOrAlipay = () => {
  var userAgent: any = window.navigator.userAgent.toLowerCase()
  //判断是不是微信
  if (userAgent.match(/MicroMessenger/i) == 'micromessenger') {
    let url
    if (payObj.value.userId) {
      url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx269cf1501435a1e0&redirect_uri=${
        import.meta.env.VITE_APP_BASE_URL
      }&response_type=code&scope=snsapi_base&state=${payObj.value.id}_${
        payObj.value.month
      }_${payObj.value.userId}_${
        payObj.value.type
      }&connect_redirect=1#wechat_redirect`
    } else {
      url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx269cf1501435a1e0&redirect_uri=${
        import.meta.env.VITE_APP_BASE_URL
      }&response_type=code&scope=snsapi_base&state=${payObj.value.id}_${
        payObj.value.type
      }&connect_redirect=1#wechat_redirect`
    }
    window.location.replace(url)
    return 'WeiXIN'
  }
  //判断是不是支付宝
  if (userAgent.match(/Alipay/i) == 'alipay') {
    handleAlipay()
    return 'Alipay'
  }
  // 哪个都不是
  return false
}
const handleAlipay = async () => {
  let fakeId
  if (payObj.value.userId) {
    fakeId = `${payObj.value.id}_${payObj.value.month}_${payObj.value.userId}_${payObj.value.type}`
  } else {
    fakeId = `${payObj.value.id}_${payObj.value.type}`
  }
  // ElMessage({
  //   message: fakeId,
  //   type: 'success'
  // })
  let data = {
    payChannel: 'alipay',
    wxCode: payObj.value.code,
    fakeId: fakeId,
    orderSubmitParam: {
      payMethod: 1
    }
  }
  const res = await toDelayPay(data)
  if (res.code === 200) {
    window.location.href = res.data.qrUrl
  }
}
const getUserWxIfno = async () => {
  let data: any = {
    payChannel: 'wx_pub',
    fakeId: payObj.value.state,
    wxCode: payObj.value.code,
    orderSubmitParam: {
      payMethod: 2
    }
  }
  // ElMessage({
  //   message: data,
  //   type: 'success',
  //   duration: 6000
  // })
  let res = await toDelayPay(data)
  if (res.code === 200) {
    orderInfo.value = res.data ? res.data.payInfo : {}
    jsApiCall()
  }
}
payObj.value.code = route.query.code
payObj.value.state = route.query.state
if (payObj.value.code) {
  // ElMessage({
  //   message: `${payObj.value.code} - ${payObj.value.state}`,
  //   type: 'success',
  //   duration: 6000
  // })
  getUserWxIfno()
} else {
  isWeixinOrAlipay()
}
const jsApiCall = () => {
  window.WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    {
      appId: orderInfo.value.appId,
      timeStamp: orderInfo.value.timeStamp,
      nonceStr: orderInfo.value.nonceStr,
      package: orderInfo.value.package,
      signType: orderInfo.value.signType,
      paySign: orderInfo.value.paySign
    },
    function (res: any) {
      window.WeixinJSBridge.log(res.err_msg)
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        alert('支付成功！')
        // ElMessage({
        //   message: res.msg,
        //   type: 'success'
        // })
      } else {
        //显示错误信息
        alert('支付失败！')
      }
    }
  )
}
</script>
<style lang="scss" scoped></style>
