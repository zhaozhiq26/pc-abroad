<template>
  <div class="phone-content">
    <el-form
      ref="registerRef"
      :model="phoneForm"
      :rules="phoneRules"
      class="phone-name"
    >
      <el-form-item prop="username">
        <el-input v-model="phoneForm.username" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="phoneForm.code"
          placeholder="请输入验证码"
          style="width: 60%"
        />
        <span v-if="!sms.disabled" class="phone-code" @click="send"
          >获取验证玛</span
        >
        <span v-else class="phone-code">{{ sms.count }}s后可再次获取</span>
      </el-form-item>
      <el-form-item prop="password" class="login-password">
        <el-input
          v-model="phoneForm.password"
          type="password"
          placeholder="请设置登录密码（6-18数字+字母）"
        />
      </el-form-item>
      <el-form-item prop="confirmPassword" class="login-password">
        <el-input
          v-model="phoneForm.confirmPassword"
          type="password"
          placeholder="请确认密码"
        />
      </el-form-item>
    </el-form>
    <div class="register-footer">
      <span
        :loading="loading"
        class="footer-span"
        @click="handleRegister(registerRef)"
        >注册</span
      >
    </div>
    <div class="register-login" @click="handelGoLogin">
      已有账号? 立即去 <span>登录</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { phoneCode, registerAPI } from '@/api/user'
import type { registerRes } from '@/types/user'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
const loading = ref<boolean>(false)
const registerRef = ref<FormInstance>()
const sms = reactive({
  disabled: false,
  total: 60,
  count: 0
})
const phoneForm = reactive<registerRes>({
  username: '',
  password: '',
  confirmPassword: '',
  code: '',
  type: 0
})
const phoneRules = {
  username: [
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    { required: true, validator: phoneValidator, trigger: 'blur' }
  ],
  code: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    { required: true, validator: passwordValidator, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '请再次输入您的密码' },
    { required: true, validator: equalToPassword, trigger: 'blur' }
  ]
}
// 校验手机号
function phoneValidator(rule: any, value: any, callback: any) {
  if (phoneForm.username === undefined) {
    callback()
  } else if (phoneForm.username === '') {
    callback(new Error('请输入手机号码'))
  } else if (
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      phoneForm.username
    )
  ) {
    callback(new Error('请输入正确格式的手机号码'))
  } else {
    callback()
  }
}
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
  if (phoneForm.password !== value) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
// 计时器处理器
const timerHandler = () => {
  sms.count = sms.total
  sms.disabled = true
  let timer = setInterval(() => {
    if (sms.count > 1 && sms.count <= sms.total) {
      sms.count--
    } else {
      sms.disabled = false
      clearInterval(timer)
    }
  }, 1000)
}
// 发送验证码
const send = async () => {
  if (
    phoneForm.username === undefined ||
    !/^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(
      phoneForm.username
    )
  ) {
    // ElMessage.error("手机号不能为空!")
    return
  }
  timerHandler()
  const res = await phoneCode(phoneForm.username)
  if (res.code === 200) {
    ElMessage({
      message: '发送验证码成功, 请注意查收',
      type: 'success'
    })
  }
}
// 注册
function handleRegister(formEl: FormInstance | undefined) {
  if (formEl) {
    formEl.validate((valid: any) => {
      if (valid) {
        loading.value = true
        registerAPI(phoneForm)
          .then((res: any) => {
            const username = phoneForm.username
            ElMessageBox.alert(
              "<font color='red'>恭喜你，您的账号 " +
                username +
                ' 注册成功！</font>',
              '系统提示',
              {
                dangerouslyUseHTMLString: true,
                type: 'success'
              }
            )
              .then(() => {
                formEl.resetFields()
                handelGoLogin()
              })
              .catch(() => {})
          })
          .catch(() => {
            loading.value = false
            // if (captchaEnabled) {
            //   getCode();
            // }
          })
      }
    })
  }
}
const emit = defineEmits()
// 去登录
const handelGoLogin = () => {
  emit('handelGoLogin', '')
  registerRef.value!.resetFields()
}
</script>
<style lang="scss" scoped>
.phone-content {
  margin-top: 40px;

  .phone-name {
    font-size: 14px;
    color: #4a4a4a;
  }

  .phone-code {
    margin-left: 1%;
    display: block;
    width: 39%;
    text-align: center;
    font-size: 12px;
    background-color: #098d72;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
  }

  .register-footer {
    margin-top: 40px;
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
      letter-spacing: 5px;
      cursor: pointer;
    }
  }

  .register-login {
    margin-top: 19px;
    text-align: center;
    color: #4a4a4a;
    font-size: 14px;
    cursor: pointer;

    span {
      color: #098d72;
    }
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #098d72;
  }
}
</style>
