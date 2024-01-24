<template>
  <div class="issue_invoice">
    <div class="invoicing_pirce">
      <span>可开票总金额：</span>
      <em>￥{{ totalMoney }}</em>
      <i class="pointer" @click="invoiceDialogVisible = true">开票须知</i>
    </div>
    <div class="invoicing_process">
      <div>
        <span>开票流程：</span>
      </div>
      <div class="invoicing_step">
        <span
          class="step_location"
          :class="[
            active === '0' || active === '1' || active === '2'
              ? 'active_step'
              : ''
          ]"
        >
          <em>1</em>选择支付记录</span
        >
        <span
          class="step_line"
          :class="[active === '1' || active === '2' ? 'active_line' : '']"
        >
        </span>
        <span
          class="step_location"
          :class="[active === '1' || active === '2' ? 'active_step' : '']"
        >
          <em>2</em>选择抬头</span
        >
        <span class="step_line" :class="[active === '2' ? 'active_line' : '']">
        </span>
        <span
          class="step_location"
          :class="[active === '2' ? 'active_step' : '']"
        >
          <em>3</em>
          提交
        </span>
      </div>
    </div>
    <div v-show="step === '1'" class="pay_content">
      <div class="pay_date">
        <div class="">
          <el-select
            v-model="params.type"
            class="m-2"
            placeholder=""
            @change="handleChange"
          >
            <el-option label="购买会员" :value="0" />
            <el-option label="订单支付" :value="1" />
          </el-select>
        </div>
        <div class="pay_date_surface">
          <span>支付时间：</span>
          <el-date-picker
            type="daterange"
            @change="handleDatePicker"
            v-model="date_picker"
            range-separator="-"
            :clearable="false"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </div>
        <div v-if="params.type === 1">
          <el-input
            type="text"
            v-model="params.mediaName"
            placeholder="媒体名称"
            clearable
            style="width: 177px;"
            class="order_input_pl"
            @keyup.enter.native="handleSearch"
          />
        </div>
        <span class="to_invoicing pointer" @click="handleSearch">搜索</span>
        <span class="to_invoicing pointer" @click="handleInvoicing">
          去开票
        </span>
        <span class="to_invoicing pointer" @click="handleReset"> 重置 </span>
      </div>
      <div class="invoicing_table">
        <el-table
          ref="multipleTableRef"
          :data="issueInvoiceData"
          :row-key="(row:any) => row.id"
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            background: 'rgba(9, 141, 114, 0.05)',
            color: '#111'
          }"
          style="width: 100%"
        >
          <el-table-column
            :reserve-selection="true"
            type="selection"
            width="55"
          />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column label="媒体" v-if="params.type === 1">
            <template #default="{ row }">
              <div>{{ row.mediaName }}</div>
              <div>{{ row.mediaId }}</div>
            </template>
          </el-table-column>
          <el-table-column label="产品" width="280px">
            <template #default="scope">
              <span class="invoicing_table_resource">
                {{ params.type === 1 ? scope.row.resourceTitle : '购买会员' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="totalAmount" label="费用" />
          <el-table-column prop="resourceName" label="资源" />
        </el-table>
        <div style="margin-top: 20px">
          <!-- <el-button @click="toggleSelection(multipleSelection)">
            Toggle selection status of second and third rows
          </el-button> -->
          <el-button @click="toggleSelection()">
            清空选项查询所有开票记录
          </el-button>
        </div>
        <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="params.pageNum"
          v-model:limit="params.pageSize"
          layout="total, prev, pager, next, jumper"
          @pagination="getListUserPage"
        />
      </div>
    </div>
    <div v-show="step === '2'" class="next_step">
      <div class="next_step_submit">
        <span
          v-loading.fullscreen.lock="fullscreenLoading"
          class="submit pointer"
          @click="handleSubmit"
          >提交</span
        >
        <span class="previous pointer" @click="handlePrevious">上一步</span>
      </div>
      <div class="next_step_list">
        <div class="list_nav">
          <span class="list_nav_selete">选择</span>
          <span>发票抬头</span>
          <span>类型</span>
          <span>社会统一代码</span>
          <span>接受方式</span>
          <!-- <span>发票类型</span> -->
        </div>
        <div class="next_step_list_content">
          <el-radio-group v-model="radio" class="next_step_radio">
            <el-radio
              v-for="item in invoiceList"
              :key="item.id"
              :label="item.id"
              @click="handleSelRadio(item)"
              class="list_content"
            >
              <span class="list_content_span"
                >{{ item.type === 1 ? item.companyName : item.userName }}
              </span>
              <span class="list_content_span">
                {{ item.type === 1 ? '企业' : '个人' }}
              </span>
              <span class="list_content_span">
                {{ item.type === 1 ? item.succ : item.idNumber }}
              </span>
              <span class="list_content_span">{{ item.email }}</span>
              <!-- <span class="list_content_span">{{ item.name }}</span> -->
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <el-dialog v-model="invoiceDialogVisible" title="开票须知" width="360">
      <div class="warmth_remind">
        <p>1、确认订单后才可以进行开发票</p>
        <p>2、会员费用开票时，低于300不可以开票</p>
        <p>3、订单开票时，低于3000不可开票</p>
        <p>4、不同的媒体不可以一起开票</p>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ElTable } from 'element-plus'
import {
  ableInvoiceRecord,
  getInvoiceTitle,
  invoiceAdd
} from '@/api/accountCenter'
import { useUserStore } from '@/stores'
import type { issueInvoiceApi } from '@/types/account'
const userStore = useUserStore()
const invoiceDialogVisible = ref<boolean>(false)
const active = ref('0')
const radio = ref('')
const step = ref('1')
const date_picker = ref<any>('')
const total = ref<number>(0)
const totalMoney = ref()
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<any>([])
const issueInvoiceData = ref<any>()
const invoiceList = ref<any>([])
const fullscreenLoading = ref(false)
const titleId = ref<any>(undefined)
const totalPirce = ref<any>()
const params = reactive<issueInvoiceApi>({
  pageNum: 1,
  pageSize: 7,
  startTime: '',
  endTime: '',
  mediaName: undefined,
  type: 1,
  createId: undefined
})

const toggleSelection = () => {
  multipleTableRef.value!.clearSelection()
  // params.createId = undefined
  // params.pageNum = 1
  // getListUserPage()
}
const handleDatePicker = (time: any) => {
  if (time) {
    time[1] = time[1].substr(0, 10) + ' 23:59:59'
  }
}
const handleSelectionChange = (val: []) => {
  multipleSelection.value = val
  console.log(val)
  if (params.type === 0) {
    return false
  }
  if (multipleSelection.value.length > 0) {
    params.createId = multipleSelection.value[0].createId
  } else {
    params.createId = undefined
    params.pageNum = 1
  }
  if (multipleSelection.value.length > 1) {
  } else {
    getListUserPage()
  }
}
const handleSearch = () => {
  params.pageNum = 1
  getListUserPage()
}
const handleReset = () => {
  params.mediaName = undefined
  date_picker.value = ''
  getListUserPage()
}
// 获取抬头id
const handleSelRadio = (val: any) => {
  titleId.value = val.id
}
// 切换开票
const handleChange = () => {
  params.mediaName = params.type === 1 ? params.mediaName : undefined
  params.createId = params.type === 1 ? params.createId : undefined
  params.pageNum = 1
  multipleSelection.value = []
  multipleTableRef.value!.clearSelection()
  getListUserPage()
}
// 去开票限制
const handleInvoicing = () => {
  totalPirce.value = multipleSelection.value
    .reduce((sum: any, item: any) => sum + Number(item.totalAmount), 0)
    .toFixed(2)
  if (params.type === 1) {
    if (totalPirce.value < 3000) {
      ElMessage.error('开票金额不能小于3000')
      return
    }
  } else {
    if (totalPirce.value < 300) {
      ElMessage.error('开票金额不能小于300')
      return
    }
  }
  getListInvoiceUp()
  active.value = '1'
  step.value = '2'
}
// 返回上一步
const handlePrevious = () => {
  active.value = '0'
  step.value = '1'
}
//提交开票
const handleSubmit = async () => {
  if (!titleId.value) {
    ElMessage.error('请选择发票抬头!')
    return
  }
  fullscreenLoading.value = true
  let arrId = multipleSelection.value.map((item: any) => item.id)
  let data: any = {
    id: undefined,
    userId: userStore.userInfo?.userId,
    createId: params.createId,
    money: totalPirce.value,
    remark: '',
    titleId: titleId.value,
    recordType: params.type,
    detailIdList: arrId
  }
  await invoiceAdd(data)
    .then(() => {
      ElMessage({
        message: '开票成功!',
        type: 'success'
      })
      handleReturn()
      fullscreenLoading.value = false
    })
    .catch(() => {
      fullscreenLoading.value = false
    })
}
// 获取能开票的记录
const getListInvoiceUp = async () => {
  const res = await getInvoiceTitle()
  if (res.code === 200) {
    invoiceList.value = res?.data
  }
}
// 获取能开票的记录
const getListUserPage = async () => {
  params.endTime =
    date_picker.value.length > 0 ? date_picker.value[1] : undefined
  params.startTime =
    date_picker.value.length > 0 ? date_picker.value[0] : undefined
  const res = await ableInvoiceRecord(params)
  if (res.code == 200) {
    issueInvoiceData.value = res.data.records ? res.data.records : []
    console.log(issueInvoiceData.value)
    total.value = res.data.total ? res.data.total : 0
    totalMoney.value = res.data.totalMoney ? res.data.totalMoney : 0
  }
}
const emit = defineEmits()
const handleReturn = () => {
  emit('handleReturn', '2')
}
getListUserPage()
</script>
<style lang="scss" scoped>
.issue_invoice {
  .invoicing_input {
    padding: 0 20px;
    margin-top: 17px;
  }

  .invoicing_pirce {
    margin: 24px 0 0 20px;
    color: #333;

    em {
      margin-left: 10px;
      font-weight: bold;
    }
    i {
      color: #ef6706;
      margin-left: 10px;
    }
  }

  .invoicing_process {
    display: flex;
    margin: 24px 0 0 20px;
    align-items: center;

    .invoicing_step {
      margin-left: 24px;
      display: flex;
      align-items: center;

      .step_location {
        color: #989898;

        em {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 50%;
          margin-right: 5px;
          text-align: center;
          background: rgba(152, 152, 152, 0.6);
          color: #fff;
        }
      }

      .active_step {
        color: #098d72;

        em {
          background-color: #098d72;
        }
      }

      .step_line {
        display: inline-block;
        width: 48px;
        height: 2px;
        background: rgba(152, 152, 152, 0.6);
        margin: 0 16px;
      }

      .active_line {
        background: #098d72;
      }
    }
  }

  .pay_content {
    .pay_date {
      margin: 30px 0 0 0px;
      display: flex;
      align-items: center;

      .pay_date_surface {
        display: flex;
        align-items: center;
        // width: 380px;
        margin: 0 10px;
      }

      .to_invoicing {
        margin-left: 10px;
        width: 78px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        background: #098d72;
        border-radius: 4px 4px 4px 4px;
      }
    }

    .invoicing_table {
      margin-top: 24px;
      .invoicing_table_resource {
        width: 230px;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
    }
  }

  .next_step {
    font-size: 14px;

    .next_step_submit {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      margin-top: 24px;
    }

    .previous {
      color: #333;
    }

    .submit {
      width: 78px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #098d72;
      color: #fff;
      border-radius: 4px;
      margin-left: 18px;
    }

    .next_step_list {
      .list_nav {
        width: 100%;
        height: 56px;
        background: rgba(9, 141, 114, 0.05);
        display: flex;
        align-items: center;
        color: #111;
        margin-top: 24px;
        text-align: center;

        .list_nav_selete {
          width: 60px;
        }

        span {
          width: 280px;
          // text-align: center;
        }
      }
    }

    .next_step_list_content {
      .list_content {
        width: 1185px;
        height: 56px;
        background: #fff;
        display: flex;
        align-items: center;
        color: #111;
        text-align: center;
        margin-right: 0;
        border-bottom: 1px solid #ebedf0;

        .list_content_span {
          display: inline-block;
          width: 280px;
          // text-align: center;
        }
      }
    }
  }
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #098d72;
  border-color: #098d72;
}

:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background-color: #098d72;
  border-color: #098d72;
}

:deep(.el-radio__input) {
  margin: 0 23px;
}

:deep(.el-radio__label) {
  padding: 0;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #333;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: #098d72;
  border-color: #098d72;
}
:deep(.el-table__header-wrapper .el-table-column--selection > .cell) {
  display: none;
}
</style>
