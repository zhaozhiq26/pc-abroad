<template>
  <div class="invoicing-records">
    <div class="records_table">
      <el-table
        ref="multipleTableRef"
        :data="invoiceList"
        :header-cell-style="{
          background: 'rgba(9, 141, 114, 0.05)',
          color: '#111'
        }"
        style="width: 100%"
      >
        <el-table-column prop="createTime" label="申请时间" width="180px" />
        <el-table-column prop="money" label="发票金额" />
        <el-table-column prop="mediaName" label="开票方" />
        <el-table-column prop="titleUserName" label="发票抬头">
          <template #default="{ row }">
            <div v-if="row.titleCompanyName">{{ row.titleCompanyName }}</div>
            <div v-else>{{ row.titleUserName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="titleEmail" label="接收方式" width="180px" />
        <el-table-column label="状态">
          <template #default="scope">
            <span>{{ BillingStatus[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="{ row }">
            <span
              v-if="row.status === 0"
              class="download"
              @click="handleDownload(row.file)"
            >
              下载
            </span>
            <!-- <a v-if="row.status === 0" :href="row.file" download target="_blank">下载</a> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="params.pageNum"
      v-model:limit="params.pageSize"
      layout="total, prev, pager, next"
      @pagination="getInvoiceData"
    />
  </div>
</template>
<script lang="ts" setup>
import { listByMemberId } from '@/api/accountCenter'
import { BillingStatus } from '@/enums'
import { saveAs } from 'file-saver'
const total = ref<number>(0)
const invoiceList = ref<any>()
const params = reactive<any>({
  pageNum: 1,
  pageSize: 15
})

// 下载发票
const handleDownload = async (file: any) => {
  saveAs(file)
}
// 查看发票抬头列表
const getInvoiceData = async () => {
  const res = await listByMemberId(params)
  if (res.code === 200) {
    console.log(res)
    invoiceList.value = res.data?.records
    total.value = res.data.total ? res.data.total : 0
  }
}
getInvoiceData()
</script>
<style lang="scss" scoped>
.invoicing-records {
  .records_table {
    margin-top: 17px;
  }
}

.download {
  width: 40px;
  color: #098d72;
  cursor: pointer;
  display: inline-block;
}
</style>
