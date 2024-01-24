<template>
  <div class="login-content">
    <div class="login-title">
      <span>账号密码登录</span>
    </div>
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-name"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入手机号/邮箱登录"
        />
      </el-form-item>
      <el-form-item prop="password" class="login-password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <div class="login-register">
      <span @click="handleForget">忘记密码?</span>
    </div>
    <div class="login-footer">
      <span
        :loading="loading"
        class="footer-span"
        @click="handleLogin(loginRef)"
        >登录</span
      >
    </div>
    <div class="login-footer-number" @click="handelGoRegister">
      还没有账号？立即去<span>注册</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'
import type { loginRes } from '@/types/user'
import { ElMessage, type FormInstance } from 'element-plus'
const userStore = useUserStore()
const router = useRouter()
const loginRef = ref<FormInstance>()
const loading = ref<Boolean>(false)
const loginForm = reactive<loginRes>({
  username: '',
  password: '',
  type: 0
})
const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }]
}
// 登录
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      userStore
        .Userlogin(loginForm)
        .then(res => {
          ElMessage.success('登录成功')
          closeDlg()
          formEl.resetFields()
          location.href = '/'
        })
        .catch(() => {
          loading.value = false
        })
    }
  })
}
const emit = defineEmits()
// 登陆完成关闭登陆弹窗
const closeDlg = () => {
  emit('closeDlg', '')
  loginRef.value!.resetFields()
}
// 去注册
const handelGoRegister = () => {
  emit('handelGoRegister', '')
  loginRef.value!.resetFields()
}
// 找回密码
const handleForget = () => {
  emit('handleForget', '')
}
// 清空表单
const resetFieldsFrom = () => {
  loginRef.value!.resetFields()
}
defineExpose({
  resetFieldsFrom
})
</script>
<style lang="scss" scoped>
.login-content {
  .login-title {
    font-size: 18px;
    color: #212121;
    font-weight: 400;
  }

  .login-name {
    margin-top: 40px;
    font-size: 14px;
  }

  .login-password {
    margin-top: 27px;
    font-size: 14px;
  }

  .login-register {
    margin-top: 18px;
    text-align: right;
    font-size: 14px;
    color: #4a4a4a;
    cursor: pointer;
  }

  .login-footer {
    margin-top: 54px;
    display: flex;
    justify-content: center;

    span {
      border-radius: 4px;
      width: 300px;
      height: 36px;
      line-height: 36px;
      color: #fff;
      background-color: #098d72;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }

    // .footer-span:hover {
    //     border: 1px solid #1ea664;
    // }
  }

  .login-footer-number {
    margin-top: 19px;
    text-align: center;
    color: #4a4a4a;
    font-size: 14px;
    cursor: pointer;

    span {
      color: #098d72;
    }
  }

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #098d72;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
