<template>
  <div v-if="!openMembeTrue" class="user_info">
    <div class="user_info_left">
      <!-- 个人人信息 -->
      <div class="user_material">
        <div class="user_img">
          <img :src="userStore.userInfo.avatar" alt="头像" class="avatar_img" />
        </div>
        <div class="user_details user_name">
          <span class="name_revise">
            {{ userStore.userInfo.nickName }}
            <!-- <img src="@/assets/icons/text.svg" alt="" /> -->
          </span>
          <span>
            id: <em class="user_id">{{ userStore.userInfo.userId }}</em>
          </span>
          <span class="vip_box">
            身份：
            <em class="user_color">
              {{ userStore.userInfo.userType === 0 ? '普通用户' : '会员' }}
            </em>
            <em class="surplus" v-if="userStore.userInfo.userType === 1">
              有效期至{{ cutDate(userStore.userInfo.endTime) }}
            </em>
            <i @click="toMember">
              {{ userStore.userInfo.userType === 0 ? '开通会员' : '续费' }}
            </i>
          </span>
          <span>
            微信：
            <em class="user_color">
              {{ userStore.userInfo.bindWx === false ? '已绑定' : '未绑定' }}
            </em>
          </span>
        </div>
        <div class="user_details user_phone">
          <span class="phone"
            >手机号:
            <em class="user_color">
              {{
                userStore.userInfo.bindIphone === false ? '已绑定' : '未绑定'
              }}
            </em>
            <i v-if="userStore.userInfo.bindIphone" @click="handlePhoneBinding">
              去绑定
            </i>
          </span>
          <span>
            邮箱号:
            <em class="user_color">
              {{ userStore.userInfo.bindEmail === false ? '已绑定' : '未绑定' }}
            </em>
            <i v-if="userStore.userInfo.bindEmail" @click="handleEmBinding">
              去绑定
            </i>
          </span>
        </div>
        <div class="user_details user_pirce">
          <span class="user_available"
            >可用余额:
            <em class="pirce">￥{{ balance }}</em>
            <i class="user_up" @click="handleRecharge">充值</i></span
          >
        </div>
      </div>
      <!-- 个人人信息 -->
      <!-- 收藏资源信息 -->
      <div class="user_order">
        <div class="order_title">
          <h5>我的收藏</h5>
        </div>
        <div class="order_list">
          <el-scrollbar height="600px">
            <div class="platform">
              <div
                v-for="(item, index) in resourceData"
                :key="index"
                class="platform_list"
              >
                <div class="platform_avatar">
                  <img :src="item.picUrl" alt="头像" class="avatar_img" />
                  <img :src="item.resourceIcon" alt="" class="platform_img" />
                </div>
                <div class="platform_content">
                  <div class="platform_details">
                    <div class="platform_name">
                      <a
                        :href="item.resourceUrl"
                        target="_blank"
                        class="analyze_link_name"
                      >
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          :content="item.resourceName"
                          placement="top-start"
                        >
                          <span class="name_text">
                            {{ item.resourceName }}
                          </span>
                        </el-tooltip>
                        <svg-icon icon-class="external_link" class="external" />
                      </a>
                      <div class="platform_name_iocn">
                        <div
                          v-for="(platform, index) in item.platformsList"
                          :key="index"
                          class="iocn_right"
                        >
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="platform.name"
                            placement="top-start"
                          >
                            <span>
                              <img :src="platform.pic" alt="" />
                            </span>
                          </el-tooltip>
                        </div>
                        <div v-if="item.mediaTypeList" class="media_type">
                          <span
                            v-for="(type, index) in item.mediaTypeList"
                            :key="index"
                            v-show="index < 3"
                          >
                            {{ type.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div v-if="item.flowAnalysis" class="number number_analyze">
                      <a
                        :href="item.flowAnalysis"
                        target="_blank"
                        class="analyze_link"
                      >
                        <i class="iconfont icon-a-flow" />
                        <span>流量分析</span>
                      </a>
                    </div>
                    <div class="number_box" v-if="item.fan">
                      <div
                        v-if="item.promId === 7"
                        class="amateur"
                        :class="
                          item.mediaClassificationName === '素人'
                            ? ''
                            : 'influencer'
                        "
                      >
                        <svg-icon
                          :icon-class="
                            item.mediaClassificationName === '素人'
                              ? 'amateur'
                              : 'influencer'
                          "
                          class="influencer_icon"
                        />
                        <span>{{ item.mediaClassificationName }}</span>
                      </div>
                      <div class="number number_people">
                        <el-tooltip placement="top-start">
                          <i class="iconfont icon-a-fans" />
                          <template #content>
                            <div>
                              粉丝数量：{{ item.fan }} {{ item.fanUnit }}
                            </div>
                            <div v-if="item.averagePost">
                              日均发帖数：{{ item.averagePost }} 贴
                            </div>
                            <div v-if="item.communityCreateTime">
                              社群创建时间：{{ item.communityCreateTime }} 年
                            </div>
                          </template>
                        </el-tooltip>
                        <span>{{ item.fan }} {{ item.fanUnit }}</span>
                      </div>
                      <div
                        class="number number_people number_people1"
                        v-if="item.averageView"
                      >
                        <el-tooltip placement="top-start">
                          <i class="iconfont icon-mimakejian" />
                          <template #content>
                            <div>
                              平均观看量：{{ item.averageView }}
                              {{ item.viewUnit }}
                            </div>
                          </template>
                        </el-tooltip>
                        <span>{{ item.averageView }} {{ item.viewUnit }}</span>
                      </div>
                    </div>
                    <div
                      class="number number_popularity"
                      @click="handleCollect(item)"
                    >
                      <img
                        v-if="item.collect === 0"
                        src="@/assets/img/collect.png"
                        alt=""
                      />
                      <img
                        v-else
                        src="@/assets/img/collect-active.png"
                        alt=""
                      />
                    </div>
                    <div class="number number_more" @click="handleDrop(item)">
                      <span>
                        ￥
                        <em>{{ item.price }}</em>
                        起
                      </span>
                      <img
                        v-if="item.showhide"
                        src="@/assets/img/green-down.png"
                        alt=""
                      />
                      <img v-else src="@/assets/img/green.png" alt="" />
                    </div>
                  </div>
                  <div
                    v-show="item.showhide"
                    v-for="(itemchld, index) in item.mediumRankListVOList"
                    :key="index"
                    class="details_list"
                  >
                    <div class="list_text">
                      <div class="store_info">
                        <MediaInfo :itemchld="itemchld"></MediaInfo>
                        <!-- <span v-if="itemchld.sfId === 2" class="store_botton store_botton1">
                        自营
                        </span>
                        <span v-if="itemchld.sfId === 1" class="store_botton store_botton2">
                        自媒体
                        </span>
                        <span v-if="itemchld.sfId === 3" class="store_botton store_botton3">
                        服务商
                        </span> -->
                        <span class="adIdInfo_box" v-if="itemchld.adId">
                          {{ adIdInfo[itemchld.adId] }}
                          <em v-if="itemchld.adSize">:</em>
                          {{ itemchld.adSize }}
                        </span>
                        <div
                          v-for="(
                            chldPlatform, index
                          ) in itemchld.platformsList"
                          :key="index"
                          class="details_iocn_right"
                        >
                          <el-tooltip
                            class="box-item"
                            effect="dark"
                            :content="chldPlatform.name"
                            placement="top-start"
                          >
                            <span>
                              <img :src="chldPlatform.pic" alt="" />
                            </span>
                          </el-tooltip>
                        </div>
                      </div>
                      <div class="store_text">
                        <p>{{ itemchld.resourceDes }}</p>
                      </div>
                      <div v-if="itemchld.pasteRate" class="store_renew">
                        <span>上贴率{{ itemchld.pasteRate }} %</span>
                        <span v-if="itemchld.avgSpeedPosting">
                          平均发帖速度:
                          {{ itemchld.avgSpeedPosting }} 小时
                        </span>
                        <span v-if="itemchld.avgSpeedOrderReceived">
                          平均接单速度:
                          {{ itemchld.avgSpeedOrderReceived }} 小时
                        </span>
                      </div>
                      <div class="store_member">
                        <span class="member_price"
                          >会员价：<em>￥{{ itemchld.memberPrice }}</em></span
                        >
                        <span class="original_price"
                          >原价：<em>￥{{ itemchld.price }}</em></span
                        >
                      </div>
                    </div>
                    <div class="list_right" @click="handleLink">
                      <span class="uesr_one">
                        <img src="@/assets/img/shopping.png" alt="" />
                        立即下单
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <!-- 收藏资源信息 -->
    </div>
    <div class="user_info_right">
      <div class="announcement">
        <h5>公告栏</h5>
      </div>
      <div class="announcement_list">
        <div
          v-for="(bulletin, index) in bulletinData"
          :key="index"
          class="list"
        >
          <span class="list_text">
            {{ bulletin.content }}
          </span>
          <span class="list_date">{{ bulletin.createTime }}</span>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="reviseDialogVisible"
      :title="reviseTitle"
      @close="resetClose"
      :close-on-click-modal="false"
      width="389"
    >
      <div class="revise_body">
        <el-form
          ref="registerRef"
          :model="phoneForm"
          :rules="phoneRules"
          class="phone-name"
        >
          <el-form-item v-if="reviseTitle === '绑定手机号'" prop="username">
            <el-input v-model="phoneForm.username" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item v-if="reviseTitle === '绑定邮箱号'" prop="email">
            <el-input v-model="phoneForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="phoneForm.code"
              placeholder="请输入验证码"
              style="width: 60%"
            />
            <span v-if="!sms.disabled" class="phone-code" @click="send"
              >获取验证玛</span
            >
            <span v-else class="phone-code">{{ sms.count }}s后可再次获取</span>
          </el-form-item>
          <el-form-item
            v-if="userStore.userInfo.setPassWord"
            prop="password"
            class="login-password"
          >
            <el-input
              v-model="phoneForm.password"
              type="password"
              placeholder="请设置登录密码（6-18数字+字母）"
            />
          </el-form-item>
          <el-form-item
            v-if="userStore.userInfo.setPassWord"
            prop="confirmPassword"
            class="login-password"
          >
            <el-input
              v-model="phoneForm.confirmPassword"
              type="password"
              placeholder="请确认密码"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="dialog-footer-confirm"
            @click="submitForm(registerRef)"
            >确定</el-button
          >
          <el-button class="dialog-footer-close" @click="resetForm(registerRef)"
            >取消</el-button
          >
        </span>
      </template>
    </el-dialog>
    <Recharge ref="childComp" @returnUserInfo="getWalletRuery"></Recharge>
  </div>
  <div v-if="openMembeTrue">
    <OpenMember @handleReturn="toMember"></OpenMember>
  </div>
</template>
<script lang="ts" setup>
import { adIdInfo } from '@/enums'
import OpenMember from './openMember.vue'
import Recharge from '@/components/recharge/index.vue'
import { collectAdd, collectDelete } from '@/api/index'
import type { collectPageObj, bindTerRes } from '@/types/personal'
import { phoneCode, emCode } from '@/api/user'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores'
import {
  bulletinBoard,
  walletRuery,
  collectList,
  bindRegister,
  bindEmailRegister
} from '@/api/personal'
const userStore = useUserStore()
const openMembeTrue = ref(false)
const router = useRouter()
const reviseDialogVisible = ref(false)
const reviseTitle = ref('')
const registerRef = ref<any>()
const childComp = ref<any>()
const resourceData = ref<any>()
const bulletinData = ref<any>()
const balance = ref<any>()
const sms = reactive({
  disabled: false,
  total: 60,
  count: 0
})
// 收藏信息
const collectPage = reactive<collectPageObj>({
  collect: '1',
  current: 1,
  pageSize: 6,
  userId: userStore.userInfo?.userId
})
const phoneForm = reactive<bindTerRes>({
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
  code: '',
  type: 0,
  userId: userStore.userInfo?.userId
})
const phoneRules = {
  username: [
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    { required: true, validator: phoneValidator, trigger: 'blur' }
  ],
  email: [
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    { required: true, validator: phoneValidator, trigger: 'blur' }
  ],
  code: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    { required: true, validator: passwordValidator, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '请再次输入您的密码' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ]
}
// 校验手机号
function phoneValidator(rule: any, value: any, callback: any) {
  if (reviseTitle.value === '绑定手机号') {
    if (phoneForm.username === undefined) {
      callback()
    } else if (phoneForm.username === '') {
      callback(new Error('请输入手机号码'))
    } else if (
      !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(value)
    ) {
      callback(new Error('请输入正确格式的手机号码'))
    } else {
      callback()
    }
  } else {
    if (phoneForm.email === undefined) {
      callback()
    } else if (phoneForm.email === '') {
      callback(new Error('请输入邮箱号'))
    } else if (
      !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(
        phoneForm.email
      )
    ) {
      callback(new Error('请输入正确格式的邮箱地址'))
    } else {
      callback()
    }
  }
}
// 校验密码
function passwordValidator(rule: any, value: any, callback: any) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/
  if (!passwordRegex.test(value)) {
    callback(new Error('请设置密码（6-18位  数字+字母'))
  } else {
    callback()
  }
}
// 确认密码
function equalToPassword(rule: any, value: any, callback: any) {
  if (phoneForm.password !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
// 计时器处理器
const timerHandler = () => {
  sms.count = sms.total
  sms.disabled = true
  let timer = setInterval(() => {
    if (sms.count > 1 && sms.count <= sms.total) {
      sms.count--
    } else {
      sms.disabled = false
      clearInterval(timer)
    }
  }, 1000)
}
// 发送验证码
const send = async () => {
  if (reviseTitle.value === '绑定手机号') {
    if (
      phoneForm.username === undefined ||
      !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
        phoneForm.username
      )
    ) {
      ElMessage.error('手机号不能为空!')
      return
    }
  } else {
    if (
      phoneForm.email === undefined ||
      !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(
        phoneForm.email
      )
    ) {
      ElMessage.error('邮箱地址不能为空!')
      return
    }
  }
  timerHandler()
  const res =
    reviseTitle.value === '绑定手机号'
      ? await phoneCode(phoneForm.username)
      : await emCode(phoneForm.email)
  if (res.code === 200) {
    ElMessage({
      message: '发送验证码成功, 请注意查收',
      type: 'success'
    })
  }
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
// 跳转下单
const handleLink = () => {
  router.push({ path: '/placeOrder' })
}
// 充值
const handleRecharge = () => {
  childComp.value.handleRecharge()
}
// 去绑定手机号
const handlePhoneBinding = () => {
  reviseDialogVisible.value = true
  reviseTitle.value = '绑定手机号'
}
// 去绑定邮箱
const handleEmBinding = () => {
  reviseDialogVisible.value = true
  reviseTitle.value = '绑定邮箱号'
}
// 关闭修改密码框
const resetClose = () => {
  registerRef.value?.resetFields()
}
// 取消
const resetForm = (formEl: any) => {
  if (!formEl) return
  formEl.resetFields()
  reviseDialogVisible.value = false
}
const cutDate = (val: any) => {
  return val.substring(0, 10)
}
// 保存
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res =
        reviseTitle.value === '绑定手机号'
          ? await bindRegister(phoneForm)
          : await bindEmailRegister(phoneForm)
      if (res.code === 200) {
        reviseDialogVisible.value = false
        formEl.resetFields()
        userStore.setUserInfo()
      }
    }
  })
}
//  回到个人信息页
const toMember = () => {
  openMembeTrue.value = !openMembeTrue.value
  getWalletRuery()
}
// 删除收藏
const handleCollect = async (item: any) => {
  const resourceUrl = {
    resourceUrl: item.resourceUrl
  }
  if (userStore.loginInfo) {
    const res = await collectDelete(resourceUrl)
    if (res.code === 200) {
      getUserListPage()
    }
  }
}
// 查看更多
const handleDrop = (item: any) => {
  item.showhide = !item.showhide
}
// 获取收藏资源
const getUserListPage = async () => {
  const id = {
    userId: userStore.userInfo?.userId
  }
  const res = await collectList(id)
  resourceData.value = res.data?.mediumRankListVOS
  for (const item of resourceData.value) {
    item.showhide = false
  }
}
const getbulletinBoard = async () => {
  const res = await bulletinBoard()
  bulletinData.value = res?.data
}
userStore.setUserInfo()
getWalletRuery()
getbulletinBoard()
getUserListPage()
</script>
<style lang="scss" scoped>
.user_info {
  width: 100%;
  display: flex;
  .user_info_left {
    width: 904px;
    background: #ffffff;
    border-radius: 0px 4px 4px 0px;
    border-left: 1px solid #ededed;
    padding: 24px;

    .user_material {
      width: 856px;
      height: 197px;
      padding: 32px;
      padding-right: 20px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #dcdee0;
      display: flex;
      font-size: 14px;

      .user_img {
        img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }
      }

      .user_name {
        margin-left: 24px;
        width: 300px;

        .user_id {
          margin-left: 37px;
          color: #111;
        }

        .name_revise {
          font-size: 18px;
          font-weight: bold;
          margin: 5px 0 10px 0;
          display: flex;
          align-items: center;

          img {
            width: 16px;
          }
        }
      }

      .user_color {
        color: #111;
      }

      .vip_box {
        width: 300px;
        .surplus {
          color: #098d72;
          margin-left: 2px;
        }
      }

      .user_phone {
        width: 167px;

        .phone {
          margin-top: 38px;
        }
      }

      .user_pirce {
        .user_available {
          margin-top: 38px;
        }

        .pirce {
          color: #f3294d;
          font-weight: 600;
        }

        .user_up {
          display: inline-block;
          width: 48px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          font-size: 14px;
          color: #fff;
          background-color: #098d72;
          border-radius: 4px;
        }
      }

      .user_details {
        span {
          display: block;
          color: #555;
          margin-top: 8px;
        }

        em {
          margin-left: 16px;
        }

        i {
          color: #098d72;
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }

    .user_order {
      margin-top: 24px;
      width: 856px;
      height: 654px;
      padding-bottom: 20px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #dcdee0;

      .order_title {
        padding: 0 16px;
        height: 40px;
        color: #111;
        font-size: 14px;
        line-height: 40px;
        border-bottom: 1px solid #dcdee0;
        h5 {
          font-weight: bold;
        }
      }

      .order_list {
        padding: 0 12px;
        .platform {
          padding-bottom: 20px;
          .platform_list {
            display: flex;
            border-bottom: 1px solid #ebedf0;

            .platform_avatar {
              position: relative;

              .avatar_img {
                margin-top: 11px;
                width: 50px;
                height: 50px;
                border-radius: 28px;
              }

              .platform_img {
                position: absolute;
                width: 16px;
                top: 46px;
                left: 36px;
              }
            }

            .platform_content {
              margin-left: 24px;

              .platform_details {
                display: flex;

                .platform_name {
                  .name_text {
                    display: inline-block;
                    margin-top: 13px;
                    max-width: 352px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    color: #111;
                    font-weight: bold;
                  }
                  .external {
                    margin-left: 3px;
                  }
                }
                .platform_name_iocn {
                  display: flex;
                  width: 372px;
                  margin: 3px 0;
                  .iocn_right {
                    margin-right: 10px;
                  }
                  img {
                    margin-top: 3px;
                    width: 16px;
                  }
                  .media_type {
                    display: inline-block;
                    span {
                      padding: 0 3px;
                      color: #f6a61f;
                      font-size: 12px;
                      border: 1px solid #f6a61f;
                      border-radius: 3px;
                      margin-right: 10px;
                    }
                  }
                }
                .number_box {
                  width: 145px;
                  display: inline-block;
                  margin: auto;
                  margin-left: 70px;
                  font-size: 14px;
                  .number_people {
                    margin-left: 5px;
                    color: #555555;
                    width: 145px;

                    .iconfont {
                      margin-right: 5px;
                    }
                  }
                  .amateur {
                    margin-bottom: 8px;
                    margin-left: 5px;
                    display: flex;
                    align-items: center;
                    span {
                      margin-left: 5px;
                    }
                  }
                  .influencer {
                    color: #4467df;
                  }
                  .number_people1 {
                    margin-top: 6px;
                  }
                }

                .number_popularity {
                  margin-left: 5px;
                  color: #555555;
                  img {
                    width: 16px;
                    margin-right: 3px;
                  }
                }
                .number_analyze {
                  margin-left: 70px;
                  width: 145px;
                  .iconfont {
                    margin-left: 3px;
                  }
                  .analyze_link {
                    display: flex;
                    align-items: center;
                    width: 88px;
                    height: 24px;
                    background: #ffffff;
                    border-radius: 4px 4px 4px 4px;
                    color: #098d72;
                    border: 1px solid #b7d3cd;
                    span {
                      margin-left: 5px;
                      font-size: 14px;
                    }
                  }
                  img {
                    width: 16px;
                  }
                }
                .number_more {
                  margin-left: 5px;
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  width: 135px;
                  span {
                    display: flex;
                    align-items: center;
                    color: #098d72;
                    em {
                      font-weight: bold;
                      font-size: 16px;
                    }
                  }

                  img {
                    width: 20px;
                  }
                }

                .number {
                  display: flex;
                  align-items: center;
                  color: #555555;
                }
              }

              .details_list {
                width: 100%;
                background-color: #f8f8fa;
                margin-bottom: 8px;
                padding: 16px;
                display: flex;
                .list_text {
                  width: 528px;
                }

                .store_info {
                  display: flex;
                  align-items: center;
                  .info_url {
                    width: 16px;
                    height: 16px;
                    margin: 9px 0 0 24px;
                  }

                  .store_botton {
                    padding: 2px 5px;
                    height: 22px;
                    text-align: center;
                    border-radius: 4px;
                    margin-top: 5px;
                    font-size: 12px;
                  }
                  .store_botton1 {
                    color: #098d72;
                    border: 1px solid #026853;
                  }
                  .store_botton2 {
                    color: #ef6706;
                    border: 1px solid #ef6706;
                  }
                  .store_botton3 {
                    color: #0e79f5;
                    border: 1px solid #0e79f5;
                  }
                  .adIdInfo_box {
                    height: 18px;
                    font-size: 12px;
                    color: #f25f32;
                    padding: 3px 8px;
                    margin-top: 10px;
                    margin-left: 10px;
                    line-height: 12px;
                    border-radius: 2px;
                    display: inline-block;
                    border: 1px solid #f25f32;
                    background-color: #f6e2d3;
                  }
                  .details_iocn_right {
                    display: flex;
                    align-items: center;
                    margin-top: 5px;
                    span {
                      img {
                        width: 16px;
                        margin-left: 10px;
                      }
                    }
                  }
                  .details_type {
                    padding: 0 10px;
                    border-radius: 3px;
                    height: 22px;
                    line-height: 22px;
                    margin-left: 10px;
                    border: 1px solid #026853;
                    color: #026853;
                    font-size: 12px;
                  }
                }

                .store_text {
                  margin-top: 12px;

                  p {
                    color: #555;
                    font-size: 14px;
                  }
                }

                .store_renew {
                  margin-top: 16px;

                  span {
                    height: 22px;
                    text-align: center;
                    line-height: 22px;
                    padding: 4px 12px;
                    background: rgba(2, 104, 83, 0.05);
                    border-radius: 4px;
                    border: 1px solid #098d72;
                    color: #098d72;
                    margin-right: 8px;
                    font-size: 12px;
                  }
                }

                .store_member {
                  display: flex;
                  font-size: 12px;
                  margin-top: 8px;

                  .member_price {
                    padding: 0 10px;
                    height: 22px;
                    line-height: 22px;
                    background: #f3294d;
                    border-radius: 4px;
                    text-align: center;
                    margin-right: 8px;
                    color: #fff;

                    em {
                      font-weight: bold;
                    }
                  }

                  .original_price {
                    padding: 0 15px;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    background: #ffffff;
                    border-radius: 4px 4px 4px 4px;
                    border: 1px solid #dcdee0;
                    color: #555;

                    em {
                      font-weight: bold;
                    }
                  }
                }

                .list_right {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-left: 30px;

                  span {
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
                }
              }
            }
          }
          .platform_list:hover {
            // margin-left: 3px;
            z-index: 1;
            .platform_name {
              .name_text {
                color: #098d72 !important;
              }
              .external {
                color: #098d72;
              }
            }
          }
        }
      }
    }
  }

  .user_info_right {
    margin-left: 16px;
    width: 308px;
    // height: 924px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;

    .announcement {
      padding: 0 16px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dcdee0;
      font-size: 14px;
      color: #111;

      h5 {
        font-weight: 600;
      }
    }

    .announcement_list {
      margin: 0 16px;

      .list {
        padding: 24px 0;
        border-bottom: 1px solid #dcdee0;

        .list_text {
          color: #111;
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          display: block;
        }

        .list_date {
          display: block;
          margin-top: 12px;
          color: #555;
        }
      }
    }
  }

  .revise_body {
    .phone-code {
      margin-left: 1%;
      display: block;
      width: 39%;
      text-align: center;
      font-size: 12px;
      background-color: #098d72;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
    }
  }

  .dialog-footer {
    .dialog-footer-confirm {
      width: 64px;
      height: 32px;
      background: #098d72;
      border-radius: 4px 4px 4px 4px;
      color: #fff;
    }

    .dialog-footer-close {
      width: 64px;
      height: 32px;
      background: #ffffff;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #098d72;
      color: #098d72;
    }
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #098d72;
  }
}
:deep(.el-scrollbar__thumb) {
  background-color: #098d72;
}
</style>
