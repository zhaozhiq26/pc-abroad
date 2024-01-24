<script setup lang="ts">
import { useUserStore } from '@/stores'

const childLink = ref()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const placeOrder = () => {
  if (userStore.userInfo) {
    router.push({ path: '/placeOrder' })
  } else {
    childLink.value.handleLogin()
  }
}
// 获取用户信息
const userAvatar = async () => {
  let token = userStore.loginInfo?.access_token
  if (token) {
    userStore.setUserInfo()
  }
}
userAvatar()
</script>

<template>
  <div class="display_page">
    <Header :num="3"></Header>
    <div class="main">
      <div class="header_box">
        <div class="header_title">
          <img src="@/assets/ywHome/header_title.png" alt="" />
        </div>
        <div class="header_content">
          专业推广
          <span>让产品销售更简单</span>
        </div>
        <div class="header_bottom">
          <span class="header_left"> 实力 服务 </span>
          <span class="header_right">
            <div class="right_box">
              <div class="top">1000000+</div>
              <div class="bottom">媒体资源</div>
            </div>
            <div class="right_box">
              <div class="top">15+</div>
              <div class="bottom">行业品类</div>
            </div>
            <div class="right_box">
              <div class="top">200+</div>
              <div class="bottom">全球国家</div>
            </div>
            <div class="right_box">
              <div class="top">30亿+</div>
              <div class="bottom">全球受众</div>
            </div>
          </span>
        </div>
      </div>
      <div class="main_box">
        <div class="main_top">
          <div class="main_top_title1">SERVICE</div>
          <div class="main_top_title">服务-<em>项目汇总</em></div>
        </div>
        <div class="card_list">
          <div class="card_box">
            <div class="card_img">
              <img src="@/assets/ywHome/Articles.png" alt="" srcset="" />
            </div>
            <span class="card_title">文章Articles</span>
            <div class="card_content">
              <div class="content_top">品牌传播<em>快速引爆</em></div>
              <div class="content_top" style="margin-top: 17px">
                品牌背书<em>提前预告</em>
              </div>
            </div>
            <div class="card_btn" @click="placeOrder">立即下单</div>
          </div>

          <div class="card_box">
            <div class="card_img">
              <img src="@/assets/ywHome/Deals.png" alt="" srcset="" />
            </div>
            <span class="card_title" style="color: #ef2114">促销Deals</span>
            <div class="card_content">
              <div class="content_top">站外引流<em>季度引流</em></div>
              <div class="content_top" style="margin-top: 17px">
                年度引流<em>标题优化</em>
              </div>
            </div>
            <div class="card_btn" @click="placeOrder">立即下单</div>
          </div>

          <div class="card_box">
            <div class="card_img">
              <img src="@/assets/ywHome/ads.png" alt="" srcset="" />
            </div>
            <span class="card_title" style="color: #f10043">广告栏ads</span>
            <div class="card_content">
              <div class="content_top">提知名度<em>推动排名</em></div>
              <div class="content_top" style="margin-top: 17px">
                营销闭环<em>营收增长</em>
              </div>
            </div>
            <div class="card_btn" @click="placeOrder">立即下单</div>
          </div>

          <div class="card_box">
            <div class="card_img">
              <img src="@/assets/ywHome/imageText.png" alt="" srcset="" />
            </div>
            <span class="card_title" style="color: #f23f71">图文开箱</span>
            <div class="card_content">
              <div class="content_top">扩影响力<em>创意营销</em></div>
              <div class="content_top" style="margin-top: 17px">
                品牌背书<em>提前预告</em>
              </div>
            </div>
            <div class="card_btn" @click="placeOrder">立即下单</div>
          </div>

          <div class="card_box">
            <div class="card_img">
              <img src="@/assets/ywHome/homeShow.png" alt="" srcset="" />
            </div>
            <span class="card_title" style="color: #4351e6">买家秀</span>
            <div class="card_content">
              <div class="content_top">视频营销<em>打造爆款</em></div>
              <div class="content_top" style="margin-top: 17px">
                定位群体<em>海外扩张</em>
              </div>
            </div>
            <div class="card_btn" @click="placeOrder">立即下单</div>
          </div>
        </div>
      </div>
      <div class="footer_box">
        <div class="footer_top">
          <div class="footer_top_title">ABOUT US</div>
          <div class="footer_top_title_tow">关于我们</div>
        </div>
        <div class="yw_footer_box">
          <div class="footer_left">
            <img src="@/assets/ywHome/left.png" alt="" />
          </div>
          <div class="footer_right">
            <span class="right_title">
              我们致力于助力中小企业杨帆出海成就不凡！
            </span>
            <div class="right_content">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微企传媒是一家专注从事站外推广的公司，成立于2017年、总部位于深圳、前身为东莞微企通、是值得客户信赖的跨境出海服务，公司成立7年来拥有了百万的媒体资源，涵盖全球200多个国家包含了15大行业品类，在全球有30多亿的受众群体，我们凭借着专业的服务团队引领跨境出海海外推广行业服务标准、已累计服务超过1000家的国内一线品牌及企业、我们基于电子商务业多年的深挖，开拓全面的服务产品体系，微企传媒为出海企业提供全面、多元、精准的行业解决方案，助力企业获得海外成功，建立全球品牌。作为中国企业，我们更了解中国客户需求，同时依靠丰富的专业知识，独有的媒体资源优势，降低运营成本，为客户提供性价比极高的推广解决方案。
            </div>
            <div class="right_content1">
              我们立志于帮助100万家跨境电商企业海外推广成就中国品牌走向世界的使命，我们希望成为中国一流的海外推广服务商
              我们以成就客户 ·品质至上创新高效诚信求实为企业价值观。
            </div>
            <span class="right_title">联系我们</span>
            <div class="bottom_box">
              <div>
                联系电话：<span style="margin-right: 22px">13825758486</span>
                Email：<span>support@vqcm.com</span>
              </div>
              <div style="margin-top: 20px">
                公司地址：
                <span> 深圳市龙岗区园山街道保安社区马五路1号2栋301-B037 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <YwFloat v-if="route.path !== '/'" />
    <Footer />
    <!-- 回到顶部  -->
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<style lang="scss" scoped>
.display_page {
  .main {
    width: 1400px;
    margin-left: auto;
    margin-right: auto;
    img {
      width: 100%;
      height: 100%;
    }
    .header_box {
      width: 100%;
      height: 400px;
      border-radius: 4px;
      padding-top: 65px;
      position: relative;
      margin-bottom: 125px;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.12) 2px 0 12px 0;
      background: url('@/assets/ywHome/header.png') no-repeat 100%/100%;
      .header_title {
        width: 600px;
        height: 39px;
        margin: 0 auto;
        margin-bottom: 29px;
      }
      .header_content {
        width: 297px;
        height: 42px;
        color: #fff;
        margin: 0 auto;
        font-size: 20px;
        position: relative;
        line-height: 40px;
        padding-left: 21px;
        border-radius: 100px;
        border: 1px solid #fff;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        span {
          position: absolute;
          width: 186px;
          height: 42px;
          color: #6467ea;
          top: -1px;
          right: -1px;
          text-align: center;
          display: inline-block;
          background-color: #fff;
          border-radius: 100px 100px 100px 0;
          box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        }
      }
      .header_bottom {
        position: absolute;
        width: 646px;
        height: 107px;
        left: 378px;
        display: flex;
        bottom: -78px;
        border-radius: 8px;
        background-color: #f8f8f8;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
        .header_left {
          width: 107px;
          height: 107px;
          color: #f8f8f8;
          font-size: 24px;
          line-height: 35px;
          font-weight: bold;
          display: inline-block;
          padding: 18px 25px 0 34px;
          background-color: #52b9fc;
          border-radius: 8px 0 0 8px;
        }
        .header_right {
          width: 539px;
          height: 107px;
          padding-top: 29px;
          display: flex;
          padding: 0 53px;
          align-items: center;
          justify-content: space-between;
          border-radius: 0 8px 8px 0;
          .right_box {
            display: flex;
            line-height: 1;
            align-items: center;
            flex-direction: column;
            .top {
              color: #111;
              font-size: 24px;
              margin-bottom: 22px;
            }
            .bottom {
              color: #555;
              font-size: 16px;
            }
          }
        }
      }
    }

    .main_box {
      width: 100%;
      height: 473px;
      margin-bottom: 19px;
      .main_top {
        color: #000;
        width: 486px;
        height: 54px;
        margin: 0 auto;
        font-size: 48px;
        position: relative;
        margin-bottom: 48px;
        background: url('@/assets/ywHome/bgcTop.png') no-repeat 100%/100%;
        .main_top_title1 {
          width: 201px;
          position: absolute;
          color: #e0e3f9;
          left: 167px;
          top: -28px;
          font-size: 48px;
          font-weight: bold;
        }
        .main_top_title {
          font-weight: bold;
          position: absolute;
          left: 89px;
          top: -10px;
          em {
            font-weight: bold;
            color: #4351e6;
          }
        }
      }
      .card_list {
        width: 100%;
        display: flex;
        height: 371px;
        align-items: center;
        justify-content: space-between;
        .card_box {
          width: 262px;
          height: 371px;
          background: #fff;
          padding: 36px 38px 0;
          border-radius: 8px;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
          .card_img {
            width: 64px;
            height: 64px;
            margin: 0 auto;
            margin-bottom: 24px;
          }
          .card_title {
            width: 100%;
            color: #f27112;
            font-size: 26px;
            font-weight: bold;
            text-align: center;
            display: inline-block;
          }
          .card_content {
            margin-top: 30px;
            margin-bottom: 67px;
            .content_top {
              color: #555;
              font-size: 18px;
              em {
                margin-left: 42px;
              }
            }
          }
          .card_btn {
            width: 100%;
            color: #4351e6;
            font-size: 20px;
            cursor: pointer;
            text-align: center;
          }
        }
      }
    }

    .footer_box {
      width: 100%;
      height: 651px;
      margin-top: 26px;
      background: #fff;
      padding-top: 48px;
      border-radius: 4px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      .footer_top {
        width: 486px;
        height: 54px;
        margin: 0 auto;
        font-size: 48px;
        position: relative;
        background: url('@/assets/ywHome/bgcTop.png') no-repeat 100%/100%;
        .footer_top_title {
          width: 256px;
          position: absolute;
          font-weight: bold;
          color: #e0e3f9;
          left: 95px;
          top: -38px;
        }
        .footer_top_title_tow {
          font-weight: bold;
          position: absolute;
          color: #4351e6;
          top: -10px;
          left: 149px;
        }
      }
      .yw_footer_box {
        display: flex;
        .footer_left {
          width: 478px;
          height: 366px;
          margin: 36px 78px 0 33px;
        }
        .footer_right {
          width: 744px;
          margin-top: 37px;
          .right_title {
            color: #111;
            font-size: 18px;
            font-weight: bold;
          }
          .right_content {
            color: #555;
            font-size: 14px;
            margin-top: 20px;
            line-height: 40px;
          }
          .right_content1 {
            color: #555;
            font-size: 14px;
            margin-top: 5px;
            line-height: 40px;
            margin-bottom: 10px;
          }
          .bottom_box {
            color: #555;
            font-size: 14px;
            margin-top: 26px;
          }
        }
      }
    }
  }
}
</style>
