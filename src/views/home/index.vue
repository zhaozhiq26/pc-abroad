<template>
  <div class="app-home">
    <Header ref="childLink" :num="1"></Header>
    <div class="main">
      <NationDate></NationDate>
      <div class="main_news">
        <div class="menu_resource">
          <h5 class="menu_resource_title">国家地区</h5>
          <el-scrollbar height="883px">
            <el-menu
                :default-openeds="openeds"
                :unique-opened="true"
                class="el-menu-vertical-demo xjahb2"
                default-active="1-1"
            >
              <template v-for="(v, index) in nationArray" :key="v.id">
                <el-sub-menu
                    v-if="v.children"
                    :index="index + ''"
                    @click="handleMeun(v)"
                >
                  <template #title>
                    <img :src="v.pic" alt=""/>
                    {{ v.name }}
                  </template>
                  <el-scrollbar
                      class="table_device"
                      max-height="300px"
                      @click.stop
                  >
                    <el-menu-item
                        v-for="(vitem, vIndex) in v.children"
                        :key="vitem.id"
                        :index="`${vIndex} - ${vitem.id}`"
                        @click="handleMeunItem($event, vitem)"
                    >
                      <template #title>
                        <img :src="vitem.pic" alt=""/>
                        {{ vitem.name }}
                      </template>
                    </el-menu-item>
                  </el-scrollbar>
                </el-sub-menu>
                <el-menu-item v-else :index="index + ''" @click="handleMeun(v)">
                  <template #title>
                    <img :src="v.pic" alt=""/>
                    {{ v.name }}
                  </template>
                </el-menu-item>
              </template>
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="news_centent">
          <div class="news_centent_nav">
            <div class="nav_marketing xjahb3">
              <span>营销分类</span>
              <ul>
                <li
                    :class="[frontPage.sellId === null ? 'catese_active' : '']"
                    class="pointer"
                    @click="handelCatese(null)"
                >
                  全部
                </li>
                <li
                    v-for="catese in frontAll.sysCateStTree"
                    :key="catese.id"
                    :class="[
                    frontPage.sellId === catese.id ? 'catese_active' : ''
                  ]"
                    class="pointer"
                    @click="handelCatese(catese.id)"
                >
                  <img :src="catese.pic" alt=""/>{{ catese.name }}
                </li>
              </ul>
            </div>
            <div class="nav_shopping xjahb4">
              <span>购物平台</span>
              <ul :class="[checkCountry ? 'nav_shopping_check' : '']">
                <li
                    :class="[frontPage.platforms === '' ? 'country_active' : '']"
                    class="pointer"
                    @click="handelCountry('')"
                >
                  全部
                </li>
                <li
                    v-for="country in frontAll.platform"
                    :key="country.id"
                    :class="[
                    frontPage.platforms === country.id ? 'country_active' : ''
                  ]"
                    class="pointer"
                    @click="handelCountry(country.id)"
                >
                  <img :src="country.pic" alt=""/> {{ country.name }}
                </li>
              </ul>
              <em v-if="checkCountry" class="pointer" @click="handleChange">
                更多 <img alt="" src="@/assets/img/icon-left.png"/>
              </em>
              <em v-else class="pointer" @click="handleChange">
                收起 <img alt="" src="@/assets/img/up.png"/>
              </em>
            </div>
            <div v-if="frontPage.sellId === 7" class="nav_shopping">
              <span>产品类目</span>
              <ul :class="[checkCategory ? 'nav_shopping_check' : '']">
                <li
                    :class="[
                    frontPage.mediaCategory === '' ? 'category_active' : ''
                  ]"
                    class="pointer"
                    @click="handelCategory('')"
                >
                  全部
                </li>
                <li
                    v-for="mediaCategory in frontAll.mediaCategory"
                    :key="mediaCategory.id"
                    :class="[
                    frontPage.mediaCategory === mediaCategory.id
                      ? 'category_active'
                      : ''
                  ]"
                    class="pointer"
                    @click="handelCategory(mediaCategory.id)"
                >
                  <!-- <img :src="mediaCategory.pic" alt="" /> -->
                  {{ mediaCategory.name }}
                </li>
              </ul>
              <em
                  v-if="checkCategory"
                  class="pointer"
                  @click="checkCategory = false"
              >
                更多 <img alt="" src="@/assets/img/icon-left.png"/>
              </em>
              <em v-else class="pointer" @click="checkCategory = true">
                收起 <img alt="" src="@/assets/img/up.png"/>
              </em>
            </div>
            <div v-if="frontPage.sellId === 7" class="nav_shopping">
              <span class="show_sort">分类</span>
              <ul :class="[checkType ? 'nav_shopping_check' : '']">
                <li
                    :class="[frontPage.mediaType === '' ? 'type_active' : '']"
                    class="pointer"
                    @click="handelMediaType('')"
                >
                  全部
                </li>
                <li
                    v-for="mediaType in frontAll.mediaType"
                    :key="mediaType.id"
                    :class="[
                    frontPage.mediaType === mediaType.id ? 'type_active' : ''
                  ]"
                    class="pointer"
                    @click="handelMediaType(mediaType.id)"
                >
                  <!-- <img :src="mediaType.pic" alt="" /> -->
                  {{ mediaType.name }}
                </li>
              </ul>
              <em v-if="checkType" class="pointer" @click="checkType = false">
                更多 <img alt="" src="@/assets/img/icon-left.png"/>
              </em>
              <em v-else class="pointer" @click="checkType = true">
                收起 <img alt="" src="@/assets/img/up.png"/>
              </em>
            </div>
            <div v-if="frontPage.sellId === 7" class="nav_marketing">
              <span class="show_sort">类别</span>
              <ul>
                <li
                    :class="[
                    frontPage.mediaClassification === ''
                      ? 'classification_active'
                      : ''
                  ]"
                    class="pointer"
                    @click="handelMediaClassification('')"
                >
                  全部
                </li>
                <li
                    v-for="mediaClassification in frontAll.mediaClassification"
                    :key="mediaClassification.id"
                    :class="[
                    frontPage.mediaClassification === mediaClassification.id
                      ? 'classification_active'
                      : ''
                  ]"
                    class="pointer"
                    @click="handelMediaClassification(mediaClassification.id)"
                >
                  <img :src="mediaClassification.pic" alt=""/>
                  {{ mediaClassification.name }}
                </li>
              </ul>
            </div>
            <div v-if="frontPage.sellId !== 7" class="nav_marketing xjahb5">
              <span>推广类别</span>
              <ul>
                <li
                    :class="[frontPage.promId === '' ? 'catere_active' : '']"
                    class="pointer"
                    @click="handelCatere('')"
                >
                  全部
                </li>
                <li
                    v-for="catere in catereArray"
                    :key="catere.id"
                    :class="[
                    frontPage.promId === catere.id ? 'catese_active' : ''
                  ]"
                    class="pointer"
                    @click="handelCatere(catere.id)"
                >
                  <img :src="catere.pic" alt=""/>{{ catere.name }}
                </li>
              </ul>
            </div>
            <div v-if="filter" class="nav_marketing">
              <span>价格区间</span>
              <div class="nav_pirce">
                <el-input
                    v-model="frontPage.startPrice"
                    class="pirce_interval"
                    placeholder="￥0"
                    type="text"
                    @input="v => (frontPage.startPrice = v.replace(/[^\d]/g, ''))"
                />
                -
                <el-input
                    v-model="frontPage.endPrice"
                    class="pirce_interval"
                    placeholder="￥0"
                    type="text"
                    @input="v => (frontPage.endPrice = v.replace(/[^\d]/g, ''))"
                />
              </div>
            </div>
            <div v-if="filter" class="nav_marketing nav_slider">
              <span>粉丝数量</span>
              <div class="slider-demo-block">
                <el-slider
                    v-model="frontPage.fanInterval"
                    :marks="marks"
                    :max="1000"
                    range
                    @change="sliderChange"
                />
              </div>
            </div>
            <div v-if="filter" class="nav_marketing nav_search">
              <span class="nav_search_reset pointer" @click="handleReset">
                重置
              </span>
              <span class="nav_search_left pointer" @click="handleSearch"
              >搜索
              </span>
            </div>
            <div class="footer_filter">
              <span
                  v-show="!filter"
                  class="filter_click pointer"
                  @click="handleSelect"
              >
                更多筛选 <img alt="" src="@/assets/img/dwon.png"/>
              </span>
              <span
                  v-show="filter"
                  class="filter_close pointer"
                  @click="handleSelect"
              >
                收起 <img alt="" src="@/assets/img/up.png"/>
              </span>
            </div>
          </div>
          <div class="news_list">
            <div class="news_list_title">
              <div class="resource_left">
                <span class="resource_nation"> {{ country }} </span>
                <span class="resource_nation_res">
                  / 全部资源({{ resourceTotal }})
                </span>
              </div>
              <div class="list_inquire">
                <!-- <el-checkbox-group v-model="collect" @change="handleCheckbox">
                  <el-checkbox :label="'1'">
                    只显示我的收藏
                  </el-checkbox>
                </el-checkbox-group> -->
                <div class="collect_box">
                  <div v-if="collect === 0" @click="handleCheckbox(1)">
                    <img alt="" src="@/assets/img/collect.png"/>
                    只显示我的收藏
                  </div>
                  <div v-else @click="handleCheckbox(0)">
                    <img alt="" src="@/assets/img/collect-active.png"/>
                    只显示我的收藏
                  </div>
                </div>
                <div class="list_inquire_content">
                  <el-input
                      v-model="frontPage.resourceName"
                      class="list_inquire_input xjahb6"
                      clearable
                      placeholder="资源名称"
                      @keyup.enter.native="handleResourceName"
                  >
                  </el-input>
                  <img
                      alt=""
                      class="pointer"
                      src="@/assets/img/inquire.png"
                      @click="handleResourceName"
                  />
                </div>
              </div>
            </div>
            <div class="platform">
              <!-- 详情列表 -->
              <el-scrollbar :height="maxheight">
                <div
                    v-for="(item, index) in resourceData"
                    :key="index"
                    class="platform_list pointer"
                >
                  <div class="platform_avatar">
                    <img
                        :src="item.resourcePic"
                        alt="头像"
                        class="avatar_img"
                    />
                    <img
                        :src="item.resourceIcon"
                        alt=""
                        class="platform_img xjahb8"
                    />
                  </div>
                  <div class="platform_content">
                    <div class="platform_details">
                      <div class="platform_name">
                        <a
                            :href="item.resourceUrl"
                            class="analyze_link_name xjahb7"
                            target="_blank"
                        >
                          <el-tooltip
                              class="box-item"
                              effect="dark"
                              placement="top-start"
                          >
                            <span class="name_text">
                              {{ item.resourceName }}
                            </span>
                            <template #content>
                              <div class="YW_name">
                                {{ item.resourceName }}
                              </div>
                            </template>
                          </el-tooltip>
                          <svg-icon
                              class="external"
                              icon-class="external_link"
                          />
                        </a>
                        <div class="platform_name_iocn">
                          <div
                              v-for="(platform, index) in item.platformsList"
                              :key="index"
                              class="iocn_right"
                          >
                            <el-tooltip
                                :content="platform.name"
                                class="box-item"
                                effect="dark"
                                placement="top-start"
                            >
                              <span>
                                <img :src="platform.pic" alt="" class="xjahb9"/>
                              </span>
                            </el-tooltip>
                          </div>
                          <div v-if="item.mediaTypeList" class="media_type">
                            <span
                                v-for="(type, index) in item.mediaTypeList"
                                v-show="index < 3"
                                :key="index"
                            >
                              {{ type.name }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                          v-if="item.flowAnalysis"
                          class="number number_analyze"
                      >
                        <a
                            :href="item.flowAnalysis"
                            class="analyze_link"
                            target="_blank"
                        >
                          <i class="iconfont icon-a-flow"/>
                          <span>流量分析</span>
                        </a>
                      </div>
                      <div v-if="item.fan" class="number_box">
                        <div
                            v-if="item.promId === 7"
                            :class="
                            item.mediaClassificationName === '素人'
                              ? ''
                              : 'influencer'
                          "
                            class="amateur"
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
                            <div>
                              <i class="iconfont icon-a-fans"/>
                              <span>{{ item.fan }}{{ item.fanUnit }}</span>
                            </div>
                            <template #content>
                              <div>
                                粉丝数量：{{ item.fan }}{{ item.fanUnit }}
                              </div>
                              <div v-if="item.averagePost">
                                日均发帖数：{{ item.averagePost }} 贴
                              </div>
                              <div v-if="item.communityCreateTime">
                                社群创建时间：{{ item.communityCreateTime }} 年
                              </div>
                            </template>
                          </el-tooltip>
                        </div>
                        <div class="segmentation"></div>
                        <div
                            v-if="item.averageView"
                            class="number number_people1"
                        >
                          <el-tooltip placement="top-start">
                            <div>
                              <i class="iconfont icon-mimakejian"/>
                              <span>
                                {{ item.averageView }}{{ item.viewUnit }}
                              </span>
                            </div>
                            <template #content>
                              <div>
                                平均观看量：
                                {{ item.averageView }}
                                {{ item.viewUnit }}
                              </div>
                            </template>
                          </el-tooltip>
                        </div>
                      </div>
                      <div
                          class="number number_popularity"
                          @click="handleCollect(item)"
                      >
                        <img
                            v-if="item.collect === 0"
                            alt=""
                            src="@/assets/img/collect.png"
                        />
                        <img
                            v-else
                            alt=""
                            src="@/assets/img/collect-active.png"
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
                            alt=""
                            src="@/assets/img/green-down.png"
                        />
                        <img v-else alt="" src="@/assets/img/green.png"/>
                      </div>
                    </div>
                    <div
                        v-for="(itemchld, index) in item.mediumInfoList"
                        v-show="item.showhide"
                        :key="index"
                        class="details_list"
                    >
                      <div class="list_text">
                        <div class="store_info">
                          <MediaInfo :itemchld="itemchld"></MediaInfo>
                          <!-- <span
                            v-if="itemchld.sfId === 2"
                            class="store_botton store_botton1"
                          >
                            自营
                          </span>
                          <span
                            v-if="itemchld.sfId === 1"
                            class="store_botton store_botton2"
                          >
                            自媒体
                          </span>
                          <span
                            v-if="itemchld.sfId === 3"
                            class="store_botton store_botton3"
                          >
                            服务商
                          </span> -->
                          <span v-if="itemchld.adId" class="adIdInfo_box">
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
                                :content="chldPlatform.name"
                                class="box-item"
                                effect="dark"
                                placement="top-start"
                            >
                              <span>
                                <img :src="chldPlatform.pic" alt=""/>
                              </span>
                            </el-tooltip>
                          </div>
                        </div>
                        <div class="store_text">
                          <p>{{ itemchld.resourceDes }}</p>
                        </div>
                        <div v-if="itemchld.pasteRate" class="store_renew">
                          <span>上贴率: {{ itemchld.pasteRate }} %</span>
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
                          <span class="member_price">
                            会员价：<em>￥{{ itemchld.memberPrice }}</em>
                          </span>
                          <span class="original_price">
                            原价：<em>￥{{ itemchld.price }}</em>
                          </span>
                        </div>
                      </div>
                      <div class="list_right">
                        <span class="uesr_one" @click="handleLink">
                          <i class="iconfont icon-shopping"/>
                          &nbsp; 立即下单
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
              <pagination
                  v-show="resourceTotal > 0"
                  v-model:limit="frontPage.pageSize"
                  v-model:page="frontPage.current"
                  :total="resourceTotal"
                  @pagination="getUserListPage"
              />
              <!-- 详情列表 -->
            </div>
          </div>
        </div>
        <div class="news_information">
          <div class="news_information_title">
            <h2>服务商入驻</h2>
            <p>
              如果您有好的媒体资源在这里提交代发申请，赚取服务费期待您的加入!
            </p>
            <div class="footer_cooperate">
              <a href="https://media.vqcm.com" target="_blank">立即加入</a>
              <img alt="" src="@/assets/img/cooperate.png"/>
            </div>
          </div>
          <Popular></Popular>
        </div>
      </div>
    </div>
    <Footer/>
    <!-- <Home ref="sonRef" @click="sonFn" :parMsg="myMsg" @parentFn="parFn"></Home> -->
    <!-- <botton @click="sonFn">3123132132131</botton> -->
    <!-- 回到顶部  -->
    <el-backtop :bottom="100" :right="100"/>
    <YwFloat @ywGuide="handleOpen"/>
  </div>
</template>
<script lang="ts" setup>
import {adIdInfo} from '@/enums'
import {useUserStore} from '@/stores'
import Popular from './components/popular.vue'
import {collectAdd, collectDelete, getCountry, getFront, userBehaviorAdd, userListPage} from '@/api/index'
import type {frontPageObj, loginWx} from '@/types/home'
import {driver, type DriveStep} from 'driver.js'
import 'driver.js/dist/driver.css'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const openeds = ref<string[]>(['0'])
const nationArray = ref<any>([])
const frontAll = ref<any>([])
const catereArray = ref<any>([])
const country = ref<string>('')
const checkCountry = ref<boolean>(true)
const checkCategory = ref<boolean>(true)
const checkType = ref<boolean>(true)
const filter = ref<boolean>(false)
const collect = ref(0)
const maxheight = ref<any>('612')
const resourceData = ref<any>([])
const resourceTotal = ref<number>(0)
const childLink = ref<any>()
const frontPage = reactive<frontPageObj>({
  collect: '',
  countryId: undefined,
  current: 1,
  endPrice: '',
  pageSize: 8,
  platforms: '',
  promId: '',
  mediaCategory: '',
  mediaType: '',
  mediaClassification: '',
  fanInterval: [0, 1000],
  resourceName: '',
  sellId: null,
  startPrice: '',
  resourceTypeId: undefined,
  userId: ''
})
let vxLogin = reactive<loginWx>({
  code: '',
  state: '',
  type: 0
})
const userInfo = reactive({
  avatar: '',
  userTrue: false
})
vxLogin.code = route.query.code
vxLogin.state = route.query.state
const getWeixin = () => {
  userStore.wxLogin(vxLogin).then((res: any) => {
    userStore.setUserInfo().then((res: any) => {
      router.push({path: '/'})
    })
  })
}
// 获取用户信息
const userAvatar = async () => {
  let token = userStore.loginInfo?.access_token
  if (token) {
    userStore.setUserInfo().then((res: any) => {
      getUserListPage()
    })
    const res = await userBehaviorAdd()
    console.log(res)
  } else {
    getUserListPage()
  }
}
// 获取回家资源列表
const getCountryList = async () => {
  const res = await getCountry({})
  nationArray.value = res?.data
  console.log(nationArray.value)
  country.value = nationArray.value[0].name
}
// // 购物平台管理
// const platformList = async () => {
//   const res = await platformAll()
//   countryArray.value = res?.data
// }
// 头部所有资源
const cateseList = async () => {
  const res = await getFront()
  frontAll.value = res?.data
  catereListSelect(null)
}
// // 推广类别管理
// const catereList = async () => {
//   const res = await catereAll()
//   catereArray.value = res?.data
// }
const steps: DriveStep[] = [
  // {
  //   element: '.xjahb1',
  //   popover: {
  //     title: '个人中心',
  //     description: `<b>用户中心: </b>进入用户信息界面,在此可以查询用户id，绑定手机号，邮箱号，查看余额，充值余额，购买会员，续费会员等。<br /><b>订单中心: </b>可以查询您的订单, 查看订单状态。<br />账号中心: 可以查询您的交易流水和申请电子发票。<br />联系客服: 如您在使用过程中遇到任何问题, 都可以联系客服解决。<br />反馈: 如果您在使用过程中有什么建议可以反馈给我们。<br />账号安全: 在这里您可以修改您的密码`,
  //     side: 'left'
  //   }
  // },
  {
    element: '.xjahb2',
    popover: {
      title: '国家地区',
      description:
          "<div style='width: 300px;'>不同地区有不同的资源平台，点击地区名默认显示所有支持的资源平台，也可单独点击某个平台查看。<br />如：点击Facebook，资源列表将只显示该地区Facebook的资源</div>",
      side: 'right'
    }
  },
  {
    element: '.xjahb3',
    popover: {
      title: '营销分类',
      description: "<div style='width: 300px;'>点击对应营销分类，可快速显示对应的资源，默认显示全部，可选有图文营销、开箱测评和买家秀</div>",
      side: 'bottom'
    }
  },
  {
    element: '.xjahb4',
    popover: {
      title: '购物平台',
      description:
          "<div style='width: 300px;'>点击对应购物平台，可快速显示对应的资源，默认显示全部，如无您的购物平台，请选择独立站</div>",
      side: 'bottom'
    }
  },
  {
    element: '.xjahb5',
    popover: {
      title: '推广类别',
      description: "<div style='width: 300px;'>根据对应营销分类点击对应推广类别，可快速显示对应的资源，默认显示全部，可选有文章Articles、促销Deals、广告栏ads和图文开箱</div>",
      side: 'bottom'
    }
  },
  {
    element: '.xjahb6',
    popover: {
      title: '资源搜索',
      description:
        "<div style='width: 300px;'>目前只支持根据名称搜索。以当前选择的地区，营销分类、购物平台和推广类别中搜索。<br />如：当前展示的为美国地区，则以支持美国地区的资源中所有，营销分类、购物平台和推广类别同理。<br /><br />温馨提醒：部分资源会经常改名字，平台同步不及时可能导致全称无法搜索出结果，可输入名称中几个关键单词搜索即可</div>",
      side: 'bottom'
    }
  },
  {
    element: '.xjahb7',
    popover: {
      title: '资源名称',
      description: "<div style='width: 300px;'>鼠标移到此处，可展示资源全称。点击一次即可跳转到资源详情页</div>",
      side: 'bottom'
    }
  },
  {
    element: '.xjahb8',
    popover: {
      title: '资源所属平台',
      description: "<div style='width: 300px;'>显示是Facebook的图标则代表是Facebook的群组或主页</div>",
      side: 'bottom'
    }
  },
  {
    element: '.xjahb9',
    popover: {
      title: '资源支持投放的购物平台',
      description: "<div style='width: 300px;'>如显示亚马逊和沃尔玛的logo，则代表该资源支持发两个购物平台的折扣信息</div>",
      side: 'bottom'
    }
  },
  // {
  //   element: '.xjahb10',
  //   popover: {
  //     title: '我要下单',
  //     description: "<div style='width: 300px;'>点击【我要下单】进行下单 进入下单界面</div>",
  //     side: 'bottom'
  //   }
  // },
  // {
  //   element: '.xjahb11',
  //   popover: {
  //     title: '下单页: 第一步',
  //     description:
  //       "<div style='font-size: 18px;font-weight: bold;color: #000;text-align: center;'>选择营销资源：图文营销/开箱测评</div><img src='./src/assets/img/xjahb11.png'/>",
  //     side: 'top',
  //     align: 'center'
  //   }
  // },
  // {
  //   element: '.xjahb12',
  //   popover: {
  //     title: '下单页: 第二步',
  //     description:
  //       "<div style='font-size: 18px;font-weight: bold;color: #000;text-align: center;'>选择推广类别：文章Articles、促销Deals 广告栏ads</div><img src='./src/assets/img/xjahb12.png'/>",
  //     side: 'bottom'
  //   }
  // },
  // {
  //   element: '.xjahb13',
  //   popover: {
  //     title: '下单页: 第三步',
  //     description:
  //       "<div style='font-size: 18px;font-weight: bold;color: #000;text-align: center;'>选择要推广的国家</div><img src='./src/assets/img/xjahb13.png'/>",
  //     align: 'center'
  //   }
  // }
]

const driverObj = driver({
  steps: steps,
  nextBtnText: '下一步',
  prevBtnText: '上一步',
  doneBtnText: '我知道了'
})

const handleOpen = () => {
  driverObj.drive()
}

// 通过id获取推广类别
const catereListSelect = (value: any) => {
  if (value === 7) {
    catereArray.value = []
  } else {
    catereArray.value =
        value === null
            ? frontAll.value.sysCateStTree
                .filter((i: any) => {
                  console.log(i)
                  return i.children !== null
                })
                .flatMap((i: any) => {
                  return i.children
                })
            : (catereArray.value = frontAll.value.sysCateStTree
                .filter((i: any) => {
                  return i.id === value
                })
                .flatMap((i: any) => {
                  return i.children
                }))
  }
}
// 粉丝量
const marks = reactive({
  0: '0',
  100: '100K',
  300: '300K',
  500: '500K',
  700: '700K',
  1000: '1000K'
})

// 获取粉数量
const sliderChange = (val: any) => {
  console.log(val)
}
// 查看更多
const handleDrop = (item: any) => {
  item.showhide = !item.showhide
}
// 国家媒体id
const handleMeun = (item: any) => {
  frontPage.countryId = item.id
  country.value = item.name
  frontPage.resourceTypeId = undefined
  frontPage.current = 1
  getUserListPage()
}
const handleMeunItem = (event: any, item: any) => {
  frontPage.resourceTypeId = item.id
  frontPage.current = 1
  getUserListPage()
}
// 营销分类查询
const handelCatese = (val: any) => {
  frontPage.sellId = val
  maxheight.value = val === 7 ? '535' : '612'
  catereListSelect(val)
  frontPage.current = 1
  getUserListPage()
}
// 购物平台
const handelCountry = (val: any) => {
  frontPage.platforms = val
  frontPage.current = 1
  getUserListPage()
}
// 产品类目
const handelCategory = (val: any) => {
  frontPage.mediaCategory = val
  frontPage.current = 1
  getUserListPage()
}
// 分类
const handelMediaType = (val: any) => {
  frontPage.mediaType = val
  frontPage.current = 1
  getUserListPage()
}
// 类别
const handelMediaClassification = (val: any) => {
  frontPage.mediaClassification = val
  frontPage.current = 1
  getUserListPage()
}
// 推广类别
const handelCatere = (val: any) => {
  frontPage.promId = val
  frontPage.current = 1
  getUserListPage()
}
// 更多购物平台search
const handleChange = () => {
  checkCountry.value = !checkCountry.value
}
// 粉丝数量和金额查询
const handleSelect = () => {
  filter.value = !filter.value
}
// 重置
const handleReset = () => {
  frontPage.fanInterval = [0, 1000]
  frontPage.startPrice = ''
  frontPage.endPrice = ''
  frontPage.current = 1
  getUserListPage()
}
// 搜索
const handleSearch = () => {
  frontPage.current = 1
  getUserListPage()
}
// 勾选我的收藏
const handleCheckbox = (val: number) => {
  if (val === 1) {
    collect.value = 1
    frontPage.collect = '1'
  } else if (val === 0) {
    collect.value = 0
    frontPage.collect = '0'
  }
  frontPage.userId = userStore.userInfo?.userId
  getUserListPage()
}
// 添加收藏
const handleCollect = async (item: any) => {
  const id = item.resourceId
  const userId = {
    resourceId: id,
    resourceUrl: item.resourceUrl
  }
  let url = {
    resourceUrl: item.resourceUrl
  }
  if (userStore.loginInfo) {
    const res =
        item.collect === 0 ? await collectAdd(userId) : await collectDelete(url)
    if (res.code === 200) {
      getUserListPage()
    }
  }
}
// 跳转下单页面
const handleLink = () => {
  if (userStore.userInfo) {
    router.push({path: '/placeOrder'})
  } else {
    childLink.value.handleLogin()
  }
}
// 获取查询资源
const handleResourceName = () => {
  getUserListPage()
}
// 获取首页资源
const getUserListPage = async () => {
  let maxNum = frontPage.fanInterval[1]
  if (maxNum === 1000) {
    frontPage.fanInterval.splice(1, 1, 999999)
  }
  frontPage.userId = userStore.userInfo?.userId
  const res = await userListPage(frontPage)
  resourceData.value = res.data?.mediumList
  for (const item of resourceData.value) {
    item.showhide = false
  }
  resourceTotal.value = res.data?.total
}
onMounted(() => {
})
if (vxLogin.code) {
  getWeixin()
}
userAvatar()
getCountryList()
cateseList()
</script>
<style lang="scss" scoped>
.YW_name {
  max-width: 200px;
}

.app-home {
  background-color: #f8f8f8;
}

.main {
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

  .main_news {
    display: flex;
    margin-top: 12px;

    .menu_resource {
      width: 172px;
      height: 924px;
      border-radius: 4px;
      background: #ffffff;
      margin-bottom: 5px;

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
        max-height: 883px;
        padding-bottom: 10px;
        font-size: 14px !important;
        color: #111111 !important;

        :deep(.table_device) {
          .el-scrollbar__thumb {
            background-color: #098d72;
          }
        }

        img {
          width: 18px;
          margin-right: 8px;
        }

        .el-menu-item.is-active {
          display: flex;
          align-items: center;
          background: #f3f9f8;
          color: #333;
          font-size: 14px;
        }
      }
    }

    .news_centent {
      flex: 1;
      margin: 0 16px;

      .news_centent_nav {
        background: #ffffff;
        border-radius: 4px;
        font-size: 14px;

        .nav_marketing {
          display: flex;
          height: 40px;
          align-items: center;
          border-bottom: 1px solid #ebedf0;

          .show_sort {
            width: 56px;
          }

          span {
            font-weight: 400;
            color: #888888;
            margin-left: 16px;
          }

          ul {
            margin-left: 40px;
            display: flex;
            align-items: center;

            li {
              margin-right: 32px;
              color: #333;
              display: flex;
              align-items: center;

              img {
                width: 14px;
                margin-right: 3px;
              }
            }

            .catese_active {
              font-weight: bold;
              color: #098d72;
            }

            .catere_active {
              font-weight: bold;
              color: #098d72;
            }

            .classification_active {
              font-weight: bold;
              color: #098d72;
            }
          }

          .nav_more {
            margin-left: 112px;
          }

          .nav_pirce {
            display: flex;
            align-items: center;
            margin-left: 35px;

            .pirce_interval {
              width: 138px;
              height: 32px;
              padding: 0 5px;
            }
          }
        }

        .nav_slider {
          height: 58px;
        }

        .nav_shopping {
          position: relative;
          display: flex;
          padding-bottom: 4px;
          border-bottom: 1px solid #ebedf0;

          .show_sort {
            width: 56px;
          }

          span {
            margin-top: 10px;
            font-weight: 400;
            color: #888888;
            margin-left: 16px;
          }

          .nav_shopping_check {
            height: 35px;
            overflow: hidden;
          }

          ul {
            margin-left: 40px;
            display: flex;
            flex-wrap: wrap;
            width: 700px;

            li {
              margin-right: 32px;
              color: #333;
              margin-top: 10px;
              display: flex;
              align-items: center;

              img {
                width: 14px;
                margin-right: 3px;
              }
            }

            .country_active {
              font-weight: bold;
              color: #098d72;
            }

            .category_active {
              font-weight: bold;
              color: #098d72;
            }

            .type_active {
              font-weight: bold;
              color: #098d72;
            }
          }

          em {
            position: absolute;
            right: 20px;
            top: 8px;
            width: 52px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.5);
            color: #555;
            font-size: 12px;

            img {
              width: 16px;
            }
          }
        }

        .nav_search {
          display: flex;
          flex-direction: row-reverse;

          .nav_search_left {
            background: #098d72;
            color: #fff;
          }

          .nav_search_reset {
            border: 1px solid #dcdee0;
            color: #555555;
            margin-right: 20px;
          }

          span {
            width: 64px;
            height: 32px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .footer_filter {
          padding: 4px 0;
          display: flex;
          justify-content: center;

          img {
            width: 18px;
          }

          .filter_click {
            width: 98px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            color: #555;
          }

          .filter_close {
            width: 72px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            color: #555;
          }
        }
      }

      .news_list {
        margin-top: 16px;
        background-color: #fff;
        border-radius: 4px;
        font-size: 14px;

        .news_list_title {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ebedf0;

          .resource_left {
            margin-left: 16px;

            span {
              display: inline-block;
              font-size: 14px;
            }

            .resource_nation_res {
              color: #098d72;
            }

            .resource_nation {
              color: #111;
              font-weight: bold;
              margin-right: 6px;
            }
          }
        }

        .list_inquire {
          display: flex;

          .collect_box {
            display: flex;
            align-items: center;

            div {
              display: flex;
              align-items: center;
              cursor: pointer;

              img {
                width: 16px;
                height: 16px;
                margin-right: 5px;
              }
            }
          }

          .list_inquire_content {
            width: 228px;
            margin: 0 16px 0 24px;
            color: #969799;
            position: relative;

            .list_inquire_input {
              width: 100%;

              :deep(.el-input__wrapper) {
                padding-right: 25px;
              }
            }

            img {
              position: absolute;
              width: 16px;
              right: 6px;
              top: 8px;
            }
          }
        }

        .platform {
          margin: 0 16px;

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
                transition: transform 0.3s ease-out;
              }

              .platform_img {
                position: absolute;
                width: 15px;
                top: 46px;
                left: 36px;
                border-radius: 4px;
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
                    max-width: 369px;
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
                  margin: 3px 0;
                  width: 389px;
                  align-items: center;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  -o-text-overflow: ellipsis;

                  .iocn_right {
                    margin-right: 10px;
                  }

                  img {
                    width: 15px;
                    margin-top: 7px;
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
                  width: 125px;
                  display: inline-block;
                  margin: auto;
                  margin-left: 94px;
                  color: #555555;

                  .iconfont {
                    color: #555;
                    margin-right: 6px;
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

                  .number_people {
                    max-width: 125px;
                    margin-left: 5px;
                  }

                  .number_people1 {
                    max-width: 125px;
                    margin-top: 8px;
                    margin-left: 5px;
                    display: inline-block;
                  }
                }

                .number_popularity {
                  width: 16px;
                  margin-left: 7px;
                  color: #555555;

                  img {
                    width: 16px;
                    margin-right: 3px;
                  }
                }

                .number_analyze {
                  margin-left: 94px;
                  width: 125px;

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
                  width: 586px;
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
                    padding: 0 5px;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    border-radius: 4px;
                    margin-top: 5px;
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
                    margin-left: 10px;
                    border: 1px solid #026853;
                    color: #026853;
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

            .avatar_img {
              transform: scale(1.1);
            }

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

    .news_information {
      width: 308px;

      .news_information_title {
        padding: 24px 16px 32px 16px;
        background-color: #fff;
        border-radius: 4px;

        h2 {
          font-weight: 600;
          color: #111111;
          font-size: 16px;
        }

        p {
          font-size: 14px;
          color: #555555;
          margin-top: 15px;
        }

        .footer_cooperate {
          position: relative;

          a {
            margin-top: 29px;
            display: block;
            text-align: center;
            font-size: 14px;
            width: 88px;
            height: 32px;
            line-height: 32px;
            background: #098d72;
            border-radius: 4px;
            color: #fff;
          }

          img {
            top: -59px;
            width: 141px;
            position: absolute;
            right: 0;
          }
        }
      }
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

.home-carousel {
  width: 100%;
  height: 649px;

  img {
    height: 100%;
    width: 100%;
    background-size: 100% auto;
  }

  .carousel-item {
    color: #475669;
    opacity: 0.75;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    display: flex;
    align-items: center;
    margin: 0;
    text-align: center;
    height: 100%;
  }
}

.slider-demo-block {
  display: flex;
  align-items: center;
  width: 730px;
  margin-left: 35px;
  margin-top: -10px;
}

.el-slider__marks-text {
  font-size: 12px !important;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

:deep(.el-slider__runway) {
  background-color: #ebedf0;
}

:deep(.el-slider__bar) {
  background-color: #098d72;
}

:deep(.el-slider__button) {
  width: 14px;
  height: 14px;
  border: 2px solid #098d72;
}

:deep(.el-slider__marks-text) {
  font-size: 12px;
  color: #333333;
  font-weight: bold;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #098d72;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #555;
}

:deep(.el-checkbox__inner) {
  border-radius: 9px;
  width: 16px;
  height: 16px;
}

:deep(.el-checkbox__inner::after) {
  left: 5px;
  top: 2px;
  height: 7px;
}

:deep(.el-rate__item) {
  width: 16px;
}

:deep(.el-menu) {
  border-right: 0 !important;

  .el-sub-menu.is-opened .el-sub-menu__title {
    color: #098d72 !important;
    font-weight: bold;
  }

  .el-sub-menu__title {
    height: 40px;
    transition: margin 0.3s ease-out;
    -webkit-transition: margin 0.3s ease-out;
    -moz-transition: margin 0.3s ease-out;
    -khtml-transition: margin 0.3s ease-out;
  }

  .el-sub-menu__title:hover {
    background: inherit;
    color: #098d72 !important;
    margin-left: 5px;
  }

  .el-menu-item {
    height: 40px;
    transition: margin 0.3s ease-out;
    -webkit-transition: margin 0.3s ease-out;
    -moz-transition: margin 0.3s ease-out;
    -khtml-transition: margin 0.3s ease-out;
  }

  .el-menu-item:hover {
    background: inherit;
    margin-left: 5px;
    color: #098d72 !important;
  }
}

:deep(.el-timeline-item__node--normal) {
  background-color: #098d72;
  border-color: 1px solid #098d72;
}

:deep(.el-timeline-item__tail) {
  border-left: 2px solid #098d72;
}

:deep(.el-timeline-item__node--normal) {
  border-left: 2px solid #098d72;
}

:deep(.el-scrollbar__thumb) {
  background-color: #098d72;
}
</style>
<style>
.driver-popover {
  max-width: 960px !important;
  .driver-popover-footer {
    .driver-popover-navigation-btns button{
      width: 84px !important;
      height: 28px !important;
      text-align: center !important;
      text-shadow: none !important;
      color: #fff !important;
      border: none !important;
      background-color: #098D72 !important;
    }
    .driver-popover-navigation-btns button:hover {
      background-color: #53af9c !important;
    }
  }
}
</style>
