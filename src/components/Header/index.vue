<template>
  <div>
    <el-affix :offset="0">
      <div class="container-herder">
        <div class="herder-nav">
          <div class="herder-nav-img" @click="ToHome">
            <img alt="logo" src="@/assets/img/logo.png"/>
          </div>
          <div class="herder-position">
            <ul class="herder-list">
              <li
                  :class="[num === 3 ? 'list-active' : '']"
                  class="marketing pointer"
                  @click="handleIndex"
              >
                首页
              </li>
              <li
                  :class="[num === 1 ? 'list-active' : '']"
                  class="marketing pointer"
                  @click="handleIndexYw"
              >
                <i class="iconfont icon-a-marketing"/>
                &nbsp; 营销资源
              </li>
              <li
                  :class="[num === 2 ? 'list-active' : '']"
                  class="pointer"
                  @click="handleServer"
              >
                <i class="iconfont icon-a-customization"/>
                &nbsp; 定制服务
              </li>
            </ul>
            <span v-if="!userStore.userInfo" class="login" @click="handleLogin">
              登录
            </span>
            <div v-if="userStore.userInfo" class="uesr pointer">
              <span class="uesr_one xjahb10" @click="handleOrder">
                <i class="iconfont icon-shopping"/>
                &nbsp; 我要下单
              </span>
              <!-- <span class="uesr_personal" @click="handlePersonal">
                个人中心
              </span> -->
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link xjahb1">
                  <img :src="userStore.userInfo.avatar" alt="头像"/>
                </span>
                <template #dropdown>
                  <el-dropdown-menu class="dropdown_menu_list">
                    <el-dropdown-item class="menu_list" command="userInfo">
                      <i class="iconfont icon-Frame"/>
                      用户信息
                    </el-dropdown-item>
                    <el-dropdown-item
                        class="menu_list"
                        command="orderCenter"
                        divided
                    >
                      <i class="iconfont icon-a-orderForm"/>
                      订单中心
                    </el-dropdown-item>
                    <el-dropdown-item
                        class="menu_list"
                        command="accountCenter"
                        divided
                    >
                      <i class="iconfont icon-a-user"/>
                      账号中心
                    </el-dropdown-item>
                    <el-dropdown-item
                        class="menu_list"
                        command="customerSer"
                        divided
                    >
                      <i class="iconfont icon-a-service"/>
                      联系客服
                    </el-dropdown-item>
                    <el-dropdown-item
                        class="menu_list"
                        command="feedback"
                        divided
                    >
                      <i class="iconfont icon-a-feedback"/>
                      反馈
                    </el-dropdown-item>
                    <el-dropdown-item
                        class="menu_list"
                        command="accountSafety"
                        divided
                    >
                      <i class="iconfont icon-a-safety"/>
                      账号安全
                    </el-dropdown-item>
                    <el-dropdown-item
                        class="menu_list"
                        command="logout"
                        divided
                    >
                      <i class="iconfont icon-a-exit"/>
                      退出登陆
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </el-affix>
    <!-- 登陆注册弹框 -->
    <el-dialog
        v-model="dialogFormVisible"
        :close-on-click-modal="false"
        width="620"
        @close="handelCloseDialog"
    >
      <div v-if="isChange" class="dialog-mian">
        <div class="dialog-content">
          <div class="login_left">
            <div class="login_left_title">
              <span>微信登录</span>
            </div>
            <div class="login_left_vx">
              <div id="qrcode" class="vx_img">
                <qrcode-vue :size="140" :value="wxLoginInfo?.url" level="H"/>
                <!-- <div ref="qrCodeUrl"></div> -->
              </div>
              <span class="vx-refresh" @click="handleRefresh">
                使用微信扫一扫登录
                <em>刷新</em>
              </span>
            </div>
          </div>
          <div class="login_right">
            <div v-show="showLogin" class="login">
              <Login
                  ref="childComp"
                  @closeDlg="handelCloseDlg"
                  @handelGoRegister="goRegister"
                  @handleForget="handleForgetPass"
              ></Login>
            </div>
            <div v-show="showRegister" class="register">
              <ul>
                <li
                    :class="{ active: showPhone }"
                    class="register-phone"
                    @click="handleChange(1)"
                >
                  手机号注册
                </li>
                <li
                    :class="{ active: showEm }"
                    class="register-em"
                    @click="handleChange(2)"
                >
                  邮箱注册
                </li>
              </ul>
              <PhoneRegister
                  v-show="showPhone"
                  @handelGoLogin="goLogin"
              ></PhoneRegister>
              <EmRegister v-show="showEm" @handelGoLogin="goLogin"></EmRegister>
            </div>
          </div>
        </div>
        <div class="dialog_footer">
          <span>
            注册登录代表即已经同意阅读
            {{ protocol.left }}<em @click="userAgreement">用户协议</em>
            {{ protocol.right }}和{{
              protocol.left
            }}<em @click="privacyPolicy">隐私政策</em>{{ protocol.right }}
          </span>
        </div>
      </div>
      <div v-if="!isChange">
        <retrievePass @goLogin1="handelgGoLogin1"></retrievePass>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
// import QRCode from 'qrcodejs2'
import QrcodeVue from 'qrcode.vue'
import {useUserStore} from '@/stores'
import Login from './components/login.vue'
import {getQrCodeAPI} from '@/api/user'
import EmRegister from './components/emRegister.vue'
import PhoneRegister from './components/phoneRegister.vue'
import retrievePass from './components/retrievePass.vue'
import {ElMessage, ElMessageBox} from 'element-plus'
//接收父組件傳過來的值
const props = defineProps({
  num: {
    type: Number
  }
})
const router = useRouter()
const userStore = useUserStore()
// const avatar = userStore.userInfo?.avatar
// console.log(userStore)
// const props = defineProps({
//   userMsg: {
//     type: Object,
//     default: {}
//   }
// })
const showEm = ref(false)
const showLogin = ref(true)
const showPhone = ref(true)
const isNum = ref<number>(1)
const childComp = ref<any>()
const wxLoginInfo = ref<any>()
const showRegister = ref(false)
const isChange = ref<boolean>(true)
const dialogFormVisible = ref(false)
const protocol = reactive({
  left: '{{',
  right: '}}'
})
const state = reactive({
  timerHandler: NaN
})

// 头像选项
function handleCommand(command: any) {
  switch (command) {
    case 'userInfo':
      router.push({name: 'PersonalCen', state: {orderNum: '1'}})
      break
    case 'orderCenter':
      router.push({name: 'PersonalCen', state: {orderNum: '2-1'}})
      break
    case 'accountCenter':
      router.push({name: 'PersonalCen', state: {orderNum: '3'}})
      break
    case 'customerSer':
      router.push({name: 'PersonalCen', state: {orderNum: '4'}})
      break
    case 'feedback':
      router.push({name: 'PersonalCen', state: {orderNum: '5'}})
      break
    case 'accountSafety':
      router.push({name: 'PersonalCen', state: {orderNum: '6'}})
      break
    case 'logout':
      logout()
      break
    default:
      break
  }
}

//  跳转下单页面
const handleOrder = () => {
  if (userStore.userInfo) {
    router.push({path: '/placeOrder'})
    // isNum.value = 2
  }
}
//  跳转定制服务
const handleServer = () => {
  router.push({path: '/customizedSer'})
  isNum.value = 2
}
//  资源
const handleIndexYw = () => {
  router.push({path: '/'})
  isNum.value = 1
}

//  首页
const handleIndex = () => {
  router.push({path: '/display'})
  isNum.value = 3
}
const ToHome = () => (location.href = '/')

// 退出登陆
const logout = () => {
  ElMessageBox.confirm('确定退出登录吗？', '提示')
      .then(() => {
        ElMessage.success('退出登录成功')
        window.localStorage.clear()
        location.href = '/'
      })
      .catch(() => {
      })
}
const setWxerwma = async () => {
  const res = await getQrCodeAPI({type: 0})
  wxLoginInfo.value = res.data
  clearInterval(state.timerHandler)
  state.timerHandler = setInterval(() => {
    YW()
  }, 1000)
}
const YW = () => {
  userStore.wxLogin({code: wxLoginInfo.value.code}).then(async () => {
    if (userStore.loginInfo.access_token) {
      await userStore.setUserInfo()
      clearInterval(state.timerHandler)
      handelCloseDlg()
    }
  })
}
// 清空表单
const handelCloseDialog = () => {
  clearInterval(state.timerHandler)
  childComp.value.resetFieldsFrom()
}
// 打开登陆
const handleLogin = () => {
  dialogFormVisible.value = true
  setWxerwma()
}
// 关闭登陆
const handelCloseDlg = () => {
  dialogFormVisible.value = false
  // /  userAvatar()
}
// 去注册
const goRegister = () => {
  handleChange(1)
  showRegister.value = true
  showLogin.value = false
}
// 去登录
const goLogin = () => {
  showRegister.value = false
  showLogin.value = true
}
// 切换注册方式
const handleChange = (number: any) => {
  if (number === 1) {
    showPhone.value = true
    showEm.value = false
  } else {
    showPhone.value = false
    showEm.value = true
  }
}
// 忘记密码回到登陆页
const handelgGoLogin1 = () => {
  isChange.value = true
}
const handleForgetPass = () => {
  isChange.value = false
}
// 刷新
const handleRefresh = () => {
  setWxerwma()
}
//跳转用户协议
const userAgreement = () => {
  location.href = '/user/agreement'
}
//跳转隐私协议
const privacyPolicy = () => {
  location.href = '/user/privacy'
}
//
defineExpose({
  handleLogin
})
</script>
<style lang="scss" scoped>
.container-herder {
  padding: 0px 20px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 18px;
  margin-bottom: 14px;

  .herder-nav {
    display: flex;
    width: 100%;
    height: 60px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: space-between;

    .herder-nav-img {
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 61px;
        height: 48px;
      }
    }

    .herder-position {
      display: flex;
      align-items: center;

      .herder-list {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;

        .active {
          color: #098d72;
        }

        li {
          height: 100%;
          font-weight: 400;
          color: #111111;
          display: flex;
          align-items: center;

          img {
            width: 16px;
            margin-right: 3px;
          }
        }

        .marketing {
          margin-right: 35px;
        }

        .list-active {
          font-weight: bold;
          color: #098d72;
        }
      }

      .login {
        display: inline-block;
        margin-left: 50px;
        width: 80px;
        height: 32px;
        line-height: 32px;
        background: #098d72;
        text-align: center;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
      }

      .uesr {
        margin-left: 34px;
        display: flex;
        align-items: center;

        .uesr_one {
          width: 110px;
          height: 32px;
          line-height: 32px;
          background: #098d72;
          text-align: center;
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 16px;
            margin-right: 3px;
          }
        }

        .uesr_personal {
          margin-left: 32px;
          font-size: 14px;
          color: #111111;
          display: flex;
          align-items: center;
          cursor: pointer;

          img {
            width: 16px;
            margin-right: 3px;
          }
        }

        .el-dropdown-link {
          margin-left: 34px;
          margin-top: 3px;
        }

        img {
          width: 40px;
          border-radius: 28px;
        }
      }
    }
  }
}

.dialog-mian {
  .dialog-content {
    display: flex;

    .login_left {
      width: 233px;

      .login_left_title {
        margin-left: 11px;

        span {
          font-size: 18px;
          color: #212121;
          font-weight: 400;
        }
      }

      .login_left_vx {
        margin-top: 50px;

        .vx_img {
          width: 142px;
          height: 152px;
          display: block;
          margin-left: 40px;
        }

        .vx-refresh {
          display: block;
          margin-top: 37px;
          font-size: 14px;
          color: #4a4a4a;
          font-weight: 400;
          text-align: center;

          em {
            margin-left: 5px;
            color: #098d72;
            cursor: pointer;
          }
        }
      }
    }

    .login_right {
      width: 334px;
      border-left: 1px solid #7d7d7d;

      .login {
        width: 100%;
        display: inline-block;
        padding: 0 33px 0 46px;
      }

      .register {
        width: 100%;
        padding: 0 33px 0 46px;

        ul {
          display: flex;

          li {
            font-size: 14px;
            color: #333;
            height: 30px;
            line-height: 30px;
          }

          .register-em {
            margin-left: 30%;
          }

          .active {
            color: #098d72;
          }
        }
      }
    }
  }

  .dialog_footer {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: #333;

    em {
      margin: 0 2px;
      color: #098d72;
      cursor: pointer;
    }
  }
}

.dropdown_menu_list {
  width: 130px;

  img {
    width: 16px;
    margin-right: 3px;
  }
}
</style>
