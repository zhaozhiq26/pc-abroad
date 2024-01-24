<template>
  <div class="account_safety">
    <div class="safety_content">
      <div class="safety phone_safety">
        <span>手机号</span><em @click="handleUpdete(1)">修改密码</em>
      </div>
      <div class="safety_line"></div>
      <div class="safety em_safety">
        <span>邮箱号</span><em @click="handleUpdete(2)">修改密码</em>
      </div>
    </div>
    <el-dialog
      v-model="reviseDialogVisible"
      title="修改登录密码"
      @close="resetForm"
      :close-on-click-modal="false"
      width="389"
    >
      <div class="SecurityCenter_body">
        <el-form
          :model="FormData"
          :rules="rules"
          ref="ruleRef"
          label-width="84px"
        >
          <el-form-item label="原密码" prop="password">
            <el-input
              v-model="FormData.password"
              type="password"
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassWord">
            <el-input
              v-model="FormData.newPassWord"
              type="password"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassWord">
            <el-input
              v-model="FormData.confirmPassWord"
              type="password"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="dialog-footer-confirm" @click="submitForm(ruleRef)">
            确定
          </el-button>
          <el-button class="dialog-footer-close" @click="resetForm">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { type FormInstance } from 'element-plus'
import { editMember } from '@/api/personal'
const userStore = useUserStore()
const ruleRef = ref()
const reviseDialogVisible = ref(false)
const FormData = reactive({
  confirmPassWord: '',
  newPassWord: '',
  password: ''
})

// 表单校验规则
const rules = reactive({
  password: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 18 个字符', trigger: 'blur' }
  ],
  newPassWord: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    {
      required: true,
      validator: passwordValidator,
      message: '请输入新密码',
      trigger: 'blur'
    }
  ],
  confirmPassWord: [
    { required: true, trigger: 'blur', message: '请再次输入您的密码' },
    {
      required: true,
      validator: equalToPassword,
      message: '请输入确认密码',
      trigger: 'blur'
    }
  ]
})
// 校验密码
function passwordValidator(rule: any, value: any, callback: any) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/
  if (!passwordRegex.test(value)) {
    callback(new Error('请设置密码（6-18位  数字+字母'))
  } else {
    callback()
  }
}
// 确认密码
function equalToPassword(rule: any, value: any, callback: any) {
  if (FormData.newPassWord !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
// 打开修改密码框
const handleUpdete = (index: any) => {
  reviseDialogVisible.value = true
}
// 取消
const resetForm = () => {
  reviseDialogVisible.value = false
  ruleRef.value?.resetFields()
}
// 保存
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await editMember(FormData)
      if (res.code === 200) {
        window.localStorage.clear()
        ElMessage({
          message: '密码修改成功!',
          type: 'success'
        })
        reviseDialogVisible.value = false
        formEl.resetFields()
        location.href = '/'
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.account_safety {
  background: #fff;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid #ededed;
  height: 924px;
  width: 1226px;
  font-size: 14px;
  padding: 24px 24px 0 24px;

  .safety_content {
    font-size: 14px;

    .safety_line {
      margin: 24px 0;
      height: 1px;
      background: #ededed;
    }

    .safety {
      span {
        color: #111;
      }

      em {
        margin-left: 32px;
        color: #098d72;
        cursor: pointer;
      }
    }
  }

  .SecurityCenter_body {
    .el-input {
      width: 368px;
      border-bottom: 1px solid #dcdee0;
    }

    .el-button {
      width: 119px;
      height: 32px;
      margin-right: 37px;
      margin-top: 38px;
    }

    .res_btn {
      border: 1px solid #098d72;
    }
  }
}

.dialog-footer {
  .dialog-footer-confirm {
    width: 64px;
    height: 32px;
    background: #098d72;
    border-radius: 4px 4px 4px 4px;
    color: #fff;
  }

  .dialog-footer-close {
    width: 64px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #098d72;
    color: #098d72;
  }
}

:deep(.el-input__wrapper) {
  box-shadow: none !important;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
  border-bottom: 1px solid #f56c6c;
  border-radius: 0;
}
</style>
