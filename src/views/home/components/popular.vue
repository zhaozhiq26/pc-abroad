<template>
  <div class="popular-app">
    <div class="popular_trading">
      <div class="popular_trading_nav">
        <span
          :class="[index === 1 ? 'trading_nav_active' : '']"
          @click="handelRank(1)"
        >
          <i class="iconfont icon-a-recommend" />
          推荐
        </span>
        <span
          :class="[index === 2 ? 'trading_nav_active' : '']"
          @click="handelRank(2)"
        >
          <i class="iconfont icon-a-hot" />
          热门
        </span>
        <span
          :class="[index === 3 ? 'trading_nav_active' : '']"
          class="trading_nav_border"
          @click="handelRank(3)"
        >
          <i class="iconfont icon-a-newest" />
          最新
        </span>
      </div>
      <el-scrollbar height="580px">
        <div
          v-for="(item, index) in rankData"
          :key="index"
          class="popular_list"
        >
          <div class="popular_list_content">
            <div class="popular_avatar">
              <a :href="item.resourceUrl" target="_blank" class="analyze_link">
                <img :src="item.picUrl" alt="头像" class="avatar_img" />
              </a>
            </div>
            <div class="popular_content">
              <div class="popular_name">
                <span class="name_text">
                  {{ item.resourceName }}
                </span>
                <div class="popular_pirce">
                  <div class="popular_icon_list">
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
                  </div>
                  <div class="number_more" @click="handleRankDialog(item)">
                    <span>
                      ￥
                      <em>{{ item.price }}</em>
                      起
                    </span>
                    <img src="@/assets/img/green.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <PaginationSimple
        v-show="total > 6"
        :total="total"
        v-model:page="rankPage.pageNum"
        v-model:limit="rankPage.pageSize"
        @pagination="getRankListPage"
      >
      </PaginationSimple>
    </div>
    <!-- 热门更多弹窗 -->
    <el-dialog
      v-model="dialogOrderisible"
      :close-on-click-modal="false"
      width="800"
    >
      <div class="platform">
        <div class="platform_list">
          <div class="platform_avatar">
            <!-- <img
                :src="rankDataDetails.resourcePic"
                alt="头像"
                class="avatar_img"
              /> -->
            <img :src="rankDataDetails.picUrl" alt="" class="avatar_img" />
            <img
              :src="rankDataDetails.resourceIcon"
              alt=""
              class="platform_img"
            />
          </div>
          <div class="platform_content">
            <div class="platform_details">
              <div class="platform_name">
                <a
                  :href="rankDataDetails.resourceUrl"
                  target="_blank"
                  class="analyze_link"
                >
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="rankDataDetails.resourceName"
                    placement="top-start"
                  >
                    <span class="name_text">
                      {{ rankDataDetails.resourceName }}
                    </span>
                  </el-tooltip>
                </a>
                <div class="platform_name_iocn">
                  <div
                    v-for="(platform, index) in rankDataDetails.platformsList"
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
                  <div v-if="rankDataDetails.mediaTypeList" class="media_type">
                    <span
                      v-for="(type, index) in rankDataDetails.mediaTypeList"
                      :key="index"
                      v-show="index < 3"
                    >
                      {{ type.name }}
                    </span>
                  </div>
                </div>
              </div>
              <div
                v-if="rankDataDetails.flowAnalysis"
                class="number number_analyze"
              >
                <a
                  :href="rankDataDetails.flowAnalysis"
                  target="_blank"
                  class="analyze_link_flow"
                >
                  <i class="iconfont icon-a-flow" />
                  <span>流量分析</span>
                </a>
              </div>
              <div class="number_box" v-if="rankDataDetails.fan">
                <div class="number number_people">
                  <el-tooltip placement="top-start">
                    <div>
                      <i class="iconfont icon-a-fans" />
                      <span>
                        {{ rankDataDetails.fan }}{{ rankDataDetails.fanUnit }}
                      </span>
                    </div>
                    <template #content>
                      <div>
                        粉丝数量：
                        {{ rankDataDetails.fan }}{{ rankDataDetails.fanUnit }}
                      </div>
                      <div v-if="rankDataDetails.averagePost">
                        日均发帖数：{{ rankDataDetails.averagePost }} 贴
                      </div>
                      <div v-if="rankDataDetails.communityCreateTime">
                        社群创建时间：{{ rankDataDetails.communityCreateTime }}
                        年
                      </div>
                    </template>
                  </el-tooltip>
                </div>
                <div
                  v-if="rankDataDetails.averageView"
                  class="number number_people1"
                >
                  <el-tooltip placement="top-start">
                    <div>
                      <i class="iconfont icon-mimakejian" />
                      <span>
                        {{ rankDataDetails.averageView
                        }}{{ rankDataDetails.viewUnit }}
                      </span>
                    </div>
                    <template #content>
                      <div>
                        平均观看量：{{ rankDataDetails.averageView }}
                        {{ rankDataDetails.viewUnit }}
                      </div>
                    </template>
                  </el-tooltip>
                </div>
              </div>
              <!-- <div
                class="number number_popularity"
                @click="handleCollect(rankDataDetails)"
              >
                <img
                  v-if="rankDataDetails.collect === 0"
                  src="@/assets/img/collect.png"
                  alt=""
                />
                <img v-else src="@/assets/img/collect-active.png" alt="" />
              </div> -->
              <div
                class="number number_more"
                @click="handleDrop(rankDataDetails)"
              >
                <span>
                  ￥
                  <em>{{ rankDataDetails.price }}</em>
                  起
                </span>
                <img
                  v-if="rankDataDetails.showhide"
                  src="@/assets/img/green-down.png"
                  alt=""
                />
                <img v-else src="@/assets/img/green.png" alt="" />
              </div>
            </div>
            <div
              v-show="rankDataDetails.showhide"
              v-for="(itemchld, index) in rankDataDetails.mediumRankListVOList"
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
                  <span class="adIdInfo_box" v-if="itemchld.adId">
                    {{ adIdInfo[itemchld.adId] }}
                    <em v-if="itemchld.adSize">:</em>
                    {{ itemchld.adSize }}
                  </span>
                  <div
                    v-for="(chldPlatform, index) in itemchld.platformsList"
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
                  <span
                    v-if="itemchld.mediaClassificationName"
                    class="details_type"
                  >
                    {{ itemchld.mediaClassificationName }}
                  </span>
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
                  <span class="member_price">
                    会员价：<em>￥{{ itemchld.memberPrice }}</em>
                  </span>
                  <span class="original_price"
                    >原价：<em>￥{{ itemchld.price }}</em>
                  </span>
                </div>
              </div>
              <div class="list_right pointer" @click="handleLink">
                <span class="uesr_one">
                  <img src="@/assets/img/shopping.png" alt="" />
                  立即下单
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { adIdInfo } from '@/enums'
import { getRank } from '@/api/index'
import { useUserStore } from '@/stores'
import { collectAdd, collectDelete } from '@/api/index'
import type { rankObject } from '@/types/home'
const router = useRouter()
const userStore = useUserStore()
const rankData = ref<any>([])
const index = ref<number>(1)
const dialogOrderisible = ref<boolean>(false)
const total = ref<number>(0)
const rankDataDetails = ref<any>()
const rankPage = reactive<rankObject>({
  newSort: undefined,
  pageNum: 1,
  pageSize: 7,
  popularSort: undefined,
  recommendSort: 1
})
// 添加收藏
const handleCollect = async (item: any) => {
  const arr = item.mediumInfoList.map((m: any) => m.id)
  const userId = {
    ids: arr
  }
  if (userStore.loginInfo) {
    const res =
      item.collect === 0
        ? await collectAdd(userId)
        : await collectDelete(userId)
    if (res.code === 200) {
      // getUserListPage()
    }
  }
}
const handleRankDialog = (item: any) => {
  dialogOrderisible.value = true
  rankDataDetails.value = item
}
// 查看更多
const handleDrop = (item: any) => {
  item.showhide = !item.showhide
}
//再来一单
const handleLink = () => {
  if (userStore.userInfo) {
    router.push({ path: '/placeOrder' })
  } else {
    ElMessage.error('请先登陆!')
  }
}
// 获取热门资源
const getRankListPage = async () => {
  const res = await getRank(rankPage)
  rankData.value = res.data?.mediumRankListVOS
  for (const item of rankData.value) {
    item.showhide = false
  }
  total.value = res.data?.total
}
const handelRank = (num: number) => {
  index.value = num
  rankPage.pageNum = 1
  switch (num) {
    case 1:
      rankPage.recommendSort = num
      rankPage.popularSort = undefined
      rankPage.newSort = undefined
      break
    case 2:
      rankPage.recommendSort = undefined
      rankPage.popularSort = num
      rankPage.newSort = undefined
      break
    case 3:
      rankPage.recommendSort = undefined
      rankPage.popularSort = undefined
      rankPage.newSort = num
      break
    default:
  }
  getRankListPage()
}
getRankListPage()
</script>
<style lang="scss" scoped>
.popular-app {
  border-radius: 4px;

  .popular_trading {
    background-color: #fff;
    margin-top: 16px;
    height: 717px;
    .popular_trading_nav {
      display: flex;
      align-items: center;
      height: 40px;
      background: #ffffff;
      font-size: 14px;
      border-bottom: 1px solid #dcdee0;
      .trading_nav_active {
        color: #098d72;
      }
      span {
        display: flex;
        cursor: pointer;
        padding: 0 16px;
        align-items: center;
        border-right: 1px solid #dcdee0;
      }

      .trading_nav_border {
        border: 0;
      }

      img {
        width: 16px;
        margin-right: 2px;
      }
    }
  }
  .el-scrollbar {
    height: 580px;
  }

  .popular_list {
    padding: 0 10px 0px 10px;
    .popular_list_content {
      padding: 9px 0;
      display: flex;
      border-bottom: 1px solid #ebedf0;
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
          width: 204px;
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
          margin-top: 6px;
          .popular_icon_list {
            margin-top: 10px;
            width: 60px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            .iocn_right {
              display: inline-block;
              margin-right: 10px;
              img {
                width: 16px;
                height: 16px;
              }
            }
          }
          .popular_usa {
            width: 16px;
            height: 16px;
            margin-top: 5px;
          }

          .number_more {
            display: flex;
            cursor: pointer;
            font-size: 12px;
            color: #098d72;
            align-items: center;

            span {
              em {
                font-weight: bold;
                font-size: 16px;
              }
            }

            img {
              width: 20px;
            }
          }
        }
      }
    }
  }

  .platform {
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
        }

        .platform_img {
          position: absolute;
          width: 16px;
          top: 51px;
          left: 40px;
        }
      }

      .platform_content {
        margin-left: 14px;

        .platform_details {
          display: flex;

          .platform_name {
            .name_text {
              display: block;
              margin-top: 13px;
              width: 350px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              color: #111;
              font-weight: bold;
            }
          }
          .platform_name_iocn {
            display: flex;
            margin-top: 18px;
            .iocn_right {
              margin-right: 10px;
            }
            img {
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
            margin: auto;
            width: 125px;
            color: #555555;
            margin-left: 46px;
            display: inline-block;
            .iconfont {
              margin-right: 6px;
            }
            .number_people {
              cursor: default;
              max-width: 125px;
              color: #555555;
              margin-left: 5px;
              display: inline-block;
            }
            .number_people1 {
              cursor: default;
              max-width: 125px;
              color: #555555;
              margin-top: 8px;
              margin-left: 5px;
              display: inline-block;
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
            margin-left: 46px;
            width: 125px;
            .iconfont {
              margin-left: 3px;
            }
            .analyze_link_flow {
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
            width: 135px;
            display: flex;
            font-size: 12px;
            cursor: pointer;
            margin-left: 40px;
            align-items: center;
            justify-content: flex-end;
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
  }

  :deep(.el-dialog__body) {
    padding: 16px;
  }
}
</style>
