<template>
  <div class="issue_order">
    <div class="issue_order_date">
      <div class="issue_order_date_picker">
        <!--     :disabledDate="disabledDateFn" -->
        <!-- <el-date-picker
          v-model="makeDate"
          @change="makeDatePicker"
          type="date"
          placeholder="请选择日期"
          :size="size"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :disabledDate="disabledDateFn"
          class="issue_order_date_picker"
        /> -->
        <a-date-picker
          :disabled-date="disabledDate"
          v-model:value="makeDate"
          placeholder="请选择日期"
          valueFormat="YYYY-MM-DD"
        />
      </div>
      <span class="make_date" @click="handleMakeDate">预约发布时间</span>
    </div>
    <div class="friendly_reminder">
      温馨提醒：预约日期为代发人给管理员发送折扣信息日期，并非代表帖子链接发布日期。且订单未到达指定预约日期前，代发人都无法接单
    </div>
    <div class="issue_divider"></div>
    <div class="issue_order_content">
      <div class="issue_order_list">
        <div class="list_date">
          <span v-if="props.orderObj.startTime">
            预约发布时间： {{ cutDate(props.orderObj.startTime) }}
          </span>
        </div>
        <draggable
          group="itxst"
          v-model="tagsObj.tags"
          :list="tagsObj.tags"
          animation="300"
          ghostClass="ghost"
          chosenClass="chosen"
          @start="onStart1"
          @end="onEnd1"
          item-key="id"
          class="order_details"
        >
          <template #item="{ element }">
            <li class="details_content">
              <div class="details_img">
                <img :src="element.mediumPic" />
              </div>
              <div class="details_text">
                <span class="text_name">{{ element.resourceName }}</span>
                <div class="details_pirce" v-if="element.promId !== 3">
                  <span v-if="userStore.userInfo.userType === 0">
                    <em>￥{{ element.price }}</em>
                  </span>
                  <span v-if="userStore.userInfo.userType === 1">
                    <em>￥{{ element.memberPrice }}</em>
                  </span>
                </div>
                <div class="details_pirce" v-if="element.promId === 3">
                  <span v-if="props.orderObj.articleType === 0">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.price }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.memberPrice }}
                    </em>
                  </span>
                  <span v-if="props.orderObj.articleType === 1">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.originalGhostwritingPrice }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.ghostwritingPrice }}
                    </em>
                  </span>
                </div>
                <p class="details_introduce">
                  {{ element.resourceDes }}
                </p>
              </div>
            </li>
          </template>
        </draggable>
      </div>
      <!-- 循环 -->
      <div v-if="arrDate1" class="issue_order_list">
        <div class="list_date active_list_date">
          <span>预约发布时间：{{ arrDate1 }}</span>
          <el-popover
            placement="left"
            :width="200"
            trigger="hover"
            content="删除后，该时间点的数据将默认回到第一个时间点"
          >
            <template #reference>
              <span class="active_delete" @click="handleArrDate1">删除</span>
            </template>
          </el-popover>
        </div>
        <draggable
          group="itxst"
          v-model="tagsObj.tags1"
          :list="tagsObj.tags1"
          animation="300"
          ghostClass="ghost"
          dragClass="drag"
          chosenClass="chosen"
          @start="onStart2"
          @end="onEnd2"
          item-key="id"
          class="order_details"
        >
          <template #item="{ element }">
            <li class="details_content">
              <div class="details_img">
                <img :src="element.mediumPic" />
              </div>
              <div class="details_text">
                <span class="text_name">{{ element.resourceName }}</span>
                <div class="details_pirce" v-if="element.promId !== 3">
                  <span v-if="userStore.userInfo.userType === 0">
                    <em>￥{{ element.price }}</em>
                  </span>
                  <span v-if="userStore.userInfo.userType === 1">
                    <em>￥{{ element.memberPrice }}</em>
                  </span>
                </div>
                <div class="details_pirce" v-if="element.promId === 3">
                  <span v-if="props.orderObj.articleType === 0">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.price }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.memberPrice }}
                    </em>
                  </span>
                  <span v-if="props.orderObj.articleType === 1">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.originalGhostwritingPrice }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.ghostwritingPrice }}
                    </em>
                  </span>
                </div>
                <p class="details_introduce">
                  {{ element.resourceDes }}
                </p>
              </div>
            </li>
          </template>
        </draggable>
      </div>
      <div v-if="arrDate2" class="issue_order_list">
        <div class="list_date active_list_date">
          <span>预约发布时间：{{ arrDate2 }}</span>
          <el-popover
            placement="left"
            :width="200"
            trigger="hover"
            content="删除后，该时间点的数据将默认回到第一个时间点"
          >
            <template #reference>
              <span class="active_delete" @click="handleArrDate2">删除</span>
            </template>
          </el-popover>
        </div>
        <draggable
          group="itxst"
          v-model="tagsObj.tags2"
          :list="tagsObj.tags2"
          animation="300"
          ghostClass="ghost"
          dragClass="drag"
          chosenClass="chosen"
          @start="onStart3"
          @end="onEnd3"
          item-key="id"
          class="order_details"
        >
          <template #item="{ element }">
            <li class="details_content">
              <div class="details_img">
                <img :src="element.mediumPic" />
              </div>
              <div class="details_text">
                <span class="text_name">{{ element.resourceName }}</span>
                <div class="details_pirce" v-if="element.promId !== 3">
                  <span v-if="userStore.userInfo.userType === 0">
                    <em>￥{{ element.price }}</em>
                  </span>
                  <span v-if="userStore.userInfo.userType === 1">
                    <em>￥{{ element.memberPrice }}</em>
                  </span>
                </div>
                <div class="details_pirce" v-if="element.promId === 3">
                  <span v-if="props.orderObj.articleType === 0">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.price }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.memberPrice }}
                    </em>
                  </span>
                  <span v-if="props.orderObj.articleType === 1">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.originalGhostwritingPrice }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.ghostwritingPrice }}
                    </em>
                  </span>
                </div>
                <p class="details_introduce">
                  {{ element.resourceDes }}
                </p>
              </div>
            </li>
          </template>
        </draggable>
      </div>
      <div v-if="arrDate3" class="issue_order_list">
        <div class="list_date active_list_date">
          <span>预约发布时间：{{ arrDate3 }}</span>
          <el-popover
            placement="left"
            :width="200"
            trigger="hover"
            content="删除后，该时间点的数据将默认回到第一个时间点"
          >
            <template #reference>
              <span class="active_delete" @click="handleArrDate3">删除</span>
            </template>
          </el-popover>
        </div>
        <draggable
          group="itxst"
          v-model="tagsObj.tags3"
          :list="tagsObj.tags3"
          animation="300"
          ghostClass="ghost"
          dragClass="drag"
          chosenClass="chosen"
          @start="onStart4"
          @end="onEnd4"
          item-key="id"
          class="order_details"
        >
          <template #item="{ element }">
            <li class="details_content">
              <div class="details_img">
                <img :src="element.mediumPic" />
              </div>
              <div class="details_text">
                <span class="text_name">{{ element.resourceName }}</span>
                <div class="details_pirce" v-if="element.promId !== 3">
                  <span v-if="userStore.userInfo.userType === 0">
                    <em>￥{{ element.price }}</em>
                  </span>
                  <span v-if="userStore.userInfo.userType === 1">
                    <em>￥{{ element.memberPrice }}</em>
                  </span>
                </div>
                <div class="details_pirce" v-if="element.promId === 3">
                  <span v-if="props.orderObj.articleType === 0">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.price }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.memberPrice }}
                    </em>
                  </span>
                  <span v-if="props.orderObj.articleType === 1">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.originalGhostwritingPrice }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.ghostwritingPrice }}
                    </em>
                  </span>
                </div>
                <p class="details_introduce">
                  {{ element.resourceDes }}
                </p>
              </div>
            </li>
          </template>
        </draggable>
      </div>
      <div v-if="arrDate4" class="issue_order_list">
        <div class="list_date active_list_date">
          <span>预约发布时间：{{ arrDate4 }}</span>
          <el-popover
            placement="left"
            :width="200"
            trigger="hover"
            content="删除后，该时间点的数据将默认回到第一个时间点"
          >
            <template #reference>
              <span class="active_delete" @click="handleArrDate4">删除</span>
            </template>
          </el-popover>
        </div>
        <draggable
          group="itxst"
          v-model="tagsObj.tags4"
          :list="tagsObj.tags4"
          animation="300"
          ghostClass="ghost"
          dragClass="drag"
          chosenClass="chosen"
          @start="onStart5"
          @end="onEnd5"
          item-key="id"
          class="order_details"
        >
          <template #item="{ element }">
            <li class="details_content">
              <div class="details_img">
                <img :src="element.mediumPic" />
              </div>
              <div class="details_text">
                <span class="text_name">{{ element.resourceName }}</span>
                <div class="details_pirce" v-if="element.promId !== 3">
                  <span v-if="userStore.userInfo.userType === 0">
                    <em>￥{{ element.price }}</em>
                  </span>
                  <span v-if="userStore.userInfo.userType === 1">
                    <em>￥{{ element.memberPrice }}</em>
                  </span>
                </div>
                <div class="details_pirce" v-if="element.promId === 3">
                  <span v-if="props.orderObj.articleType === 0">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.price }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.memberPrice }}
                    </em>
                  </span>
                  <span v-if="props.orderObj.articleType === 1">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.originalGhostwritingPrice }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.ghostwritingPrice }}
                    </em>
                  </span>
                </div>
                <p class="details_introduce">
                  {{ element.resourceDes }}
                </p>
              </div>
            </li>
          </template>
        </draggable>
      </div>
      <div v-if="arrDate5" class="issue_order_list">
        <div class="list_date active_list_date">
          <span>预约发布时间：{{ arrDate5 }}</span>
          <el-popover
            placement="left"
            :width="200"
            trigger="hover"
            content="删除后，该时间点的数据将默认回到第一个时间点"
          >
            <template #reference>
              <span class="active_delete" @click="handleArrDate5">删除</span>
            </template>
          </el-popover>
        </div>
        <draggable
          group="itxst"
          v-model="tagsObj.tags5"
          :list="tagsObj.tags5"
          animation="300"
          ghostClass="ghost"
          dragClass="drag"
          chosenClass="chosen"
          @start="onStart6"
          @end="onEnd6"
          item-key="id"
          class="order_details"
        >
          <template #item="{ element }">
            <li class="details_content">
              <div class="details_img">
                <img :src="element.mediumPic" />
              </div>
              <div class="details_text">
                <span class="text_name">{{ element.resourceName }}</span>
                <div class="details_pirce" v-if="element.promId !== 3">
                  <span v-if="userStore.userInfo.userType === 0">
                    <em>￥{{ element.price }}</em>
                  </span>
                  <span v-if="userStore.userInfo.userType === 1">
                    <em>￥{{ element.memberPrice }}</em>
                  </span>
                </div>
                <div class="details_pirce" v-if="element.promId === 3">
                  <span v-if="props.orderObj.articleType === 0">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.price }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.memberPrice }}
                    </em>
                  </span>
                  <span v-if="props.orderObj.articleType === 1">
                    <em v-if="userStore.userInfo.userType === 0">
                      ￥{{ element.originalGhostwritingPrice }}
                    </em>
                    <em v-if="userStore.userInfo.userType === 1">
                      ￥{{ element.ghostwritingPrice }}
                    </em>
                  </span>
                </div>
                <p class="details_introduce">
                  {{ element.resourceDes }}
                </p>
              </div>
            </li>
          </template>
        </draggable>
      </div>
      <!-- 循环 -->
    </div>
    <div class="issue_order_footer">
      <div class="total_pirce">
        <span v-if="props.orderObj">
          总费用 ￥{{ props.orderObj.totalAmount }}
        </span>
      </div>
      <div class="footer_botton">
        <span
          v-loading.fullscreen.lock="fullscreenLoading"
          class="submit pointer"
          @click="submitOrder"
          >提交</span
        >
        <span class="return_up pointer" @click="returnUpStep">返回上一步</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import draggable from 'vuedraggable'
import { useUserStore } from '@/stores'
import { submitOmsOrder } from '@/api/order'
const router = useRouter()
//接收父組件傳過來的值
const props = defineProps({
  orderObj: {
    type: Object,
    default: {}
  }
})
const size = ref<'default' | 'large' | 'small'>('default')
const userStore = useUserStore()
const makeDate = ref<any>('')
const arrDate = ref<any>([])
const drag = ref<boolean>(false)
const arrDate1 = ref<any>()
const arrDate2 = ref<any>()
const arrDate3 = ref<any>()
const arrDate4 = ref<any>()
const arrDate5 = ref<any>()
const fullscreenLoading = ref(false)
console.log(props.orderObj)
const handleMakeDate = () => {
  if (arrDate.value.length > 4) {
    ElMessage.error('预约发布时间不能超过五个')
    return
  }
  if (makeDate.value) {
    arrDate.value.push({ date: makeDate.value })
  }
  makeDate.value = ''
  arrDate1.value = arrDate.value[0]?.date
  arrDate2.value = arrDate.value[1]?.date
  arrDate3.value = arrDate.value[2]?.date
  arrDate4.value = arrDate.value[3]?.date
  arrDate5.value = arrDate.value[4]?.date
  // console.log(arrDate1.value)
}
const cutDate = (val: any) => {
  return val.substring(0, 10)
}
//控制时间
// const disabledDateFn = (time: any) => {
// return time.getTime() < Date.now() - 8.64e7
// 定义禁止选择的时间范围
//   let start: any = new Date(props.orderObj.startTime).getTime()
//   let end: any = new Date(props.orderObj.endTime).getTime()
//   if (props.orderObj.promId === 7 || props.orderObj.promId === 6) {
//     return time.getTime() < Date.now() - 8.64e7
//   } else {
//     return time.getTime() < start - 8.64e7 || time.getTime() > end
//   }
// }

const disabledDate = (current: any) => {
  if (props.orderObj.promId === 7 || props.orderObj.promId === 6) {
    return current < Date.now() - 8.64e7
  } else {
    return (
      current < dayjs(props.orderObj.startTime).startOf('day') ||
      current > dayjs(props.orderObj.endTime).endOf('day')
    )
  }
}
//拖拽结束事件
interface useInfoModel {
  tags: never[]
  tags1: never[]
  tags2: never[]
  tags3: never[]
  tags4: never[]
  tags5: never[]
}
const tagsObj = reactive<useInfoModel>({
  tags: props.orderObj?.orderItems,
  tags1: [],
  tags2: [],
  tags3: [],
  tags4: [],
  tags5: []
})
const onStart1 = () => {
  drag.value = true
}
const onEnd1 = () => {
  drag.value = false
}
const onStart2 = () => {
  drag.value = true
}
const onEnd2 = () => {
  drag.value = false
}
const onStart3 = () => {
  drag.value = true
}
const onEnd3 = () => {
  drag.value = false
}
const onStart4 = () => {
  drag.value = true
}
const onEnd4 = () => {
  drag.value = false
}
const onStart5 = () => {
  drag.value = true
}
const onEnd5 = () => {
  drag.value = false
}
const onStart6 = () => {
  drag.value = true
}
const onEnd6 = () => {
  drag.value = false
}
const emit = defineEmits(['returnUpStepOrder', 'nextIssueOrder'])
const returnUpStep = () => {
  emit('returnUpStepOrder', 2)
}
const handleArrDate1 = () => {
  tagsObj.tags = [...new Set([...tagsObj.tags, ...tagsObj.tags1])]
  tagsObj.tags1 = []
  arrDate.value.pop()
  console.log(tagsObj.tags)
  arrDate1.value = ''
}
const handleArrDate2 = () => {
  tagsObj.tags = [...new Set([...tagsObj.tags, ...tagsObj.tags2])]
  tagsObj.tags2 = []
  arrDate.value.pop()
  console.log(tagsObj.tags)
  arrDate2.value = ''
}
const handleArrDate3 = () => {
  tagsObj.tags = [...new Set([...tagsObj.tags, ...tagsObj.tags3])]
  tagsObj.tags3 = []
  arrDate.value.pop()
  arrDate3.value = ''
}
const handleArrDate4 = () => {
  tagsObj.tags = [...new Set([...tagsObj.tags, ...tagsObj.tags4])]
  tagsObj.tags4 = []
  arrDate.value.pop()
  arrDate4.value = ''
}
const handleArrDate5 = () => {
  tagsObj.tags = [...new Set([...tagsObj.tags, ...tagsObj.tags5])]
  tagsObj.tags5 = []
  arrDate.value.pop()
  arrDate5.value = ''
}
const submitOrder = async () => {
  const data = props.orderObj
  let arr0 = []
  let arr1 = []
  let arr2 = []
  let arr3 = []
  let arr4 = []
  let arr5 = []
  if (tagsObj.tags.length > 0) {
    arr0 = filtration(tagsObj.tags, props.orderObj.startTime)
  }
  if (tagsObj.tags1.length > 0) {
    arr1 = filtration(tagsObj.tags1, arrDate1.value)
  }
  if (tagsObj.tags2.length > 0) {
    arr2 = filtration(tagsObj.tags2, arrDate2.value)
  }
  if (tagsObj.tags3.length > 0) {
    arr3 = filtration(tagsObj.tags3, arrDate3.value)
  }
  if (tagsObj.tags4.length > 0) {
    arr4 = filtration(tagsObj.tags4, arrDate4.value)
  }
  if (tagsObj.tags5.length > 0) {
    arr5 = filtration(tagsObj.tags5, arrDate5.value)
  }
  console.log(arr0, arr1, arr2, arr3, arr4, arr5)
  data.orderItems = [
    ...new Set([...tagsObj.tags, ...arr1, ...arr2, ...arr3, ...arr4, ...arr5])
  ]
  fullscreenLoading.value = true
  await submitOmsOrder(data)
    .then(() => {
      if (data.promId === 6 || data.promId === 7) {
        router.push({ name: 'PersonalCen', state: { orderNum: '2-2' } })
      } else {
        router.push({ name: 'PersonalCen', state: { orderNum: '2-1' } })
      }
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 500)
    })
    .catch(() => {
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 500)
    })
}
// TODO:
const filtration = (array: any, arrDate: any) => {
  let userType = userStore.userInfo.userType === 0 ? false : true
  let articleType
  if (props.orderObj.articleType) {
    articleType = props.orderObj.articleType === 0 ? false : true
  } else {
    articleType = false
  }
  for (const item of array) {
    item.appointmentReleaseTime = arrDate
    item.orderType = item.promId
    item.resourceId = item.id
    item.memberId = props.orderObj.memberId
    if (userType) {
      item.totalAmount = articleType ? item.ghostwritingPrice : item.memberPrice
    } else {
      item.totalAmount = articleType
        ? item.originalGhostwritingPrice
        : item.price
    }
  }
  return array
}
</script>
<style lang="scss" scoped>
.issue_order {
  width: 1400px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  margin-top: 16px;
  padding: 24px 15px;
  .issue_order_date {
    display: flex;
    align-items: center;
    .issue_order_date_picker {
      width: 368px;
      :deep(.ant-picker) {
        width: 368px;
      }
    }
    .make_date {
      width: 276px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #fff;
      background: #098d72;
      border-radius: 4px;
      font-size: 14px;
      margin-left: 20px;
    }
  }
  .friendly_reminder {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  .issue_divider {
    height: 0px;
    border-bottom: 1px dashed rgba(9, 141, 114, 0.5);
    margin-top: 24px;
  }
  .issue_order_list {
    padding: 24px 0;
    border-bottom: 1px dashed rgba(9, 141, 114, 0.5);
    .list_date {
      color: #111;
      span {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .active_list_date {
      display: flex;
      justify-content: space-between;
      .active_delete {
        color: #555;
        font-size: 12px;
        margin-right: 24px;
      }
    }
    .order_details {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      .details_content {
        padding: 24px;
        width: 320px;
        margin-top: 6px;
        border-radius: 4px;
        border: 1px solid #dcdee0;
        display: flex;
        margin-right: 22px;
        // display: inline-block;
        font-size: 14px;
        .details_img {
          img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
          }
        }
        .details_text {
          margin-left: 16px;
          span {
            display: block;
          }
          .text_name {
            max-width: 180px;
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
          }
          .details_pirce {
            margin-top: 14px;
            color: #f3294d;
          }
          .details_introduce {
            margin-top: 24px;
            width: 210px;
            color: #555;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
  }
  .issue_order_footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 19px;
    .total_pirce {
      color: #111111;
      width: 276px;
      border-bottom: 1px solid #ebedf0;
      text-align: center;
      padding: 16px 0;
      span {
        font-weight: bold;
      }
    }
    .footer_botton {
      margin-top: 16px;
      display: flex;
      .submit {
        width: 276px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #098d72;
        border-radius: 4px;
        color: #fff;
        display: inline-block;
      }
      .return_up {
        width: 276px;
        height: 32px;
        background: #ffffff;
        border-radius: 4px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #098d72;
        color: #098d72;
        display: inline-block;
        margin-left: 16px;
      }
    }
  }
}
</style>
