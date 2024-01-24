<template>
  <div class="invoicing_content">
    <div class="invoicing_nav">
      <span :class="[num === '1' ? 'active' : '']" @click="handleChange('1')"
        >开具发票</span
      >
      <span :class="[num === '2' ? 'active' : '']" @click="handleChange('2')"
        >开票记录</span
      >
      <span :class="[num === '3' ? 'active' : '']" @click="handleChange('3')"
        >发票抬头</span
      >
    </div>
    <IssueInvoice
      @handleReturn="handleLinkRecords"
      v-if="num === '1'"
    ></IssueInvoice>
    <InvoicingRecords v-if="num === '2'"></InvoicingRecords>
    <InvoiceUp v-if="num === '3'"></InvoiceUp>
  </div>
</template>
<script lang="ts" setup>
import IssueInvoice from './components/issueInvoice.vue'
import InvoicingRecords from './components/invoicingRecords.vue'
import InvoiceUp from './components/invoiceUp.vue'
const num = ref('1')
const handleChange = (value: any) => {
  num.value = value
}
const handleLinkRecords = (index: any) => {
  num.value = index
  console.log(num.value)
}
</script>
<style lang="scss" scoped>
.invoicing_content {
  font-size: 14px;

  .invoicing_nav {
    height: 49px;
    border-bottom: 1px solid #ebedf0;

    span {
      height: 100%;
      height: 48px;
      color: #555;
      margin: 0 20px;
      cursor: pointer;
      line-height: 49px;
      display: inline-block;
    }

    .active {
      color: #098d72;
      border-bottom: 2px solid #098d72;
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
</style>
