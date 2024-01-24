<template>
  <div class="personal_center">
    <Header></Header>
    <div class="personal_main">
      <NationDate></NationDate>
      <div class="main_content">
        <div class="personal_nav">
          <div class="menu_resource">
            <el-menu
              class="el-menu-vertical-demo"
              @select="handleLink"
              :default-active="number"
            >
              <el-menu-item index="1">
                <i class="iconfont icon-Frame" />
                &nbsp;
                <span>用户信息</span>
              </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <i class="iconfont icon-a-orderForm" />
                  &nbsp;
                  <span>订单中心</span>
                </template>
                <el-menu-item index="2-1">
                  <span>图文订单</span>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <span>寄样订单</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item index="3">
                <i class="iconfont icon-a-user" />
                &nbsp;
                <span>账户中心</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="iconfont icon-a-service" />
                &nbsp;
                <span>联系客服</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="iconfont icon-a-feedback" />
                &nbsp;
                <span>反馈</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="iconfont icon-a-safety" />
                &nbsp;
                <span>账号安全</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div v-if="number === '1'" class="personal_Details">
          <UserInfo></UserInfo>
        </div>
        <div v-if="number === '2-1' || '2-2'">
          <ImgTextOrder v-if="number === '2-1'"></ImgTextOrder>
          <SendSampleOrder v-if="number === '2-2'"></SendSampleOrder>
        </div>
        <div v-if="number === '3'">
          <AccountCenter></AccountCenter>
        </div>
        <div v-if="number === '4'">
          <CustomerSer></CustomerSer>
        </div>
        <div v-if="number === '5'">
          <Feedback></Feedback>
        </div>
        <div v-if="number === '6'">
          <AccountSafety></AccountSafety>
        </div>
      </div>
    </div>
    <YwFloat v-if="route.path !== '/'" />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header/index.vue'
import UserInfo from './components/userInfo.vue'
import ImgTextOrder from './components/imgTextOrder.vue'
import SendSampleOrder from './components/sendSampleOrder.vue'
import AccountCenter from './components/accountCenter.vue'
import CustomerSer from './components/customerSer.vue'
import Feedback from './components/feedback.vue'
import AccountSafety from './components/accountSafety.vue'
const route = useRoute()
const number = ref<any>('1')
const handleLink = (key: any) => {
  number.value = key
  console.log(number.value)
}
if (history.state.orderNum) {
  number.value = history.state.orderNum
  console.log(number.value)
}
</script>
<style lang="scss" scoped>
.personal_center {
  width: 100%;
  height: auto;
  background: #f8f8f8;

  .personal_main {
    width: 1400px;
    margin-left: auto;
    margin-right: auto;

    .main_herder {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        display: flex;
        align-items: center;
      }

      img {
        width: 18px;
        margin-right: 8px;
      }
    }
  }

  .main_content {
    display: flex;
    margin-top: 12px;
    .menu_resource {
      width: 172px;
      height: 924px;
      border-radius: 4px;
      background: #ffffff;

      .menu_resource_title {
        padding: 11px 16px 10px 16px;
        font-weight: 600;
        color: #111111;
        font-size: 14px;
        border-bottom: 1px solid #ebedf0;
      }

      .el-sub-menu__isctive {
        color: #098d72 !important;
        font-weight: bold !important;
      }

      .el-menu-vertical-demo {
        font-size: 14px !important;
        color: #111111 !important;

        img {
          width: 18px;
          margin-right: 8px;
          color: #fff;
        }

        .el-menu-item.is-active {
          background: #098d72;
          color: #fff;
          font-size: 14px;
        }
      }
    }

    .personal_Details {
      // height: 924px;
    }
  }
}

:deep(.el-menu) {
  border-right: 0;
}
</style>
