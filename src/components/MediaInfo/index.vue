<template>
  <div class="media-info">
    <el-popover placement="bottom" :width="475" trigger="hover">
      <template #reference>
        <img :src="itemchld.avatar" alt="" class="info_img" />
      </template>
      <div class="personal_info">
        <div class="info_status">
          <div class="info_status_img">
            <img :src="itemchld.avatar" alt="头像" />
          </div>
          <div class="info_content">
            <div class="info_title">
              <span class="info_title_name">
                {{ itemchld.nickName }}
              </span>
              <span class="info_exist">
                <em
                  class="info_exist_status"
                  :class="[itemchld.loginType === 0 ? '' : 'info_exist_active']"
                >
                </em>
                {{ itemchld.loginType === 0 ? '下线' : '在线' }}
              </span>
            </div>
            <div class="info_exist_date">
              <span> 注册时间: {{ itemchld.registerTime }} </span>
            </div>
            <div class="info_exist_score">
              <el-rate
                v-model="itemchld.score"
                disabled
                show-score
                text-color="#111111"
                :colors="['#026853', '#026853', '#026853']"
                score-template="{value} 分"
              />
            </div>
            <div class="info_type">
              <span class="info_type_sf_name">
                <img src="@/assets/img/pair.png" alt="" style="width: 12px" />
                {{ itemchld.sfName }}
              </span>
            </div>
            <div v-if="itemchld.mediaCategoryList" class="info_media_category">
              <span
                v-for="(type, index) in itemchld.mediaCategoryList"
                :key="index"
                v-show="index < 5"
              >
                {{ type.name }}
              </span>
            </div>
            <div v-if="itemchld.mediaTypeList" class="info_media_type">
              <span
                v-for="(type, index) in itemchld.mediaTypeList"
                :key="index"
                v-show="index < 5"
              >
                {{ type.name }}
              </span>
            </div>
            <div class="info_total">
              <!-- <div class="info_total_Orders">
                <span>
                  {{ itemchld.countOrderReceived }}
                </span>
                <span>接单总数量</span>
              </div> -->
              <div class="info_total_Orders">
                <span>
                  {{ itemchld.countResource }}
                </span>
                <span>资源总数量</span>
              </div>
              <div class="info_total_Orders info_total_core">
                <span>
                  {{ itemchld.countComment }}
                </span>
                <span>评论总数量</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
//接收父組件傳過來的值
const props = defineProps({
  itemchld: {
    type: Object,
    default: {}
  }
})
</script>
<style lang="scss" scoped>
.media-info {
  .info_img {
    width: 32px;
    height: 32px;
    border-radius: 28px;
    // margin-right: 16px;
  }
}
.personal_info {
  .info_status {
    display: flex;
    .info_status_img {
      img {
        width: 56px;
        height: 56px;
        border-radius: 28px;
      }
    }
    .info_content {
      margin-left: 11px;
      .info_title {
        display: flex;
        align-items: center;
        .info_title_name {
          font-size: 14px;
          color: #111;
          font-weight: bold;
        }
        .info_exist {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #111;
          margin-top: 3px;
          .info_exist_status {
            display: block;
            width: 8px;
            height: 8px;
            background: #eeeeee;
            border-radius: 50%;
            margin: 0 4px;
          }
          .info_exist_active {
            background: #098d72;
          }
        }
      }
      .info_exist_date {
        span {
          font-size: 12px;
          color: #111;
        }
      }
      .info_exist_score {
        margin-top: -5px;
      }
      .info_type {
        display: flex;
        .info_type_sf_name {
          width: 70px;
          height: 20px;
          background: rgba(2, 104, 83, 0.05);
          border-radius: 4px;
          border: 1px solid #026853;
          color: #026853;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .info_type_media_name {
          height: 20px;
          border: 1px solid #026853;
          background: rgba(2, 104, 83, 0.05);
          color: #026853;
          line-height: 20px;
          border-radius: 4px;
          padding: 0 10px;
          margin-left: 10px;
        }
      }
      .info_media_category {
        display: flex;
        flex-wrap: wrap;
        span {
          padding: 2px 5px;
          border-radius: 4px;
          background: #dddfe4;
          color: #57585a;
          margin-right: 7px;
          font-size: 12px;
          margin-top: 10px;
        }
      }
      .info_media_type {
        display: flex;
        flex-wrap: wrap;
        span {
          padding: 2px 5px;
          background: #fce5bd;
          border-radius: 4px;
          color: #f6a61f;
          margin-right: 7px;
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }
  .info_total {
    display: flex;
    margin-top: 22px;
    font-size: 12px;
    color: #111;
  }
  .info_total_Orders {
    display: flex;
    width: 120px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-right: 1px solid #ebedf0;
    padding: 0 4px;
    span {
      font-weight: bold;
    }
  }
  .info_total_core {
    border-right: 0;
  }
}
</style>
