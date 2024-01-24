<template>
  <div class="invoicing_up">
    <div class="invoicing_up_botton">
      <span @click="addInvoiceUp">添加抬头</span>
    </div>
    <div class="up_table">
      <el-table
        ref="multipleTableRef"
        :data="invoiceList"
        :header-cell-style="{
          background: 'rgba(9, 141, 114, 0.05)',
          color: '#111'
        }"
        style="width: 100%"
      >
        <el-table-column prop="name" label="发票抬头" width="260px">
          <template #default="scope">
            <span>{{
              scope.row.type === 1 ? scope.row.companyName : scope.row.userName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抬头类型" width="240px">
          <template #default="scope">
            <span>{{ scope.row.type === 1 ? '企业' : '个人' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="succ" label="社会统一信用代码" width="240px">
          <template #default="scope">
            <span>{{
              scope.row.type === 1 ? scope.row.succ : scope.row.idNumber
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="接收方式" />
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template #default="scope">
            <span class="download" @click="updateInvoiceUp(scope.row)">
              编辑
            </span>
            <el-divider direction="vertical" />
            <span class="download" @click="handleDelect(scope.row.id)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="invoiceUpVisible"
      :title="invoiceName"
      :close-on-click-modal="false"
      @close="handleEq"
      width="500"
    >
      <div class="comment">
        <el-form
          ref="invoiceUp"
          :model="invoiceForm"
          :rules="invoiceRules"
          label-width="140px"
        >
          <el-form-item prop="type" label="抬头类型">
            <el-radio-group
              v-model="invoiceForm.type"
              prop="type"
              :disabled="idBoolean"
              @change="handleChange"
            >
              <el-radio :label="0">个人/非企业单位</el-radio>
              <el-radio :label="1">企业单位</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 1"
            prop="companyName"
            label="企业名称"
          >
            <el-input
              v-model="invoiceForm.companyName"
              placeholder="请输入企业名称"
            />
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 1"
            prop="succ"
            label="社会统一信用代码"
          >
            <el-input
              v-model="invoiceForm.succ"
              placeholder="请输入社会统一信用代码"
            />
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 0"
            prop="userName"
            label="姓名"
          >
            <el-input v-model="invoiceForm.userName" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 0"
            prop="idNumber"
            label="身份证号"
          >
            <el-input
              v-model="invoiceForm.idNumber"
              placeholder="请输入身份证号"
            />
          </el-form-item>
          <el-form-item prop="email" label="接收方式">
            <el-input
              v-model="invoiceForm.email"
              placeholder="请输入接收电子发票的邮箱"
            />
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 1"
            prop="phone"
            label="电话号码"
          >
            <el-input
              v-model="invoiceForm.phone"
              placeholder="请输入电话号码"
            />
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 1"
            prop="address"
            label="地址"
          >
            <el-input v-model="invoiceForm.address" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 1"
            prop="bank"
            label="开户行"
          >
            <el-input v-model="invoiceForm.bank" placeholder="请输入开户行" />
          </el-form-item>
          <el-form-item
            v-if="invoiceForm.type === 1"
            prop="card"
            label="银行账号"
          >
            <el-input v-model="invoiceForm.card" placeholder="请输入银行账号" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="dialog-footer-close" @click="handleEq">
            取消
          </el-button>
          <el-button
            type="primary"
            class="dialog-footer-confirm"
            @click="handleInvoiceUp(invoiceUp)"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'
import type { invoiceApi } from '@/types/account'
import {
  getInvoiceTitle,
  updateInvoice,
  addInvoice,
  deteleInvoice
} from '@/api/accountCenter'
import type { FormInstance } from 'element-plus'
const userStore = useUserStore()
const invoiceUpVisible = ref(false)
const invoiceName = ref('')
const invoiceUp = ref<any>()
const idBoolean = ref<boolean>(false)
const invoiceList = ref<any>([])
const invoiceForm = ref<invoiceApi>({
  type: 0,
  succ: '',
  phone: '',
  address: '',
  card: '',
  bank: '',
  email: '',
  companyName: '',
  userName: '',
  idNumber: '',
  id: undefined,
  userId: userStore.userInfo?.userId
})
const invoiceRules = {
  type: [{ required: true, trigger: 'change', message: '请选择抬头类型' }],
  companyName: [{ required: true, trigger: 'blur', message: '请输入企业名称' }],
  succ: [
    { required: true, trigger: 'blur', message: '请输入社会统一信用代码' },
    { required: true, validator: succValidator, trigger: 'blur' }
  ],
  email: [
    { required: true, trigger: 'blur', message: '请输入接收电子发票的邮箱' },
    { required: true, validator: emailValidator, trigger: 'blur' }
  ],
  userName: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
  idNumber: [
    { required: true, trigger: 'blur', message: '请输入身份证号' },
    { required: true, validator: idNumberValidator, trigger: 'blur' }
  ]
}
/** 表单重置 */
const reset = () => {
  invoiceForm.value = {
    type: 0,
    succ: undefined,
    phone: undefined,
    address: undefined,
    email: undefined,
    card: undefined,
    bank: undefined,
    companyName: undefined,
    userName: undefined,
    idNumber: undefined,
    id: undefined,
    userId: userStore.userInfo?.userId
  }
}
// 校验身份证
function idNumberValidator(rule: any, value: any, callback: any) {
  const passwordRegex =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
  if (!passwordRegex.test(value)) {
    callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}
// 校验邮箱号
function emailValidator(rule: any, value: any, callback: any) {
  const passwordRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (!passwordRegex.test(value)) {
    callback(new Error('请输入正确格式的邮箱地址'))
  } else {
    callback()
  }
}
// 校验社会信用代码
function succValidator(rule: any, value: any, callback: any) {
  const passwordRegex =
    /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/
  if (!passwordRegex.test(value)) {
    callback(new Error('请输入正确社会统一信用代码'))
  } else {
    callback()
  }
}
// 切换
const handleChange = () => {
  invoiceForm.value = {
    type: invoiceForm.value.type,
    succ: undefined,
    phone: undefined,
    address: undefined,
    email: undefined,
    card: undefined,
    bank: undefined,
    companyName: undefined,
    userName: undefined,
    idNumber: undefined,
    id: undefined,
    userId: userStore.userInfo?.userId
  }
}
// 添加发票抬头
const addInvoiceUp = () => {
  invoiceName.value = '添加发票抬头'
  invoiceUpVisible.value = true
  reset()
}
// 更新
const updateInvoiceUp = (item: any) => {
  invoiceName.value = '编辑发票抬头'
  invoiceUpVisible.value = true
  idBoolean.value = true
  invoiceForm.value = Object.assign({}, item)
}
const handleEq = () => {
  invoiceUpVisible.value = false
  idBoolean.value = false
  invoiceUp.value?.resetFields()
}
// 添加发票抬头
const handleInvoiceUp = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res =
        invoiceName.value === '添加发票抬头'
          ? await addInvoice(invoiceForm.value)
          : await updateInvoice(invoiceForm.value)
      if (res.code === 200) {
        invoiceUpVisible.value = false
        idBoolean.value = false
        getInvoiceTitleData()
        formEl.resetFields()
      }
    }
  })
}
// 删除发票抬头信息
const handleDelect = async (id: any) => {
  console.log(id)
  const res = await deteleInvoice(id)
  if (res.code === 200) {
    getInvoiceTitleData()
    ElMessage({
      message: '删除成功!',
      type: 'success'
    })
  }
}
// 查看发票抬头列表
const getInvoiceTitleData = async () => {
  const res = await getInvoiceTitle()
  if (res.code === 200) {
    invoiceList.value = res?.data
  }
}
getInvoiceTitleData()
</script>
<style lang="scss" scoped>
.invoicing_up {
  .up_table {
    margin-top: 17px;
  }
}

.invoicing_up_botton {
  display: flex;
  flex-direction: row-reverse;
  margin-top: -30px;
  cursor: pointer;

  span {
    width: 76px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #098d72;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #098d72;
  }
}

.download {
  color: #098d72;
  width: 40px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
</style>
