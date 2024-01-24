<template>
  <div class="account_list">
    <div class="account_nav">
      <el-form :inline="true">
        <el-form-item label="消费类型">
          <el-select v-model="walletListData.type" placeholder="消费类型">
            <el-option label="退款" value="REFUND" />
            <el-option label="充余额" value="RECHARGE" />
            <el-option label="订单支付" value="ORDER" />
            <el-option label="购买会员" value="BUY_VIP" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="交易状态">
          <el-select placeholder="交易状态">
            <el-option label="全部" value="" />
            <el-option label="交易成功" :value="1" />
            <el-option label="交易失败" :value="2" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="时间" class="account_nav_date">
          <el-date-picker
            v-model="date"
            type="daterange"
            @change="handleDatePicker"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :clearable="false"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="Search"
            class="account_nav_botton"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button
            class="account_nav_botton"
            type="primary"
            @click="resetForm"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="account_list">
      <el-table
        :data="getWalletListData"
        :header-cell-style="{
          background: 'rgba(9, 141, 114, 0.05)',
          color: '#111'
        }"
        height="650"
        style="width: 100%"
      >
        <el-table-column prop="recordTypeName" label="类型" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="sourceId" label="交易号" width="380px" />
        <el-table-column prop="amount" label="金额">
          <template #default="scope">
            <div>{{ scope.row.asType }}{{ scope.row.amount }}</div>
          </template>
        </el-table-column>
        <el-table-column label="明细" />
        <el-table-column label="状态" width="120">
          <template #default="scope">
            <span>交易成功</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 1"
        :total="total"
        v-model:page="walletListData.pageNum"
        v-model:limit="walletListData.pageSize"
        @pagination="getInvoiceData"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'
import type { walletListApi } from '@/types/account'
import { walletList } from '@/api/accountCenter'
const userStore = useUserStore()
const date = ref<any>([])
const walletListData = ref<walletListApi>({
  pageNum: 1,
  pageSize: 10,
  startTime: undefined,
  endTime: undefined,
  type: undefined,
  userId: userStore.userInfo.userId
})
const total = ref<number>(0)
const getWalletListData = ref<any>()
const handleQuery = () => {
  getInvoiceData()
}
const handleDatePicker = (time: any) => {
  if (time) {
    time[1] = time[1].substr(0, 10) + ' 23:59:59'
  }
}
const resetForm = () => {
  walletListData.value.type = undefined
  date.value = []
  getInvoiceData()
}
// 查看发票抬头列表
const getInvoiceData = async () => {
  walletListData.value.endTime = date.value.length > 0 ? date.value[1] : ''
  walletListData.value.startTime = date.value.length > 0 ? date.value[0] : ''
  const res = await walletList(walletListData.value)
  if (res.code === 200) {
    getWalletListData.value = res.data?.records
    total.value = res.data?.total
  }
}
getInvoiceData()
</script>
<style lang="scss" scoped>
.account_list {
  :deep(.el-table__inner-wrapper) {
    &::before {
      display: none;
    }
  }
  .account_nav {
    height: 56px;
    margin-top: 17px;
    background: rgb(9, 141, 114, 0.05);
    display: flex;
    align-items: center;
    padding: 0 20px;

    .account_nav_date {
      width: 360px;
    }

    .account_nav_botton {
      background-color: #098d72;
      border: 1px solid #098d72;
    }
  }

  .account_list {
    margin-top: 16px;
  }
}

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
