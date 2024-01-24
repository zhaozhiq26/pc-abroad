<template>
  <div class="order_select">
    <div class="main_news">
      <div class="menu_resource">
        <h5 class="menu_resource_title">国家地区</h5>
        <el-menu class="el-menu-vertical-demo" :unique-opened="true">
          <template v-for="(v, index) in nationArray" :key="v.id">
            <el-sub-menu
              v-if="v.children"
              :index="index + ''"
              @click="handleMeun(v)"
            >
              <template #title>
                <img :src="v.pic" alt="" />
                {{ v.name }}
              </template>
              <el-scrollbar @click.stop height="600px" class="table_device">
                <el-menu-item
                  v-for="(vitem, vIndex) in v.children"
                  :key="vitem.id"
                  :index="`1 - ${vIndex}`"
                  @click="handleMeunItem($event, vitem)"
                >
                  <template #title>
                    <img :src="vitem.pic" alt="" />
                    {{ vitem.name }}
                  </template>
                </el-menu-item>
              </el-scrollbar>
            </el-sub-menu>
            <el-menu-item v-else :index="index + ''" @click="handleMeun(v)">
              <template #title>
                <img :src="v.pic" alt="" />
                {{ v.name }}
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="news_centent">
        <div class="news_centent_nav">
          <div class="nav_marketing">
            <span>营销分类</span>
            <ul>
              <li v-if="sellId" class="nav_active">{{ sellId.name }}</li>
            </ul>
          </div>
          <div class="nav_marketing nav_shopping">
            <span>购物平台</span>
            <ul>
              <li v-if="platform" class="nav_active">{{ platform.name }}</li>
            </ul>
          </div>
          <div v-if="props.orderObj.promId === 7" class="nav_shopping">
            <span>产品类目</span>
            <ul :class="[checkCategory ? 'nav_shopping_check' : '']">
              <li
                class="pointer"
                :class="[
                  frontPage.mediaCategory === '' ? 'category_active' : ''
                ]"
                @click="handelCategory('')"
              >
                全部
              </li>
              <li
                v-for="mediaCategory in frontAll.mediaCategory"
                :key="mediaCategory.id"
                class="pointer"
                :class="[
                  frontPage.mediaCategory === mediaCategory.id
                    ? 'category_active'
                    : ''
                ]"
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
              更多 <img src="@/assets/img/icon-left.png" alt="" />
            </em>
            <em v-else class="pointer" @click="checkCategory = true">
              收起 <img src="@/assets/img/up.png" alt="" />
            </em>
          </div>
          <div v-if="props.orderObj.promId === 7" class="nav_shopping">
            <span class="show_sort">分类</span>
            <ul :class="[checkType ? 'nav_shopping_check' : '']">
              <li
                class="pointer"
                :class="[frontPage.mediaType === '' ? 'type_active' : '']"
                @click="handelMediaType('')"
              >
                全部
              </li>
              <li
                v-for="mediaType in frontAll.mediaType"
                :key="mediaType.id"
                class="pointer"
                :class="[
                  frontPage.mediaType === mediaType.id ? 'type_active' : ''
                ]"
                @click="handelMediaType(mediaType.id)"
              >
                <img :src="mediaType.pic" alt="" /> {{ mediaType.name }}
              </li>
            </ul>
            <em v-if="checkType" class="pointer" @click="checkType = false">
              更多 <img src="@/assets/img/icon-left.png" alt="" />
            </em>
            <em v-else class="pointer" @click="checkType = true">
              收起 <img src="@/assets/img/up.png" alt="" />
            </em>
          </div>
          <div v-if="props.orderObj.promId === 7" class="nav_marketing">
            <span class="show_sort">类别</span>
            <ul>
              <li
                class="pointer"
                :class="[
                  frontPage.mediaClassification === ''
                    ? 'classification_active'
                    : ''
                ]"
                @click="handelMediaClassification('')"
              >
                全部
              </li>
              <li
                v-for="mediaClassification in frontAll.mediaClassification"
                :key="mediaClassification.id"
                class="pointer"
                :class="[
                  frontPage.mediaClassification === mediaClassification.id
                    ? 'classification_active'
                    : ''
                ]"
                @click="handelMediaClassification(mediaClassification.id)"
              >
                <img :src="mediaClassification.pic" alt="" />
                {{ mediaClassification.name }}
              </li>
            </ul>
          </div>
          <div v-if="props.orderObj.promId !== 7" class="nav_marketing">
            <span>推广类别</span>
            <ul>
              <li v-if="promId" class="nav_active">{{ promId.name }}</li>
            </ul>
          </div>
          <div v-if="filter" class="nav_marketing">
            <span>价格区间</span>
            <div class="nav_pirce">
              <el-input
                type="text"
                v-model="frontPage.startPrice"
                placeholder="￥0"
                @input="v => (frontPage.startPrice = v.replace(/[^\d]/g, ''))"
                class="pirce_interval"
              />
              -
              <el-input
                v-model="frontPage.endPrice"
                type="text"
                @input="v => (frontPage.endPrice = v.replace(/[^\d]/g, ''))"
                placeholder="￥0"
                class="pirce_interval"
              />
            </div>
          </div>
          <div v-if="filter" class="nav_marketing nav_slider">
            <span>粉丝数量</span>
            <div class="slider-demo-block">
              <el-slider
                v-model="frontPage.fanInterval"
                range
                :max="1000"
                :marks="marks"
              />
            </div>
          </div>
          <div v-if="filter" class="nav_marketing nav_search">
            <span class="nav_search_reset pointer" @click="handleReset">
              重置
            </span>
            <span class="nav_search_left pointer" @click="handleSearch">
              搜索
            </span>
          </div>
          <div class="footer_filter pointer">
            <span v-show="!filter" class="filter_click" @click="handleSelect">
              更多筛选 <img src="@/assets/img/dwon.png" alt="" />
            </span>
            <span v-show="filter" class="filter_close" @click="handleSelect">
              收起 <img src="@/assets/img/up.png" alt="" />
            </span>
          </div>
        </div>
        <div class="news_list">
          <div class="news_list_title">
            <div class="resource_left">
              <span class="resource_nation"> {{ country }} / </span>
              <span class="resource_nation_res"
                >全部资源({{ resourceTotal }})</span
              >
            </div>
            <div class="list_inquire">
              <!-- <el-checkbox-group v-model="collect" @change="handleCheckbox">
                <el-checkbox :label="'1'">只显示我的收藏</el-checkbox>
              </el-checkbox-group> -->
              <div class="collect_box">
                <div @click="handleCheckbox(1)" v-if="collect === 0">
                  <img src="@/assets/img/collect.png" alt="" />
                  只显示我的收藏
                </div>
                <div @click="handleCheckbox(0)" v-else>
                  <img src="@/assets/img/collect-active.png" alt="" />
                  只显示我的收藏
                </div>
              </div>
              <div class="list_inquire_content">
                <el-input
                  v-model="frontPage.resourceName"
                  placeholder="推广平台/资源名称/采购平台"
                  class="list_inquire_input"
                  clearable
                  @keyup.enter.native="handleResourceName"
                >
                </el-input>
                <img
                  src="@/assets/img/inquire.png"
                  alt=""
                  @click="handleResourceName"
                />
              </div>
            </div>
          </div>
          <el-scrollbar @click.stop :height="maxheight" class="table_device">
            <div class="platform">
              <div
                v-for="(item, index) in resourceData"
                :key="index"
                class="platform_list"
              >
                <div class="platform_avatar">
                  <img :src="item.resourcePic" alt="头像" class="avatar_img" />
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
                          <div>
                            <i class="iconfont icon-a-fans" />
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
                      <div
                        class="number number_people1"
                        v-if="item.averageView"
                      >
                        <el-tooltip placement="top-start">
                          <div>
                            <i class="iconfont icon-mimakejian" />
                            <span
                              >{{ item.averageView }}{{ item.viewUnit }}</span
                            >
                          </div>
                          <template #content>
                            <div>
                              平均观看量：
                              {{ item.averageView }}{{ item.viewUnit }}
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
                        <em>{{ item.price }}</em> 起
                      </span>
                      <img
                        v-if="item.showhide"
                        src="@/assets/img/green-down.png"
                        alt=""
                      />
                      <img v-else src="@/assets/img/green.png" alt="" />
                    </div>
                  </div>
                  <el-checkbox-group v-model="checkedArrOrders">
                    <div
                      v-show="item.showhide"
                      v-for="(itemchld, chldIndex) in item.mediumInfoList"
                      :key="index"
                      class="details_list"
                      :class="{ detailsList: itemchld.isCkeck }"
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
                          <span class="store_text_content">
                            {{ itemchld.resourceDes }}
                          </span>
                        </div>
                        <div class="store_renew">
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
                          <span class="member_price">
                            会员价：<em>￥{{ itemchld.memberPrice }}</em>
                          </span>
                          <span class="original_price">
                            原价：<em>￥{{ itemchld.price }}</em>
                          </span>
                        </div>
                      </div>
                      <div class="list_right">
                        <el-checkbox
                          :label="itemchld"
                          :key="chldIndex"
                          :disabled="!itemchld.flag"
                          @change="handleCheck(itemchld, chldIndex, item)"
                        >
                          选择
                        </el-checkbox>
                      </div>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
              <pagination
                v-show="resourceTotal > 0"
                :total="resourceTotal"
                v-model:page="frontPage.current"
                v-model:limit="frontPage.pageSize"
                @pagination="getUserListPage"
              />
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="news_information">
        <div class="news_information_title">
          <span>已选择</span>
        </div>
        <el-scrollbar @click.stop height="700px" class="table_device">
          <div
            v-for="(item, index) in checkedArrOrders"
            :key="index"
            class="popular_list"
          >
            <div class="popular_list_content">
              <div class="popular_avatar">
                <img :src="item.mediumPic" alt="头像" class="avatar_img" />
              </div>
              <div class="popular_content">
                <div class="popular_name">
                  <span class="name_text">
                    {{ item.resourceName }}
                  </span>
                  <div class="popular_pirce">
                    <div class="number_more">
                      <div v-if="item.promId !== 3">
                        <span v-if="userStore.userInfo.userType === 0">
                          <em>￥{{ item.price }}</em>
                        </span>
                        <span v-if="userStore.userInfo.userType === 1">
                          <em>￥{{ item.memberPrice }}</em>
                        </span>
                      </div>
                      <div v-if="item.promId === 3">
                        <span v-if="props.orderObj.articleType === 0">
                          <em v-if="userStore.userInfo.userType === 0">
                            ￥{{ item.price }}
                          </em>
                          <em v-if="userStore.userInfo.userType === 1">
                            ￥{{ item.memberPrice }}
                          </em>
                        </span>
                        <span v-if="props.orderObj.articleType === 1">
                          <em v-if="userStore.userInfo.userType === 0">
                            ￥{{ item.originalGhostwritingPrice }}
                          </em>
                          <em v-if="userStore.userInfo.userType === 1">
                            ￥{{ item.ghostwritingPrice }}
                          </em>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="popular_close"
                @click="handleDeleteOrder(item, index)"
              >
                <el-icon><Close /></el-icon>
              </div>
            </div>
          </div>
        </el-scrollbar>
        <div class="total_cost">
          <div class="total_cost_title">
            <span>总费用</span>
            <span>￥{{ totalAmount }}</span>
          </div>
          <div class="total_cost_step">
            <span class="next_step pointer" @click="nextIssueOrderFn">
              下一步
            </span>
            <span class="previous_stop pointer" @click="returnUpStep">
              返回上一步
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { adIdInfo } from '@/enums'
import dayjs from 'dayjs'
import {
  getOneplatform,
  getOneCatese,
  getOneCatere,
  getCountry
} from '@/api/order'
import { userListPage, collectAdd, collectDelete, getFront } from '@/api/index'
import { useUserStore } from '@/stores'
//接收父組件傳過來的值
const props = defineProps({
  orderObj: {
    type: Object,
    default: {}
  }
})
const userStore = useUserStore()
const filter = ref<Boolean>(false)
const nationArray = ref<any>([])
const sellId = ref<any>()
const promId = ref<any>()
const platform = ref<any>()
const country = ref<any>('')
const frontAll = ref<any>([])
const checkCategory = ref<boolean>(true)
const checkType = ref<boolean>(true)
const resourceData = ref<any>([])
const maxheight = ref<any>()
const resourceTotal = ref<number>(0)
const collect = ref(0)
const checkedArrOrders = ref<any>([])
const totalAmount = ref<any>(0)
const frontPage = reactive<any>({
  collect: '',
  countryId: props.orderObj?.countryId,
  current: 1,
  endPrice: '',
  pageSize: 10,
  platforms: props.orderObj?.platformId,
  promId: props.orderObj?.promId,
  fanInterval: [0, 1000],
  resourceName: '',
  sellId: props.orderObj?.sellId,
  mediaCategory: '',
  mediaType: '',
  mediaClassification: '',
  startPrice: '',
  resourceTypeId: undefined,
  userId: userStore.userInfo?.userId
})
if (props.orderObj.promId === 7) {
}
maxheight.value = props.orderObj.promId === 7 ? 580 : 660
// 获取国家资源列表
const getCountryList = async () => {
  const id = {
    id: props.orderObj?.countryId
  }
  const res = await getCountry(id)
  nationArray.value = res?.data
  country.value = nationArray.value[0].name
}
// 购物平台管理
const platformList = async () => {
  if (!props.orderObj.platformId) {
    return false
  }
  const id = props.orderObj.platformId
  const res = await getOneplatform(id)
  platform.value = res?.data
}
// 营销分类管理
const cateseList = async () => {
  if (!props.orderObj.sellId) {
    return false
  }
  const id = props.orderObj.sellId
  console.log(id)
  const res = await getOneCatese(id)
  let data = {
    id: 7,
    name: '买家秀',
    pic: ''
  }
  sellId.value = props.orderObj.promId === 7 ? data : res?.data
}
// 头部所有资源
const frontAllList = async () => {
  const res = await getFront()
  frontAll.value = res?.data
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
// 通过id获取推广类别
const catereList = async () => {
  if (!props.orderObj.promId) {
    return false
  }
  const id = props.orderObj.promId
  const res = await getOneCatere(id)
  promId.value = res?.data
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
// 切换
const handleSelect = () => {
  filter.value = !filter.value
}
// 查看更多
const handleDrop = (item: any) => {
  item.showhide = !item.showhide
}
// 国家媒体id
const handleMeun = (item: any) => {
  frontPage.countryId = item.id
  frontPage.resourceTypeId = undefined
  country.value = item.name
  getUserListPage()
}
const handleMeunItem = (event: any, item: any) => {
  frontPage.resourceTypeId = item.id
  getUserListPage()
}
// 重置
const handleReset = () => {
  frontPage.fanInterval = [0, 1000]
  frontPage.startPrice = ''
  frontPage.endPrice = ''
  getUserListPage()
}
// 搜索
const handleSearch = () => {
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
// 添加/删除/收藏
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
// 选择订单
const handleCheck = (itemchld: any, chldIndex: any, item: any) => {
  // itemchld.isCkeck = !itemchld.isCkeck
  console.log(item.mediumInfoList, checkedArrOrders.value)
  item.mediumInfoList.forEach((i: any, j: any) => {
    console.log(chldIndex, j)
    if (chldIndex !== j) {
      checkedArrOrders.value = checkedArrOrders.value.filter((y: any) => {
        return y.id !== i.id
      })
    }
  })
  console.log(checkedArrOrders.value)
  // checkedArrOrders.value = resourceData.value
  //   .flatMap((i: any) => {
  //     return i.mediumInfoList
  //   })
  //   .filter((i: any) => {
  //     return i.isCkeck === true
  //   })
  handleTotalpirce()
}
// 删除订单
const handleDeleteOrder = (item: any, index: any) => {
  checkedArrOrders.value.splice(index, 1)
  // resourceData.value
  //   .flatMap((i: any) => {
  //     return i.mediumInfoList
  //   })
  //   .forEach((i: any) => {
  //     if (i.id === item.id) {
  //       i.isCkeck = false
  //     }
  //   })
  handleTotalpirce()
}
// 计算总价
const handleTotalpirce = () => {
  if (props.orderObj.articleType && props.orderObj.articleType === 1) {
    if (userStore.userInfo.userType === 0) {
      totalAmount.value = checkedArrOrders.value
        .reduce(
          (sum: any, item: any) => sum + Number(item.originalGhostwritingPrice),
          0
        )
        .toFixed(2)
    }
    if (userStore.userInfo.userType === 1) {
      totalAmount.value = checkedArrOrders.value
        .reduce(
          (sum: any, item: any) => sum + Number(item.ghostwritingPrice),
          0
        )
        .toFixed(2)
    }
    console.log(totalAmount.value, checkedArrOrders.value)
  } else {
    if (userStore.userInfo.userType === 0) {
      totalAmount.value = checkedArrOrders.value
        .reduce((sum: any, item: any) => sum + Number(item.price), 0)
        .toFixed(2)
    }
    if (userStore.userInfo.userType === 1) {
      totalAmount.value = checkedArrOrders.value
        .reduce((sum: any, item: any) => sum + Number(item.memberPrice), 0)
        .toFixed(2)
    }
  }
}
const emit = defineEmits(['returnUpStep', 'nextIssueOrder'])
// 返回上一步
const returnUpStep = () => {
  emit('returnUpStep', 1)
}
// 下一步
const nextIssueOrderFn = () => {
  if (checkedArrOrders.value.length < 1) {
    ElMessage.error('请选择资源!')
    return
  }
  props.orderObj.orderItems = checkedArrOrders.value
  props.orderObj.totalAmount = totalAmount.value
  const orderObj = props.orderObj
  orderObj.startTime =
    orderObj.promId === 7 || orderObj.promId === 6
      ? dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
      : orderObj.startTime
  console.log(props.orderObj)
  emit('nextIssueOrder', orderObj, 3)
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
  const res = await userListPage(frontPage)
  resourceData.value = res.data?.mediumList
  for (let item of resourceData.value) {
    item.showhide = false
    for (let j of item.mediumInfoList) {
      j.isCkeck = false
    }
  }
  resourceTotal.value = res.data?.total
  console.log(resourceData.value)
}
getUserListPage()
getCountryList()
platformList()
frontAllList()
cateseList()
catereList()
</script>
<style lang="scss" scoped>
.order_select {
  width: 1400px;
  margin-left: auto;
  margin-right: auto;
  .main_news {
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
        }

        .el-menu-item.is-active {
          background: #f3f9f8;
          color: #333;
          font-size: 14px;
        }
      }
    }

    .news_centent {
      width: 888px;
      margin: 0 16px;

      .news_centent_nav {
        background: #ffffff;
        border-radius: 4px;
        font-size: 14px;

        .nav_marketing {
          display: flex;
          height: 48px;
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

            li {
              display: inline-block;
              margin-right: 32px;
              color: #333;
            }

            .nav_active {
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

        .nav_slider {
          height: 58px;
          .slider-demo-block {
            display: flex;
            align-items: center;
            width: 730px;
            margin-left: 35px;
            margin-top: -10px;
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
            margin-right: 10px;
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
          padding: 16px 0;
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
              color: #111;
              font-size: 14px;
            }

            .resource_nation {
              font-weight: bold;
              margin-right: 6px;
              color: #111;
            }
            .resource_nation_res {
              color: #098d72;
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
          padding-bottom: 20px;

          .platform_list {
            display: flex;
            border-bottom: 1px solid #ebedf0;
            padding-bottom: 10px;

            .platform_avatar {
              position: relative;

              .avatar_img {
                margin-top: 11px;
                width: 56px;
                height: 56px;
                border-radius: 28px;
                transition: transform 0.3s ease-out;
              }

              .platform_img {
                position: absolute;
                width: 16px;
                top: 51px;
                left: 40px;
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
                  width: 389px;
                  margin-top: 16px;
                  .iocn_right {
                    margin-right: 10px;
                  }
                  img {
                    margin-top: 2px;
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
                  width: 124px;
                  margin: auto;
                  margin-left: 90px;
                  color: #555555;
                  font-size: 14px;
                  display: inline-block;
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
                    cursor: default;
                    margin-left: 5px;
                    max-width: 124px;
                  }
                  .number_people1 {
                    cursor: default;
                    max-width: 124px;
                    margin-top: 8px;
                    margin-left: 5px;
                  }
                }
                .number_popularity {
                  margin-left: 5px;
                  width: 16px;
                  color: #555555;
                  img {
                    width: 16px;
                    margin-right: 3px;
                  }
                }
                .number_analyze {
                  margin-left: 90px;
                  width: 124px;
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

              .detailsList {
                background: rgba($color: #098d72, $alpha: 0.08);
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
      height: 924px;
      position: relative;
      background-color: #fff;
      .news_information_title {
        padding: 24px 16px 32px 16px;
        height: 40px;
        border-bottom: 1px solid #ebedf0;
        font-size: 14px;
        color: #111;
      }
      .popular_list {
        padding: 0 16px 10px 16px;
        .popular_list_content {
          padding: 11px 0;
          display: flex;
          border-bottom: 1px solid #ebedf0;
          padding-bottom: 10px;
        }
        .popular_avatar {
          position: relative;
          .avatar_img {
            width: 56px;
            height: 56px;
            border-radius: 28px;
          }
        }

        .popular_content {
          margin-left: 16px;
          display: flex;
          font-size: 14px;

          .popular_name {
            .name_text {
              display: block;
              width: 168px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              color: #111;
              font-weight: bold;
            }

            .popular_pirce {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 15px;

              .popular_usa {
                width: 16px;
                height: 16px;
                margin-top: 5px;
              }

              .number_more {
                font-size: 12px;
                display: flex;
                align-items: center;
                color: #111;
                span {
                  em {
                    font-weight: bold;
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
        .popular_close {
          display: flex;
          align-items: center;
          margin-left: 23px;
          color: #555555;
        }
      }
      .total_cost {
        position: absolute;
        bottom: 0;
        left: 0;
        .total_cost_title {
          display: flex;
          height: 40px;
          justify-content: space-between;
          color: #111111;
          margin: 0 16px;
          font-weight: bold;
          border-bottom: 1px solid #ebedf0;
          span {
            font-weight: bold;
          }
        }
        .total_cost_step {
          padding: 0 16px;
          margin-top: 16px;
          margin-bottom: 10px;
          span {
            display: block;
          }
          .next_step {
            width: 276px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #098d72;
            border-radius: 4px;
            color: #fff;
          }
          .previous_stop {
            width: 276px;
            height: 32px;
            background: #ffffff;
            border-radius: 4px;
            line-height: 32px;
            text-align: center;
            color: #098d72;
            border: 1px solid #098d72;
            margin-top: 16px;
          }
        }
      }
    }
  }
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
:deep(.el-slider__button) {
  width: 14px;
  height: 14px;
  border: 2px solid #098d72;
}
:deep(.el-checkbox-group) {
  font-size: 14px;
  line-height: 20px;
}
:deep(.table_device) {
  .el-scrollbar__thumb {
    background-color: #098d72;
  }
}
</style>
